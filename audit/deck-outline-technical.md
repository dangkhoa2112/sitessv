# Deck outline — Technical team (Engineering / DevOps / QA)

**Scope:** Assessment of `https://shinhansec.com.vn/` vs monorepo `fintech-corporate-platform` (`apps/web`, `apps/cms`).  
**Evidence date:** 2026-04-21.

---

## Audience narratives (technical)

| Audience | Focus |
|----------|--------|
| **Engineering** | Boundaries, data flow, SSR/ISR, GraphQL contracts, redirect maps, test strategy. |
| **DevOps / SRE** | Deploy artifacts, Nginx, PM2, CDN, secrets, observability, rollback. |
| **QA** | Redirect matrix, parity checklist, Lighthouse budgets, accessibility. |
| **Security** | PHP 7.4 EOL, CORS, headers, Strapi public role, GraphQL introspection policy. |

---

## Slide 1 — Title + transformation objective

- **Title:** Platform migration — PHP marketing site → Next.js + Strapi (headless)
- **Objective:** Align technical north star and non-goals (trading stays out of CMS).
- **Key takeaway:** Replace **stateful PHP page rendering** with **stateless Next SSR/ISR** backed by Strapi GraphQL.
- **Bullets:**
  - **Current edge:** Apache + PHP 7.4 + CodeIgniter-style session cookies on marketing HTML.
  - **Target edge:** Node 20 + Next 16 standalone behind Nginx; optional CDN for static/upload.
  - **Content plane:** Strapi 4 GraphQL; MySQL utf8mb4.
  - **Non-goal:** No trading credentials or core market data in CMS (per TR §2.1).
  - **Deliverable:** Production-hardened monorepo + redirect layer + observability.
- **Evidence notes:** `curl -sI https://shinhansec.com.vn/` → PHP/7.4.24, `ci_session`; repo `apps/web/package.json` Next 16.2.3.
- **Speaker notes:** Emphasize **EOL PHP** as security backlog, not ideology.

---

## Slide 2 — Executive summary

- **Title:** Technical executive summary
- **Objective:** Snapshot risks and assets.
- **Key takeaway:** Live site shows **cache-unfriendly** and **SEO-inconsistent** patterns; repo implements **correct primitives** but lacks **test/CI** and **prod config completeness**.
- **Bullets:**
  - **Live:** `Cache-Control: no-store`; metadata mismatch (`canonical` `vi.html` vs path `/vi`, `og:url` `/`).
  - **Live:** Sitemap index `lastmod` **2021-07-30** on children.
  - **Repo:** `buildPageMetadata`, dynamic `sitemap.ts`, `robots.ts`, JSON-LD builders, `llms.txt`.
  - **Gap:** No jest/playwright in repo; no `.github/workflows` observed.
  - **Gap:** On-demand revalidation not implemented (TR recommends webhook).
- **Evidence notes:** HTTP headers + HTML head dump; `grep` tooling; `docs/technical-requirements.md` §2.5, §8.
- **Speaker notes:** Position as **engineering backlog with clear P0/P1** from TR.

---

## Slide 3 — Why now

- **Title:** Why migrate now (engineering view)
- **Objective:** Prioritize platform work on roadmap.
- **Key takeaway:** **Risk compounds** (EOL runtime + unmaintainable template stack + SEO signals decay).
- **Bullets:**
  - **Security:** PHP 7.4 unsupported — patch availability ends; incident probability rises.
  - **Performance:** Session + no-store → poor edge caching → higher origin load and latency.
  - **SEO engineering:** Stale sitemap hurts crawl scheduling confidence.
  - **Developer velocity:** Template/jQuery stack slows safe refactors; Next+components enable modular changes.
  - **Org fit:** Monorepo already matches target architecture — migration is **execution**, not R&D from zero.
- **Evidence notes:** Same as slide 2 + TR §4 OWASP mapping.
- **Speaker notes:** Tie to **MTTR** and **audit findings** if security reviews escalate.

---

## Slide 4 — Current website snapshot

