# SEO / GEO Strategy

## 1) Objective
- Build a repo-level standard so every new page/content type is SEO-ready and GEO-ready by default.
- Keep technical SEO deterministic in code (not editorial memory).
- Keep GEO extraction friendly for AI search by structuring entities, summaries, and schema data consistently.

## 2) Scope
- Frontend: `apps/web` (Next.js App Router).
- CMS: `apps/cms` (Strapi).
- Documentation and quality gates under `docs/` and `apps/web/scripts/seo-geo-audit.mjs`.

## 3) Technical baseline (implemented)
- Canonical + hreflang are generated from one helper: `apps/web/src/lib/seo.ts`.
- Listing pages use a shared metadata builder and canonical pagination policy.
- Search page is always `noindex,follow`.
- JSON-LD is emitted globally (`Organization`, `WebSite`) and per page where relevant (`Article`, `FAQ`, `Breadcrumb`).
- `robots.ts` and `sitemap.ts` are present and locale-aware.
- `public/llms.txt` is present for generative discovery systems.
- SEO fragment includes `keywords` and is available to all Strapi entities using `SeoMeta`.

## 4) URL and indexing policy
- Locale-first URL pattern: `/vi/*`, `/en/*`.
- One canonical URL per page language.
- `x-default` points to `/vi/*` by default.
- Parameterized search states are not canonical content.
- Internal search route (`/{locale}/search`) must not be indexed.

## 5) Metadata policy
- Every route page in `src/app/[locale]/**/page.tsx` must export `generateMetadata` (or static `metadata`).
- Meta title and meta description should be unique for each URL.
- Prefer page-level `seo` from CMS; fallback copy must exist in code.
- Robots directives from CMS are parsed into explicit metadata flags.

## 6) Structured data policy
- Global:
  - `Organization`
  - `WebSite` with `SearchAction`
- Detail pages:
  - `Article` for News/Research details.
- FAQ:
  - `FAQPage` with clean text answers.
- Breadcrumb trail:
  - `BreadcrumbList` should be emitted whenever breadcrumb UI is rendered.

## 7) CMS data contract (Strapi)
- Content types that represent indexable pages should include `shared.seo-meta`.
- Editors should maintain:
  - `metaTitle`
  - `metaDescription`
  - `canonicalUrl` when needed
  - `metaRobots` only for explicit exceptions
  - `ogImage`
  - `keywords`
- Publish dates and authors should be populated for article-like content.

## 8) GEO policy (Generative Engine Optimization)
- Keep entity names stable across title/H1/body/schema.
- Start each article/report with a compact factual summary.
- Use short Q&A sections where appropriate for extractive answers.
- Ensure each page has a clear topic boundary and intent.
- Keep legal/support pages crawlable and clearly linked for trust validation.
- Keep `llms.txt` updated with canonical hubs and data usage guidance.

## 9) Definition of Done for a new page
- Has route-level metadata.
- Has canonical/hreflang behavior via shared helper.
- Has a clear H1 and semantic landmarks.
- Has relevant structured data (if content type qualifies).
- Is linked from at least one index or hub page.
- Passes `pnpm --filter @fintech/web seo:audit`.

## 10) CI recommendation
- Add this command to CI for frontend checks:
  - `pnpm --filter @fintech/web seo:audit`
- Keep this command alongside lint and typecheck.
