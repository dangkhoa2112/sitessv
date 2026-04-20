# Technical Requirements (TR)

Tài liệu yêu cầu kỹ thuật cho nền tảng **FinTrust Corporate / fintech-corporate-platform** (monorepo pnpm: `apps/web`, `apps/cms`). Baseline được căn cứ trên code và tài liệu hiện có (`docs/architecture.md`, `docs/deployment.md`, `docs/seo-strategy.md`, v.v.). Các mục đánh dấu **(mục tiêu)** là tiêu chí production hoặc lộ trình bổ sung.

---

## 1. Tóm tắt bối cảnh (baseline repo)

| Thành phần | Hiện trạng trong repo |
|------------|------------------------|
| Frontend | Next.js App Router, Tailwind 4, đa ngôn ngữ `/vi/*`, `/en/*`, ISR qua `fetch` + `revalidate` (`REVALIDATE_TIME`, mặc định 120s trong `apps/web/src/lib/constants.ts`) |
| CMS | Strapi 4, GraphQL public cho web, MySQL (`apps/cms/config/database.ts`), seed/bootstrap |
| API công khai | Chủ yếu GraphQL Strapi; Next có ví dụ `POST /api/contact` (Zod + honeypot; tích hợp gửi email/CRM có thể chưa hoàn chỉnh — kiểm tra trước go-live) |
| SEO | `robots.ts`, `sitemap.ts` (URL động từ CMS), JSON-LD (`apps/web/src/lib/json-ld.ts`), chiến lược trong `docs/seo-strategy.md` |
| Triển khai tham chiếu | `docs/deployment.md`: Node 20, pnpm, Nginx, PM2, dump MySQL + backup uploads |

---

## 2. Kiến trúc hệ thống đề xuất

### 2.1. Tầng ứng dụng

- **Public web (`apps/web`)**  
  - SSR/SSG/ISR cho nội dung indexable; ưu tiên server components, client components chỉ khi cần tương tác.  
  - **Data plane**: tiêu thụ **GraphQL Strapi** phía server (Apollo `ssrMode` trong `apps/web/src/lib/apollo.ts`). Không đưa secret Strapi vào bundle client; cân nhắc URL GraphQL nội bộ nếu tách network.

- **Headless CMS (`apps/cms`)**  
  - Nguồn dữ liệu nội dung, media, SEO fragment, i18n.  
  - **Admin** và **API** nên tách biệt về network trong production (subdomain riêng, firewall), chỉ mở endpoint đọc cần thiết ra internet.

- **Cơ sở dữ liệu**  
  - **MySQL** (utf8mb4). Điều chỉnh pool (`DATABASE_POOL_*`) theo tải thực tế.

- **Trading / tài khoản (logical boundary)**  
  - Site marketing **không** đóng vai trò hệ thống giao dịch; chỉ deep-link, tracking và nội dung tuân policy. Không lưu credential trading trên CMS.

### 2.2. Hosting & runtime

- **Compute**: VPS/Linux hoặc container (Docker); Node 20 cho Strapi; Next dạng Node server hoặc standalone build.  
- **Process manager**: PM2 hoặc systemd.  
- **Reverse proxy**: Nginx — TLS, nén, cache static, security headers (tham chiếu `docs/deployment.md`).

### 2.3. CDN & tài sản tĩnh

- CDN edge cho `/_next/static`, asset public, và (khuyến nghị) **Strapi uploads** qua origin CDN hoặc object storage.  
- `next.config.ts` (`images.remotePatterns`) hiện phục vụ dev localhost — **(mục tiêu)** bổ sung hostname HTTPS production/CDN.

### 2.4. Môi trường

- Tối thiểu: **dev**, **staging** (dữ liệu giả/anonymized), **prod**.  
- Phân tách biến môi trường: `NEXT_PUBLIC_*` vs server-only (webhook secrets, DB, URL nội bộ).

### 2.5. On-demand revalidation **(khuyến nghị)**

- Hiện: revalidate theo thời gian (`REVALIDATE_TIME`).  
- **(mục tiêu)** Webhook Strapi (publish/unpublish) → Next on-demand revalidation theo slug/route để giảm độ trễ và tải GraphQL.

---

## 3. Yêu cầu performance

### 3.1. Core Web Vitals **(mục tiêu production, p75 mobile)**

| Metric | Mục tiêu (good) |
|--------|------------------|
| **LCP** | ≤ 2.5s |
| **INP** | ≤ 200ms |
| **CLS** | ≤ 0.1 |

### 3.2. Web performance

- Tối ưu TTFB (cache phù hợp, tránh công việc nặng đồng bộ trên request path nóng).  
- Giữ JavaScript nhỏ; `next/image`, font subset / `next/font`, tránh CLS.  
- GraphQL: tránh over-fetch, phân trang listing, TTL/cache hợp lý phía Next.

### 3.3. Scalability

- Instance Next **stateless** để scale ngang.  
- Strapi: scale worker; DB là điểm nghẽn — xem xét read replica khi đọc lớn.  
- Rate limiting tại edge/Nginx cho `/graphql` và API public.

### 3.4. Đo lường

- RUM (web-vitals), Lighthouse CI hoặc tương đương; ngưỡng cảnh báo theo p75.

---

## 4. Tiêu chuẩn bảo mật

### 4.1. Ánh xạ OWASP Top 10 (yêu cầu hành vi)