- **Title:** Live stack fingerprint
- **Objective:** Establish facts for architecture discussion.
- **Key takeaway:** Marketing site behaves like **classic LAMP/CI app** with **client-heavy legacy JS**.
- **Bullets:**
  - **HTTP:** Root **303** → `/vi` (locale entry).
  - **Stack:** `Server: Apache`, `X-Powered-By: PHP/7.4.24`.
  - **Session:** `ci_session`, `csrf_cookie_name` Set-Cookie on GET.
  - **Assets:** `/templates/css/bootstrap.min.css`, `main.css?v=1255`, `jquery.min.js`.
  - **Tracking:** GTM snippet in `<head>`.
- **Evidence notes:** `curl -sI`, first 120 lines HTML.
- **Speaker notes:** Use this slide to justify **stateless** Next tier for caching.

---

## Slide 5 — Top pain points (current website)

- **Title:** Top technical pain points (live)
- **Objective:** Prioritize remediation themes.
- **Key takeaway:** **Metadata + caching + crawl signals** are broken in ways that Next+CMS fix systematically.
- **Bullets:**
  - **SEO correctness:** canonical vs actual URL; `og:url` mismatch.
  - **Internationalization:** no `hreflang` in HTML sample — search engines lack explicit alternates.
  - **Structured data:** no `ld+json` in sample — lost rich-result eligibility.
  - **Sitemaps:** stale `lastmod` in index — bad freshness signal.
  - **A11y:** `user-scalable=no` — WCAG friction.
  - **Caching policy:** `no-store` on document — undermines CDN strategy.
- **Evidence notes:** HTML + sitemap XML + headers.
- **Speaker notes:** Map each to automated checks in CI later (Lighthouse a11y, custom SEO assertions).

---

## Slide 6 — UX/UI findings

- **Title:** UX/UI engineering assessment (live)
- **Objective:** Connect UX debt to implementation constraints.
- **Key takeaway:** Legacy CSS/JS coupling limits **component reuse** and **predictable layout metrics**.
- **Bullets:**
  - Global CSS bundles (`main.css`, `style.min.css`) — higher specificity wars; harder theming.
  - jQuery bootstrapping global AJAX CSRF — different model than Next server actions/route handlers.
  - Offcanvas/nav patterns depend on Bootstrap JS — compare to React islands in Next.
  - Responsive risk: template-era breakpoints vs modern container queries / Tailwind breakpoints.
  - Repo direction: Tailwind utility classes + `SectionRenderer` switch on `__typename`.
- **Evidence notes:** HTML asset URLs; `SectionRenderer.tsx` pattern.
- **Speaker notes:** Propose **design tokens in Tailwind theme** as migration path, not big-bang Figma-only.

---

## Slide 7 — SEO findings

- **Title:** SEO engineering findings (live)
- **Objective:** Show what must be encoded in Next metadata layer.
- **Key takeaway:** Live lacks **consistent alternate URLs** and **machine-readable structured data** in sample.
- **Bullets:**
  - Canonical uses `.html` file style while routes are directory-style — normalization required in redirect map.
  - Open Graph URL does not match canonical — sharing analytics skewed.
  - hreflang absent in sample — implement via `Metadata.alternates.languages` (`seo.ts`).
  - Sitemap index outdated — replace with Next `sitemap.ts` feeding real `lastModified`.
  - Robots.txt allows crawl but internal search policy should match `robots.ts` disallow patterns.
- **Evidence notes:** Live HTML; `apps/web/src/lib/seo.ts` lines 103–114; `apps/web/src/app/sitemap.ts`.
- **Speaker notes:** Add **integration test** that every localized route emits alternates.

---

## Slide 8 — GEO / AI-search findings

- **Title:** GEO / retrieval-oriented engineering
- **Objective:** Define artifacts beyond classic SEO.
- **Key takeaway:** Ship **`llms.txt`**, stable hubs, and clean chunk boundaries in CMS rich text.
- **Bullets:**
  - Repo provides `public/llms.txt` — live `GET /llms.txt` returns **404** today; must serve 200 in production.
  - Canonical conflicts on live harm LLM citation confidence.
  - Use `Article` JSON-LD with `datePublished`/`author` from Strapi for grounding signals.
  - Avoid indexing internal search — already handled via `buildListingPageMetadata` when `hasSearchQuery`.
  - Consider `seo:audit` script extension to validate llms + critical routes.
