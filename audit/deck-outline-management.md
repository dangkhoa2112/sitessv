# Deck outline — Management & Executive stakeholders

**Transformation:** Modernize Shinhan Securities Vietnam public website from legacy PHP/CodeIgniter marketing stack to **Next.js + Strapi** (codebase `fintech-corporate-platform` in repo).  
**Evidence date:** 2026-04-21.

---

## Audience narratives (để đặt tone khi trình bày)

| Audience | Họ cần nghe gì |
|----------|----------------|
| **Management** | Rủi ro kinh doanh (SEO, bảo mật PHP 7.4), chi phí cơ hội, lộ trình có kiểm soát, KPI rõ. |
| **Technical** | Kiến trúc đích, gap test/CI, webhook revalidate, CORS/env, boundary trading vs marketing. |
| **SEO / Marketing** | Canonical/hreflang, sitemap freshness, structured data, llms.txt, GSC playbook. |
| **Product / Business** | Funnel mở tài khoản và discovery sản phẩm không gãy; parity nội dung; velocity thay đổi campaign. |

---

## Slide 1 — Title + transformation objective

- **Title:** Shinhan Securities Vietnam — Website modernization & SEO/GEO readiness
- **Objective:** Đặt khung dự án: tại sao đổi, đổi sang đâu, kết quả kinh doanh kỳ vọng.
- **Key takeaway:** Đây là khoản đầu tư vào **khả năng mở rộng và giảm rủi ro**, không chỉ “làm lại giao diện”.
- **Bullets:**
  - Chuyển từ stack marketing **PHP 7.4 + template** sang **Next.js + headless CMS** đã có trong repo.
  - Mục tiêu: **tăng tốc đổi nội dung**, cải thiện **SEO/GEO**, giảm **nợ kỹ thuật và bảo mật**.
  - Phạm vi: **site công khai**; ranh giới với hệ thống giao dịch giữ nguyên theo policy.
  - Thành công đo bằng **GSC, CWV, funnel, velocity release**.
- **Evidence notes:** Response header live: `X-Powered-By: PHP/7.4.24` (curl); repo: `apps/web` Next 16 (`package.json`).
- **Speaker notes:** Mở đầu bằng rủi ro “EOL runtime” và chi phí cơ hội SEO (sitemap lastmod 2021) — số liệu ở slide sau.

---

## Slide 2 — Executive summary

- **Title:** Executive summary
- **Objective:** Cho lãnh đạo bức tranh 30 giây + quyết định “go / no-go”.
- **Key takeaway:** Website live đang mang **nợ SEO và nền tảng**; codebase mới **đủ mạnh** nhưng cần **đầu tư vận hành và migration** để tạo ra lợi ích.
- **Bullets:**
  - **Live:** Mismatch metadata (canonical vs `og:url`), sitemap index **lastmod 2021**, session PHP trên trang marketing, cache `no-store`.
  - **Repo:** Kiến trúc **App Router + Strapi + SEO module** (metadata, sitemap, JSON-LD, `llms.txt`).
  - **Gap:** Thiếu **test tự động/CI trong repo**, cần hardening env/CORS/CDN theo tài liệu TR.
  - **Đề xuất:** Roadmap theo phase (inventory → hardening → content → cutover).
  - **KPI:** Coverage index, CWV p75, funnel CTA, MTTR.
- **Evidence notes:** Live HTML: canonical `…/vi.html` vs `og:url` `/`; sitemap XML lastmod 2021; `findings-detailed.md`.
- **Speaker notes:** Nhấn “đã có sẵn giải pháp trong nhà” để giảm sợ rủi ro greenfield.

---

## Slide 3 — Why now

- **Title:** Why now
- **Objective:** Biện minh timing: rủi ro tích lũy và cơ hội thị trường.
- **Key takeaway:** Trì hoãn = **tăng chi phí** (bảo mật, SEO, velocity) và **giảm lợi thế** nội dung/AI search.
- **Bullets:**
  - **PHP 7.4** đã hết vòng đời — rủi ro tuân thủ và incident.
  - **SEO:** Sitemap và tín hiệu freshness không phản ánh vận hành hiện tại (lastmod 2021).
  - **Marketing:** Chiến dịch và tin tức cần **tốc độ publish**; template cũ khó scale.
  - **GEO:** Đối thủ và nền tảng AI ưu tiên nội dung **cấu trúc + llms.txt**.
  - **Kỹ thuật:** Team đã có monorepo chuẩn — **cửa sổ** để cutover có kiểm soát.
