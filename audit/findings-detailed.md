# Findings chi tiết — Shinhan Securities Vietnam (shinhansec.com.vn) vs. codebase `fintech-corporate-platform`

**Phạm vi:** Audit live site (HTTP/HTML/sitemap) + đọc source trong monorepo (`apps/web`, `apps/cms`).  
**Ngày tham chiếu:** 2026-04-21.

---

## Điểm số theo layer (thang /10)

| Layer | Mô tả ngắn | Website live (hiện tại) | Source trong repo (đề xuất / target build) |
|-------|------------|-------------------------|---------------------------------------------|
| **L1** Business & User Journey | Messaging, discovery, conversion, trust, đa ngôn ngữ, tin/nghiên cứu | **5** | **7** |
| **L2** UX/UI System | Layout, typography, CTA, consistency, a11y, responsive | **4** | **7** |
| **L3** SEO / GEO | IA, URL, internal link, metadata, hreflang, sitemap, schema, chunking | **4** | **8** |
| **L4** Frontend Architecture | Routing, composition, DS, data layer, SSR/ISR, CMS, testability | **3** | **8** |
| **L5** Platform Readiness | Performance, deploy, observability, governance, velocity | **4** | **7** |

**Giải thích ngắn điểm số**

- **Live thấp ở L4/L5/L2:** Stack PHP 7.4 + template/jQuery, cache `no-store`, không thấy pipeline hiện đại trong response; UX có dấu hiệu legacy (viewport khóa zoom).
- **Source cao ở L3/L4:** Next.js App Router, metadata builder, `sitemap.ts`/`robots.ts`, JSON-LD helpers, Strapi GraphQL — nhưng **chưa chứng minh production** và còn gap vận hành (test tự động, CI, on-demand revalidate theo `docs/technical-requirements.md`).

---

## Layer 1 — Business & User Journey

### Đang yếu / rủi ro (live)

- **Messaging & CTA:** Trang chủ có block “Mở tài khoản” và “Hệ thống giao dịch” (fetch markdown đã thấy); tuy nhiên trải nghiệm phụ thuộc template PHP và tải jQuery/Bootstrap — khó đảm bảo tốc độ và nhất quán funnel.
- **Đa ngôn ngữ:** Có `/vi` và `/en` (header có switch). **Chưa thấy `hreflang`** trong sample HTML (grep không ra). Rủi ro trùng lặp/ưu tiên phiên bản ngôn ngữ trên SERP.
- **Trust:** Hotline hiển thị; GTM bật — cần đối chiếu policy cookie/consent (chưa đánh giá đầy đủ trong audit này).

### Evidence (live)

- Response root: **HTTP 303** → `Location: https://shinhansec.com.vn/vi` (curl `-sI`).
- HTML `<head>`: `canonical` = `https://shinhansec.com.vn/vi.html` trong khi đường dẫn thực tế là `/vi` — **tín hiệu URL không thống nhất** cho user journey và SEO.
- `og:url` = `https://shinhansec.com.vn/` — **khác canonical** trên cùng trang.

### Promising (source)

- Route theo locale `/[locale]/*` và `next-intl` (kiến trúc trong `docs/architecture.md`).
- Homepage: `page.tsx` kết hợp CMS + `HomeLegacyFallback` — cho phép **parity dần** với site cũ trong khi chuyển đổi.

### Missing / cần làm trước migration

- Chuẩn hóa **sơ đồ funnel** (mở TK, hỗ trợ, nghiên cứu) và map URL cũ → mới (đã có `redirects`/`rewrites` Vi trong `next.config.ts`).

---

## Layer 2 — UX/UI System

### Đang yếu (live)

- **Viewport:** `maximum-scale=1.0, user-scalable=no` — hạn chế zoom, thường bị coi là **kém accessibility** (WCAG).
- **Stack UI:** Bootstrap + `jquery.min.js` + `main.css?v=1255` — pattern enterprise cũ, khó đồng bộ design system.
- **Nhất quán:** Khó chứng minh “single design system” khi CSS/JS tĩnh theo template version.

### Evidence (live)

- HTML: `link` tới `/templates/css/bootstrap.min.css`, `main.css`, `style.min.css`; script `jquery.min.js`.

### Promising (source)

- Tailwind 4 + components (`SectionRenderer`, cards, typography classes trong TSX).
- Tách section theo CMS (`ComponentSections*` trong GraphQL switch).

### Missing

- **Audit visual regression / a11y** chưa thấy trong repo (không có Playwright/Cypress/Jest trong grep toàn monorepo).

---

## Layer 3 — SEO / GEO

### Đang yếu (live)