- **Evidence notes:** `apps/web/public/llms.txt`; `seo.ts` listing metadata; `json-ld.ts` article builder.
- **Speaker notes:** Coordinate with content editors on **heading hierarchy** in rich text.

---

## Slide 9 — Performance & maintainability

- **Title:** Performance & maintainability (live vs target)
- **Objective:** Set engineering acceptance criteria (CWV, caching).
- **Key takeaway:** Target architecture can hit **TR CWV goals** if HTML is cacheable and JS is minimized.
- **Bullets:**
  - Live `Cache-Control: no-store` prevents edge HTML caching — fix by removing unnecessary cookies on public pages or splitting domains.
  - jQuery + multiple CSS files — main-thread and download cost; Next defers to React server components where possible.
  - Next: `next/image`, font optimization, `poweredByHeader: false` already set.
  - ISR: `REVALIDATE_TIME` default 120s — tune per route; add webhook for instant publish.
  - Image CDN: configure `images.remotePatterns` for Strapi/CDN origins (TR P0).
- **Evidence notes:** Headers; `apps/web/src/lib/constants.ts` `REVALIDATE_TIME`; `next.config.ts` images/headers.
- **Speaker notes:** Propose **RUM** (web-vitals) post-launch for real p75.

---

## Slide 10 — Current source architecture snapshot

- **Title:** Repository architecture snapshot
- **Objective:** Walk through modules engineers will own.
- **Key takeaway:** Clear separation: **Next (presentation + SEO)**, **Strapi (content)**, **GraphQL contract**.
- **Bullets:**
  - **apps/web:** App Router, `src/app/[locale]`, Apollo SSR (`docs/architecture.md`).
  - **apps/cms:** Strapi APIs, components for homepage sections, MySQL.
  - **SEO routes:** `src/app/sitemap.ts`, `src/app/robots.ts` — server-generated.
  - **Localized SEO slugs:** `redirects` 301 `/vi/about` → `/vi/gioi-thieu`, `rewrites` for pretty Vietnamese URLs.
  - **Scripts:** `pnpm seo:audit` for file presence checks.
- **Evidence notes:** `docs/architecture.md`; `next.config.ts`; `apps/web/scripts/seo-geo-audit.mjs`.
- **Speaker notes:** Point to **GraphQL fragments/queries** as contract owners (`src/graphql/`).

---

## Slide 11 — Strengths of current source

- **Title:** Engineering strengths (repo)
- **Objective:** Credit existing work; reduce “not invented here” friction.
- **Key takeaway:** Strong **SEO/infra primitives** and **sanitized rendering** already exist.
- **Bullets:**
  - Typed SEO pipeline via `buildPageMetadata` + Next `Metadata`.
  - Dynamic sitemap across entities (pages, services, news, events, research, jobs).
  - JSON-LD coverage for corporate use cases.
  - `sanitize-html` dependency for RichText — aligns with XSS mitigation (TR §4.1 A03).
  - Security headers middleware in Next config.
  - Monorepo scripts: `lint`, `typecheck`, `seo:audit`.
- **Evidence notes:** `package.json` deps; `seo.ts`; `sitemap.ts`; `RichText` usage.
- **Speaker notes:** Use this to argue **incremental hardening** over rewrite.

---

## Slide 12 — Weaknesses / gaps in current source

- **Title:** Gaps & technical debt (repo)
- **Objective:** Honest backlog for leads.
- **Key takeaway:** Missing **automated regression safety net** and **production integration** items from TR P0/P1.
- **Bullets:**
  - **Testing:** No unit/e2e framework detected — high regression risk on migration.
  - **CI:** No workflows in-repo — no enforced quality gates.
  - **Revalidation:** Time-based ISR only — need Strapi webhook → on-demand revalidate endpoints.
  - **CORS:** Strapi `middlewares.ts` uses localhost fallback — must set `CORS_ORIGINS` for prod.
  - **Contact API:** `/api/contact` may need real SMTP/ticket integration (TR §5.2).
  - **GraphQL hardening:** consider introspection off in prod, depth limits, rate limits (TR §3.3, §4.1).