- **Evidence notes:** HTTP headers PHP 7.4; sitemap index; repo có `public/llms.txt`.
- **Speaker notes:** Gắn với kỳ báo cáo/kế hoạch growth để “why now” không trừu tượng.

---

## Slide 4 — Current website snapshot

- **Title:** Current website snapshot (live)
- **Objective:** Một slide “fact base” về stack và hành vi.
- **Key takeaway:** Live là **ứng dụng PHP truyền thống** phục vụ marketing, không tối ưu cho cache và SEO hiện đại.
- **Bullets:**
  - **Server:** Apache; **PHP 7.4**; cookie session (`ci_session`) trên page.
  - **Root:** HTTP **303** redirect sang `/vi`.
  - **Front-end:** jQuery + Bootstrap + CSS template versioned (`main.css?v=1255`).
  - **Analytics:** GTM container (ID trong HTML).
  - **Robots:** Cho phép crawl; disallow một số path hệ thống.
- **Evidence notes:** `curl -sI` và HTML `<head>` sample; `robots.txt` fetch.
- **Speaker notes:** Tránh chê thẩm mỹ — tập trung **hệ quả vận hành và SEO**.

---

## Slide 5 — Top pain points (current website)

- **Title:** Top pain points — current website
- **Objective:** Liệt kê vấn đề có hậu quả đo được.
- **Key takeaway:** Đau nhất: **tín hiệu SEO không nhất quán** + **nền tảng không cache-friendly** + **EOL runtime**.
- **Bullets:**
  - **Metadata conflict:** `canonical` (`vi.html`) vs URL thực tế `/vi` vs `og:url` root.
  - **Sitemap freshness:** lastmod **2021** trên index — mất niềm tin crawl.
  - **Không thấy hreflang / JSON-LD** trong sample — thiếu tín hiệu quốc tế & rich results.
  - **Accessibility:** `user-scalable=no` — rủi ro tuân thủ UX.
  - **Cache:** `Cache-Control: no-store` — chi phí và latency.
- **Evidence notes:** HTML lines canonical/og; sitemap index XML; viewport meta; cache headers.
- **Speaker notes:** Mỗi bullet map sang KPI (GSC, CWV, compliance).

---

## Slide 6 — UX/UI findings

- **Title:** UX/UI findings (live)
- **Objective:** Chứng minh độ “enterprise fintech maturity” chưa đạt.
- **Key takeaway:** UI có thể chấp nhận được nhưng **hệ thống thiết kế và accessibility** chưa đạt chuẩn hiện đại.
- **Bullets:**
  - **Layout:** Bootstrap grid + custom CSS — khó đảm bảo rhythm/spacing đồng nhất trên mọi template.
  - **Typography / scale:** Không có design token thống nhất (so với Tailwind trong repo).
  - **CTA hierarchy:** Cần đánh giá trang con; homepage có nhiều block nhưng phụ thuộc legacy.
  - **Accessibility:** Khóa zoom; cần audit WCAG đầy đủ sau cutover.
  - **Responsive:** Pattern legacy thường cần QA lại trên thiết bị thật.
- **Evidence notes:** Viewport meta; paths `/templates/css/`.
- **Speaker notes:** Repo mới có nền tảng DS (Tailwind, sections) — slide 17 mở rộng.

---

## Slide 7 — SEO findings

- **Title:** SEO findings (live)
- **Objective:** Cho team growth thấy gap cụ thể.
- **Key takeaway:** SEO kỹ thuật đang **mâu thuẫn** (canonical/social) và **lỗi thời** (sitemap).
- **Bullets:**
  - **Canonical & social mismatch** — risk duplicate và attribution sai.
  - **Hreflang:** Không xuất hiện trong sample — rủi ro VI/EN trên SERP.
  - **Structured data:** Không thấy JSON-LD trong sample — bỏ lỡ rich results.
  - **Sitemap index** lastmod 2021 — tín hiệu freshness kém.
  - **Robots:** Cơ bản; cần đối chiếu internal search và parameterized URLs (đã xử lý trong repo mới).