- **Sitemap freshness:** `https://shinhansec.com.vn/sitemap.xml` là **sitemap index**; các `<lastmod>` trong index là **2021-07-30** — tín hiệu **không cập nhật** cho công cụ tìm kiếm.
- **Canonical vs social:** `canonical` (`…/vi.html`) vs `og:url` (`https://shinhansec.com.vn/`) — dễ gây **trùng lặp tín hiệu**.
- **Hreflang:** Sample HTML không chứa `hreflang` (grep không khớp).
- **Structured data:** Không thấy `application/ld+json` trong phần đầu HTML (grep không khớp).

### Evidence (live)

- `robots.txt`: `Sitemap: https://shinhansec.com.vn/sitemap.xml`, disallow admin/library/site/system/templates.
- Sitemap index XML (curl): 4 child sitemaps, lastmod 2021.

### Promising (source)

- `apps/web/src/lib/seo.ts`: `alternates.canonical`, `alternates.languages` (vi/en/x-default).
- `apps/web/src/app/sitemap.ts`: gộp static + entity CMS, `lastModified` từ `updatedAt`.
- `apps/web/src/lib/json-ld.ts`: Organization, WebSite + SearchAction, Article, FAQ, Service, Breadcrumb.
- `apps/web/public/llms.txt`: hướng dẫn GEO/AI (canonical, hub URLs, search noindex).

### Missing trên live (GEO)

- `GET https://shinhansec.com.vn/llms.txt` → **HTTP 404** (curl `-sI`, 2026-04-21). Repo đã có `apps/web/public/llms.txt` — cần **publish** khi cutover.

### Missing trước go-live

- `SITE_URL`/`NEXT_PUBLIC_*` production, CDN `remotePatterns` ảnh (xem `docs/technical-requirements.md` P0).
- Chạy `pnpm seo:audit` trong CI (đề xuất trong TR).

---

## Layer 4 — Frontend Architecture

### Đang yếu (live)

- **X-Powered-By: PHP/7.4.24** — PHP 7.4 đã hết vòng đời; rủi ro bảo mật và chi phí nâng cấp.
- Session: `Set-Cookie: ci_session=…` (CodeIgniter-style) — **stateful** trên trang marketing, ảnh hưởng cache/CDN.
- Kiến trúc: template-driven, không phân tách rõ content API hiện đại như headless.

### Evidence (live)

- Headers: `Server: Apache`, `X-Powered-By: PHP/7.4.24`, `Set-Cookie` csrf + ci_session.

### Promising (source)

- Next.js 16 App Router, `metadata` API, ISR `REVALIDATE_TIME` (default 120s trong `constants.ts`).
- Data: Apollo SSR (`docs/architecture.md`), GraphQL Strapi.
- Modularity: `SectionRenderer`, homepage CMS sections.

### Missing

- **Không có test tự động** (không match jest/vitest/playwright trong repo).
- **Không thấy `.github/workflows`** — CI/CD governance chưa trong repo.

---

## Layer 5 — Platform Readiness

### Đang yếu (live)

- **Cache-Control:** `no-store, no-cache, must-revalidate` trên response — khó tối ưu TTFB/LCP ở edge.
- **Last-Modified** trên một response sitemap: **Fri, 19 Nov 2021** (curl `-sI` từng endpoint) — gợi ý asset/tệp tĩnh ít được quản trị động.

### Promising (source)

- Security headers trong `next.config.ts` (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, HSTS prod).
- Monorepo pnpm, script `seo:audit`.

### Missing (theo TR)

- On-demand revalidation webhook Strapi (mục tiêu).
- APM/RUM, backup tự động — mức **mục tiêu** trong `docs/technical-requirements.md`.

---

## Tổng kết consultant

| Khía cạnh | Live | Source (repo) |
|-----------|------|----------------|
| **What is broken** | Canonical/OG lệch; sitemap lastmod 2021; PHP 7.4; cache no-store; viewport khóa zoom | Chưa có: test/CI trong repo; production env chưa được audit tại runtime |
| **What is missing** | hreflang/JSON-LD trong sample; tín hiệu freshness | Webhook revalidate, rate limit GraphQL, hoàn thiện contact pipeline (TR) |
| **What is promising** | GTM/tracking đã gắn; nội dung tiếng Việt đầy đủ trên homepage | Next+Strapi+SEO module + llms.txt + định tuyến locale |

---

## Tham chiếu file (repo)

- `docs/technical-requirements.md` — P0/P1/P2, CWV, OWASP mapping.
- `docs/architecture.md` — hình dạng giải pháp.
- `apps/web/next.config.ts` — redirects Vi, rewrites, security headers.
- `apps/web/src/lib/seo.ts`, `apps/web/src/app/sitemap.ts`, `apps/web/src/app/robots.ts`
- `apps/web/package.json` — dependencies, `seo:audit`.