- **Evidence notes:** Repo grep; `docs/technical-requirements.md` §8 priority matrix.
- **Speaker notes:** Propose **minimum viable CI** in sprint 1: lint + typecheck + `seo:audit`.

---

## Slide 13 — Comparison matrix

- **Title:** Technical comparison matrix
- **Objective:** Single slide for architecture review.
- **Key takeaway:** Replace **session-heavy PHP HTML** with **stateless Next** + **headless CMS**; add **governance** (CI, rate limits, monitoring).
- **Bullets:**
  - Runtime/security: PHP 7.4 EOL vs Node 20 LTS track.
  - SEO infra: stale XML vs programmatic `sitemap.ts`.
  - Caching: `no-store` vs CDN-friendly Next policies + fewer cookies.
  - Content velocity: template edits vs Strapi publish.
  - Engineering: jQuery imperative vs React server components + typed routes.
  - Ops: unknown CI vs proposed pipeline with Lighthouse/seo audit.
- **Evidence notes:** `audit/comparison-matrix.md`.
- **Speaker notes:** Use as **decision record** appendix.

---

## Slide 14 — Why target architecture is strategically better

- **Title:** Strategic engineering rationale
- **Objective:** Explain why this shape wins long-term.
- **Key takeaway:** **Separation of concerns** + **edge-friendly rendering** + **typed SEO** reduces total cost of change.
- **Bullets:**
  - **Content decoupling:** Editors ship without deploys — fewer hotfixes on marketing.
  - **Edge caching:** Stateless HTML enables cheaper scale during campaigns.
  - **Contracted API:** GraphQL schema/versioning easier to test than PHP templates.
  - **Security posture:** Remove PHP attack surface; apply OWASP controls in TR.
  - **Observability:** Node/Next logs integrate with APM stacks more uniformly than mixed PHP logs.
- **Evidence notes:** TR §2–4; `architecture.md`.
- **Speaker notes:** Quantify with **deploy frequency** and **lead time for content change** post-migration.

---

## Slide 15 — Proposed target structure

- **Title:** Target deployment topology
- **Objective:** Concrete NFR discussion.
- **Key takeaway:** **CDN/Nginx → Next → Strapi (private network) → MySQL**; public only exposes read GraphQL via controlled surface.
- **Bullets:**
  - TLS termination at Nginx; optional WAF.
  - Next standalone build; horizontal scale behind LB.
  - Strapi admin on restricted network; public role read-only.
  - Uploads via CDN origin or object storage sync.
  - Secrets via env — never embed Strapi tokens client-side.
  - Backups: DB + uploads per TR §7.
- **Evidence notes:** `docs/deployment.md` (referenced by TR); `audit/target-architecture.md`.
- **Speaker notes:** If org requires k8s later, Next/Strapi remain containerizable.

---

## Slide 16 — Proposed SEO/GEO architecture

- **Title:** SEO/GEO implementation blueprint
- **Objective:** Engineering tasks list.
- **Key takeaway:** Implement **one metadata function** per route class + **structured data per template** + **llms.txt** hosting.
- **Bullets:**
  - Centralize canonical/hreflang in `buildPageMetadata` — avoid per-page drift.
  - Emit JSON-LD via server components — validate in CI with schema snapshots.
  - Sitemap from CMS timestamps — ensure `updatedAt` changes on meaningful edits.
  - Robots: align disallow with internal search routes (`/*?q=*`).
  - Publish `/llms.txt` and verify 200 + correct absolute URLs (`SITE_URL`).
  - Extend `seo:audit` to fail builds if files missing (already checks core files).
- **Evidence notes:** `seo.ts`, `json-ld.ts`, `seo-geo-audit.mjs` required files list.
- **Speaker notes:** Consider **schema.org validation** step in staging pipeline.

---

## Slide 17 — Proposed UX/UI system direction