- **Evidence notes:** HTML; sitemap XML; repo `seo.ts`, `sitemap.ts`.
- **Speaker notes:** Nhấn repo đã có “công cụ đúng”; cần **triển khai** và **QA**.

---

## Slide 8 — GEO / AI-search findings

- **Title:** GEO / AI-search findings
- **Objective:** Nâng vấn đề “search mới” (LLM, retrieval).
- **Key takeaway:** **llms.txt và chunking nội dung** không có trên live; repo đã chuẩn bị phần này.
- **Bullets:**
  - Live: `https://shinhansec.com.vn/llms.txt` trả **404**; repo đã có file — cần deploy.
  - **Entity consistency:** Mismatch URL làm AI khó chọn canonical.
  - **Content hubs:** Cần đường dẫn ổn định cho news/research/services (repo định nghĩa trong `llms.txt`).
  - **Internal search:** Phải `noindex` — repo có logic listing search query.
  - **Trust signals:** Author/date trên bài — cần model CMS (Strapi) là nguồn đúng.
- **Evidence notes:** `apps/web/public/llms.txt`; `buildListingPageMetadata` noindex khi search.
- **Speaker notes:** GEO là **bảo hiểm** cho 12–24 tháng tới, không chỉ Google truyền thống.

---

## Slide 9 — Performance & maintainability

- **Title:** Performance & maintainability (live)
- **Objective:** Kết nối kỹ thuật với chi phí.
- **Key takeaway:** Thiết kế hiện tại **chống cache** và phụ thuộc JS legacy — khó đạt CWV mục tiêu.
- **Bullets:**
  - **Cache-Control no-store** trên response — HTML không ổn định tại edge.
  - **jQuery + nhiều CSS** — payload và main-thread không tối ưu theo chuẩn Next.
  - **Session cookie** — làm phức tạp CDN cache.
  - **Maintainability:** Template PHP — thay đổi cần dev full-stack; không có design system rõ trong code hiện tại.
- **Evidence notes:** Headers cache; HTML scripts; TR §3 CWV targets.
- **Speaker notes:** Đặt mục tiêu LCP/INP sau cutover — đo baseline trước.

---

## Slide 10 — Current source architecture snapshot

- **Title:** Current source architecture snapshot (repo)
- **Objective:** Chứng minh “đã có nền tảng”.
- **Key takeaway:** Monorepo **đúng hướng**: web tách CMS, SEO programmatic, i18n route-based.
- **Bullets:**
  - **apps/web:** Next.js 16, App Router, Tailwind 4, `next-intl`.
  - **apps/cms:** Strapi 4, GraphQL, sections/components.
  - **Data:** Apollo SSR; `REVALIDATE_TIME` ISR mặc định 120s.
  - **SEO:** `robots.ts`, `sitemap.ts`, `json-ld.ts`, `seo:audit` script.
  - **Việt hóa URL:** `redirects`/`rewrites` trong `next.config.ts`.
- **Evidence notes:** `package.json`, `docs/architecture.md`, `next.config.ts`.
- **Speaker notes:** Đây là **tài sản** — giảm thời gian build vs mua ngoài.

---

## Slide 11 — Strengths of current source

- **Title:** Strengths of current source
- **Objective:** Công nhận phần đúng để build trust với tech team.
- **Key takeaway:** Repo đã gồm **80% kiến trúc hiện đại** cho corporate fintech.
- **Bullets:**
  - **Programmatic SEO** (metadata, alternates, OG/Twitter).
  - **Sitemap động** theo entity CMS.
  - **JSON-LD** đủ loại cho corporate site.
  - **Section renderer** — nội dung modular, tốt cho AI chunking.
  - **Security headers** baseline trên Next.
  - **Sanitize rich text** (`sanitize-html`) — hướng đúng OWASP content.
- **Evidence notes:** `seo.ts`, `sitemap.ts`, `json-ld.ts`, `SectionRenderer.tsx`, TR.
- **Speaker notes:** Không phóng đại — nhắc gap CI/test ở slide sau.

---

## Slide 12 — Weaknesses / gaps in current source