| Rủi ro | Yêu cầu kỹ thuật |
|--------|------------------|
| **A01 Broken Access Control** | Public role Strapi chỉ đọc nội dung công khai; mutation qua luồng nội bộ; phân quyền editor/admin rõ ràng; hạn chế introspection GraphQL trên production nếu không cần. |
| **A02 Cryptographic Failures** | TLS 1.2+; bảo vệ session/cookie; `APP_KEYS` và credential DB mạnh. |
| **A03 Injection** | Giới hạn độ sâu/độ phức tạp GraphQL nếu có thể; form validate (Zod); rich text sanitize khi render (`sanitize-html`). |
| **A04 Insecure Design** | Ranh giới marketing vs trading; không nhúng bí mật phía client; threat model cho webhook revalidation. |
| **A05 Security Misconfiguration** | `poweredByHeader: false` (Next); harden Strapi CORS — **lưu ý**: `apps/cms/config/middlewares.ts` hiện whitelist localhost; **(mục tiêu)** whitelist domain production; CSP cho web và admin. |
| **A06 Vulnerable Components** | CI: audit dependency; cập nhật có kiểm soát (Strapi/Next). |
| **A07 Identification and Authentication Failures** | Bảo vệ Strapi admin (MFA nếu có), rate limit đăng nhập. |
| **A08 Software and Data Integrity Failures** | Ký webhook (HMAC); kiểm tra nguồn request. |
| **A09 Security Logging and Monitoring Failures** | Xem mục 7; không log PII thừa. |
| **A10 SSRF** | Fetch server-side chỉ tới endpoint đã allowlist; không cho user điều khiển URL fetch nội bộ. |

### 4.2. Dữ liệu người dùng & privacy

- Form liên hệ: cơ sở pháp lý xử lý, retention, quyền xóa theo yêu cầu.  
- Mask PII trong log.  
- Cookie consent nếu dùng analytics bên thứ ba.

### 4.3. Headers **(mục tiêu)**

- `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options` / `Content-Security-Policy` (frame-ancestors), `Referrer-Policy`, `Permissions-Policy`, CSP điều chỉnh theo CDN/analytics.

---

## 5. Yêu cầu tích hợp

### 5.1. Trading system & account

- Deep-link sang nền tảng giao dịch; SSO chỉ khi có thiết kế thống nhất.  
- UTM/campaign và link maintenance có thể quản qua CMS.

### 5.2. CRM / service desk / email

- **(mục tiêu)** Hoàn thiện luồng contact: SMTP, ticket system, hoặc CRM webhook; idempotency và queue nếu volume lớn.

### 5.3. API

- GraphQL Strapi là API nội dung chính; Route Handlers Next: rate limit + validation.  
- Contract test hoặc kiểm tra regression cho các query quan trọng.

### 5.4. Tracking

- **(mục tiêu)** GA4/GTM hoặc tương đương với consent mode; server-side events cho conversion quan trọng (tùy chính sách privacy).

---

## 6. Định hướng SEO kỹ thuật

### 6.1. Crawlability & indexability

- `robots.ts`: disallow `/api/` và tham số search phù hợp.  
- Trang internal search: `noindex` (theo `docs/seo-strategy.md`).  
- Canonical + hreflang tập trung (`apps/web/src/lib/seo.ts`).

### 6.2. Structured data

- Organization, WebSite (+ SearchAction), Article, FAQPage, Breadcrumb — validate Rich Results; tránh mâu thuẫn giữa các block JSON-LD.

### 6.3. Sitemap & freshness

- `sitemap.ts` gộp static + động; đảm bảo `lastmod` chính xác; chunk nếu số URL rất lớn; submit Search Console.

### 6.4. International

- Một URL mỗi locale; `x-default` theo chính sách dự án (mặc định `/vi` trong doc SEO).

### 6.5. GEO / AI discovery

- Duy trì `public/llms.txt` và entity nhất quán.  
- Chạy `pnpm seo:audit` trong CI (khuyến nghị trong `docs/seo-strategy.md`).

---

## 7. Logging, monitoring, backup & disaster recovery

### 7.1. Logging

- Structured logs (JSON) cho Next và Strapi; correlation id.  
- Access/error log Nginx.  
- Audit: đăng nhập admin, publish, thay đổi permission.

### 7.2. Monitoring & alerting

- Uptime synthetic (trang chủ và endpoint health nếu có).  
- APM: error rate, latency GraphQL, DB pool.  
- Cảnh báo: spike 5xx, disk, failed jobs.

### 7.3. Backup

- MySQL: `mysqldump` hoặc snapshot managed DB — định nghĩa **RPO** (ví dụ 24h).  
- Uploads Strapi: sync định kỳ.  
- Retention: 7–30 bản tùy compliance (tham chiếu `docs/deployment.md`).

### 7.4. Disaster recovery

- Ghi nhận **RTO/RPO** mục tiêu (ví dụ RPO 24h, RTO vài giờ cho site marketing).  
- Runbook: restore DB + uploads + deploy commit đã kiểm tra; kiểm tra DNS/TLS.  
- DR drill định kỳ.

---

## 8. Ma trận ưu tiên triển khai (gợi ý)

| Ưu tiên | Hạng mục |
|--------|-----------|
| P0 | TLS, harden CORS/env production, hoàn thiện contact → kênh thật, CDN + `remotePatterns` ảnh prod |
| P1 | On-demand revalidation, rate limit GraphQL/public API, CI (lint, typecheck, `seo:audit`), backup tự động |
| P2 | MFA admin, APM/RUM, DR drill, consent/analytics |

---

## 9. Tài liệu liên quan trong repo

- [Architecture](./architecture.md)
- [Deployment](./deployment.md)
- [SEO / GEO Strategy](./seo-strategy.md)
- [SEO / GEO Engineering Checklist](./seo-geo-checklist.md)
- [Content Model](./content-model.md)