- **Title:** Front-end systemization (Tailwind + sections)
- **Objective:** Define implementation patterns for devs/designers.
- **Key takeaway:** Use **`SectionRenderer` + shared UI primitives** to avoid one-off pages.
- **Bullets:**
  - Map Strapi `__typename` → React section components — already started.
  - Standardize heading levels: section title `h2`, cards `h3` for SEO + a11y.
  - Replace zoom lock with responsive typography scales.
  - Storybook optional — if not, use visual regression (Percy/Chromatic) later.
  - Align CTA styles via shared button/link components.
- **Evidence notes:** `SectionRenderer.tsx` structure.
- **Speaker notes:** Add **eslint a11y plugin** as follow-up.

---

## Slide 18 — Migration phases

- **Title:** Engineering migration phases
- **Objective:** Sequence work with dependencies.
- **Key takeaway:** **Redirects & inventory first** — code complete without redirect map is useless.
- **Bullets:**
  - Phase 0: automated crawl + redirect CSV + 301 tests.
  - Phase 1: prod-like staging; env; CDN; CORS; SMTP/contact.
  - Phase 2: content import pipelines; GraphQL pagination for large lists.
  - Phase 3: SEO parity checks; GSC dry run on staging (if possible) or post-cutover.
  - Phase 4: DNS/proxy cutover; canary; rollback playbook.
  - Phase 5: webhook revalidation + GraphQL rate limits + APM dashboards.
- **Evidence notes:** `audit/phase-roadmap.md`.
- **Speaker notes:** Add **contract tests** for top 10 GraphQL queries before cutover.

---

## Slide 19 — Risks and mitigation

- **Title:** Technical risks & mitigations
- **Objective:** Risk register for eng leadership.
- **Key takeaway:** Highest risks are **incorrect redirects**, **secret leakage**, and **performance regressions** — all mitigatable.
- **Bullets:**
  - **Redirect errors:** automated tests + server log 404 monitoring + GSC crawl stats.
  - **GraphQL overload:** caching + rate limit + query cost limits.
  - **Secret exposure:** audit `NEXT_PUBLIC_*`; server-only Strapi URLs.
  - **CMS migration errors:** idempotent import scripts + checksum counts.
  - **Performance:** Lighthouse CI budgets on PR; RUM after launch.
- **Evidence notes:** TR risk areas; `next.config.ts` security headers.
- **Speaker notes:** Include **rollback**: revert proxy to origin PHP if catastrophic (last resort).

---

## Slide 20 — KPI / expected outcomes

- **Title:** Engineering & product KPIs
- **Objective:** Define measurable outcomes for eng team.
- **Key takeaway:** Success = **CWV p75**, **low 404 rate**, **stable GraphQL p95**, **deploy cadence**.
- **Bullets:**
  - CWV: LCP/INP/CLS thresholds from TR §3.1.
  - Availability: synthetic checks on `/vi`, `/en`, sitemap.
  - Error rate: Next/Strapi 5xx budgets.
  - CI: PR checks green 100% on main.
  - Security: dependency audit cadence; PHP removed from public path.
- **Evidence notes:** `audit/kpi-metrics.md`.
- **Speaker notes:** Pair each KPI with **owner tool** (CrUX vs Lighthouse CI vs server logs).

---

## Slide 21 — Final recommendation

- **Title:** Technical recommendation
- **Objective:** Ask for engineering commitments.
- **Key takeaway:** **Adopt** monorepo as system of record; **fund** CI/testing + prod integration **before** DNS cutover.
- **Bullets:**
  - Approve staffing for: redirect matrix, Strapi import, Next perf budget.
  - Stand up staging mirroring prod TLS/CDN.
  - Implement P0 items from TR: env, CORS, CDN image domains, contact integration.
  - Add minimal CI: lint, typecheck, `seo:audit`, Lighthouse optional phase 2.
  - Schedule load test on GraphQL after caching strategy defined.
- **Evidence notes:** TR §8 priority table; repo gap analysis.
- **Speaker notes:** Close with: “We are not guessing — artifacts are in repo; we need **execution and gates**.”