- **Title:** Weaknesses / gaps (repo)
- **Objective:** Thành thật về công việc còn lại.
- **Key takeaway:** Codebase mạnh nhưng **chưa phải sản phẩm vận hành hoàn chỉnh** (test, CI, webhook).
- **Bullets:**
  - **Không có automated test** (e2e/unit) trong monorepo — rủi ro regression.
  - **Không thấy GitHub Actions** — governance pipeline mở.
  - **On-demand revalidation** chưa là mặc định — độ trễ nội dung và tải GraphQL.
  - **CORS/env/CDN** cần cấu hình production (TR P0).
  - **Contact pipeline** có thể chưa nối kênh thật (TR §5.2).
- **Evidence notes:** Grep không có jest/playwright; `docs/technical-requirements.md` P0/P1.
- **Speaker notes:** Đây là **budget item**, không phải “lỗi ý tưởng”.

---

## Slide 13 — Comparison matrix

- **Title:** Comparison matrix — live vs repo vs target ops
- **Objective:** Một slide quyết định.
- **Key takeaway:** **Live = technical debt có chi phí SEO/vận hành**; **Repo = nền tảng**; **Target = ops + migration**.
- **Bullets:**
  - Runtime: PHP 7.4 vs Node/Next — bảo mật và talent pool.
  - SEO: sitemap 2021 vs dynamic lastmod — freshness.
  - Metadata: conflict vs unified `buildPageMetadata` — đo attribution đúng.
  - Cache: no-store vs edge-friendly — CWV.
  - Content: template vs Strapi sections — velocity marketing.
  - GEO: không có llms.txt vs file trong repo — retrieval.
- **Evidence notes:** `audit/comparison-matrix.md`.
- **Speaker notes:** Dùng matrix làm “single source of truth” cho steering committee.

---

## Slide 14 — Why target architecture is strategically better

- **Title:** Strategic rationale for Next + Strapi
- **Objective:** Kết nối architecture với chiến lược công ty.
- **Key takeaway:** Kiến trúc đích giảm **thời gian đưa sản phẩm/nội dung ra thị trường** và tăng **kiểm soát rủi ro**.
- **Bullets:**
  - **Tách content khỏi release code** — marketing không chờ dev cho mọi thay đổi.
  - **SEO/GEO programmatic** — scale hàng trăm URL mà không lỗi thủ công.
  - **Stateless web** — cache tốt hơn, chi phí hạ tầng hợp lý hơn.
  - **Bảo mật:** loại PHP legacy khỏi surface; harden theo TR.
  - **Analytics:** GTM giữ được; chuẩn bị consent/CSP có kiểm soát.
- **Evidence notes:** `docs/architecture.md`, TR §2–4.
- **Speaker notes:** Nói ngắn: “speed + control + risk reduction”.

---

## Slide 15 — Proposed target structure

- **Title:** Proposed target structure (logical)
- **Objective:** Hình dung triển khai.
- **Key takeaway:** **CDN → Next → Strapi → MySQL**; marketing tách biệt trading.
- **Bullets:**
  - Edge: TLS, gzip/brotli, cache static.
  - Next: SSR/ISR, headers, image optimization.
  - Strapi: editorial, media, webhooks (mục tiêu).
  - DB: MySQL với backup RPO/RTO (TR §7).
  - Môi trường: dev/staging/prod tách secrets.
- **Evidence notes:** `audit/target-architecture.md`.
- **Speaker notes:** Nếu hỏi SSO trading — trả lời boundary ở TR §5.1.

---

## Slide 16 — Proposed SEO/GEO architecture

- **Title:** Proposed SEO/GEO architecture
- **Objective:** Cho marketing thấy “sẽ làm gì cụ thể”.
- **Key takeaway:** **Một pipeline metadata** + **sitemap động** + **llms.txt** + **schema** = nền tảng growth bền.
- **Bullets:**
  - Canonical + hreflang từ `seo.ts` — QA theo checklist template.
  - Sitemap từ CMS `updatedAt` — freshness thật.
  - Robots: chặn API và search query phù hợp.
  - JSON-LD theo loại trang — validate Rich Results.
  - `llms.txt` + hub pages rõ ràng — GEO.
  - CI: `pnpm seo:audit` gate (mở rộng theo thời gian).
- **Evidence notes:** `seo.ts`, `sitemap.ts`, `robots.ts`, `llms.txt`.
- **Speaker notes:** Nhấn GSC và Rich Results test là gate trước go-live.

---

## Slide 17 — Proposed UX/UI system direction

