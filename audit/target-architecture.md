# Target architecture — Shinhan Securities public web (đề xuất triển khai từ repo hiện có)

**Căn cứ:** `docs/architecture.md`, `docs/technical-requirements.md`, code `apps/web`, `apps/cms`.

---

## 1. Logical view

```
[Internet] → [CDN / Nginx TLS] → [Next.js apps/web]
                                      ↓ GraphQL (server-only)
                                 [Strapi apps/cms]
                                      ↓
                                   [MySQL]
```

- **Marketing web** không xử lý giao dịch; chỉ deep-link sang hệ thống trading theo policy (TR §2.1).
- **Biên tập nội dung** qua Strapi; public role chỉ đọc (TR §4.1).

---

## 2. Frontend (`apps/web`)

| Thành phần | Vai trò |
|------------|---------|
| **Next.js App Router** | SSR/ISR cho nội dung indexable; layout locale persistent. |
| **next-intl** | `/vi/*`, `/en/*`; switch ngôn ngữ không tách domain (trừ khi policy đổi). |
| **Apollo GraphQL (SSR)** | Fetch tại server; không lộ secret Strapi ra client. |
| **SEO layer** | `buildPageMetadata`, `sitemap.ts`, `robots.ts`, JSON-LD helpers. |
| **Việt hóa URL** | `next.config.ts`: `redirects` 301 từ slug “legacy” → slug mới; `rewrites` phục vụ đường dẫn SEO tiếng Việt nội bộ. |

**Chiến lược rendering**

- Listing + detail: ISR với `REVALIDATE_TIME` (mặc định 120s).
- **Mục tiêu:** webhook Strapi → on-demand revalidate theo slug (TR §2.5) — giảm staleness và chi phí GraphQL.

---

## 3. CMS (`apps/cms`)

- Strapi 4, MySQL, components/sections cho homepage và trang modular.
- Media qua `/uploads`; production nên **CDN** cho uploads (TR §2.3).
- CORS: cấu hình `CORS_ORIGINS` production (TR §4.1 — hiện fallback localhost trong `middlewares.ts`).

---

## 4. SEO / GEO architecture

| Thành phần | Hành vi mục tiêu |
|------------|------------------|
| **Canonical + hreflang** | Một URL/locale; `x-default` theo policy (mặc định `/vi` trong doc SEO). |
| **Sitemap** | Single `sitemap.xml` (hoặc chunk) với `lastmod` từ CMS. |
| **Internal search** | `noindex` khi có query (`buildListingPageMetadata`). |
| **llms.txt** | Công bố tại root; đồng bộ với entity và hub URLs. |
| **JSON-LD** | Organization, WebSite, Article, FAQ… — validate Rich Results. |

---

## 5. Platform & governance

| Mảng | Target |
|------|--------|
| **Deploy** | Build Next standalone; PM2/systemd; Nginx reverse proxy (`docs/deployment.md`). |
| **Secrets** | Tách `NEXT_PUBLIC_*` vs server-only; không đưa token Strapi vào bundle. |
| **Headers** | Đã có baseline Next; bổ sung **CSP** theo GTM/analytics (TR §4.3). |
| **Observability** | Structured logs, APM, synthetic uptime (TR §7). |
| **CI** | `lint`, `typecheck`, `pnpm seo:audit` trên mỗi PR (TR §6 + §8). |

---

## 6. Điều kiện “đủ tốt” trước cutover DNS

1. `NEXT_PUBLIC_SITE_URL`, Strapi URL, CDN image domains trong `remotePatterns`.
2. 301 map đầy đủ URL legacy `.html` và slug cũ (đã bắt đầu trong config; cần inventory đầy đủ).
3. Loại bỏ hoặc giảm tối đa **mismatch canonical/og** trên các template chính.
4. Runbook rollback (DNS/revert deploy) và kiểm thử GSC sau đổi.

---

## 7. Khác biệt so với live

| Live | Target |
|------|--------|
| PHP/CodeIgniter session trên page | Stateless Next; cache hợp lý |
| Sitemap lastmod 2021 | `lastModified` động |
| jQuery/Bootstrap template | React + Tailwind + DS trong code |