- **Title:** UX/UI system direction
- **Objective:** Trấn an về nhất quán thương hiệu.
- **Key takeaway:** **Tailwind + section components** trong repo là nền để chuẩn hóa fintech enterprise.
- **Bullets:**
  - **Token hóa** spacing, màu, type scale qua Tailwind theme (đã dùng trong components).
  - **Card/section patterns** trong `SectionRenderer` — giảm “mỗi trang một kiểu”.
  - **Accessibility:** bỏ khóa zoom; focus states; heading hierarchy từ CMS.
  - **Responsive:** ưu tiên mobile (CWV mobile).
  - **Content design:** chunk rõ H2/H3 cho SEO và AI retrieval.
- **Evidence notes:** `SectionRenderer.tsx`; viewport issue on live.
- **Speaker notes:** Có thể chỉ định design partner cho visual refresh **sau** parity chức năng.

---

## Slide 18 — Migration phases

- **Title:** Migration phases
- **Objective:** Lộ trình có mốc kiểm soát.
- **Key takeaway:** **Không big-bang mù** — inventory → hardening → content → cutover.
- **Bullets:**
  - Phase 0: URL inventory + redirect map + baseline perf/SEO.
  - Phase 1: env/CORS/CDN/contact pipeline (P0 TR).
  - Phase 2: migrate content vào Strapi + QA parity.
  - Phase 3: SEO/GEO prep (GSC, schema, llms.txt live).
  - Phase 4: traffic switch + hypercare 7 ngày.
  - Phase 5: webhook revalidate, APM, tối ưu liên tục.
- **Evidence notes:** `audit/phase-roadmap.md`.
- **Speaker notes:** Gắn mỗi phase với owner và ngân sách.

---

## Slide 19 — Risks and mitigation

- **Title:** Risks & mitigation
- **Objective:** Chủ động vấn đề steering committee hay hỏi.
- **Key takeaway:** Rủi ro lớn nhất là **mất URL equity** và **regression** — đều có biện pháp giảm.
- **Bullets:**
  - **SEO traffic drop:** 301 đầy đủ, GSC monitoring, rollback DNS plan.
  - **Content mismatch:** QA sign-off song song hai hệ thống trong staging.
  - **Performance regression:** Lighthouse CI gate; CDN config.
  - **Security misconfig:** CORS, secrets, Strapi admin hardening (TR).
  - **Team capacity:** scope theo phase; không trộn refresh creative vào cutover nếu không cần.
- **Evidence notes:** TR §4–7; redirect patterns `next.config.ts`.
- **Speaker notes:** Thành thật: cần **hypercare** sau cutover.

---

## Slide 20 — KPI / expected outcomes

- **Title:** KPI / expected outcomes
- **Objective:** Định nghĩa thắng thế.
- **Key takeaway:** Thắng = **ổn định SEO + CWV + velocity nội dung**, không chỉ “site mới”.
- **Bullets:**
  - **GSC:** indexed pages, hreflang issues → 0 critical.
  - **CWV:** LCP/INP/CLS p75 đạt good (TR).
  - **Funnel:** CTR CTA mở tài khoản / completion (GA4).
  - **Engineering:** deploy định kỳ; MTTR < ngưỡng.
  - **Risk:** vulnerabilities dependencies giảm; PHP legacy loại bỏ.
- **Evidence notes:** `audit/kpi-metrics.md`.
- **Speaker notes:** Đặt baseline ngay trong Phase 0 để tránh tranh cãi sau 6 tháng.

---

## Slide 21 — Final recommendation

- **Title:** Final recommendation
- **Objective:** Clear ask.
- **Key takeaway:** **Phê duyệt** chương trình modernization; **cấp budget** cho migration + ops; **chỉ định** owner SEO/Product/Tech.
- **Bullets:**
  - **Approve** roadmap phase 0–4 và runbook cutover.
  - **Invest** vào CI/testing và production env (P0 TR).
  - **Assign** SEO owner cho hreflang/canonical QA; Product owner cho funnel.
  - **Communicate** nội bộ: đây là nâng cấp **nền tảng**, không chỉ skin.
  - **Measure** KPI 30/60/90 ngày sau go-live.
- **Evidence notes:** Tổng hợp từ `findings-detailed.md`, `comparison-matrix.md`.
- **Speaker notes:** Kết bằng: “Chúng ta đã có code đúng hướng — cần quyết định đầu tư để biến thành lợi thế thị trường.”
