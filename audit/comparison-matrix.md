# Comparison matrix — Live site vs. codebase (proposed) vs. target operating model

**Mục đích:** Một trang để đưa vào slide 13 và làm căn cứ quyết định. Mọi ô đều gắn **impact** khi khuyến nghị thay đổi.

| Dimension | Website live (shinhansec.com.vn) | Source hiện tại (repo `fintech-corporate-platform`) | Target / “done right” (production) |
|-----------|----------------------------------|-----------------------------------------------------|-------------------------------------|
| **Runtime** | Apache + **PHP 7.4** (header `X-Powered-By`) | Node 20 + **Next.js 16** (`apps/web/package.json`) | Next standalone/Node behind Nginx; **PHP loại bỏ** khỏi public marketing |
| **Rendering** | Server-side template + jQuery/Bootstrap | **SSR + ISR** (`REVALIDATE_TIME`, server-first) | ISR + **on-demand revalidate** khi publish (impact: freshness, giảm tải GraphQL) |
| **Content model** | Template + uploads path (`/templates/`, `/uploads/`) | **Strapi 4** + GraphQL + section components | Strapi là **single source of truth**; editor workflow rõ |
| **International** | `/vi`, `/en` có switch; **hreflang không thấy** trong HTML sample | `next-intl`, `seo.ts` `alternates.languages`, `/vi/*` `/en/*` | Hreflang + canonical **nhất quán** trên mọi template (impact: tránh duplicate locale) |
| **Metadata** | `canonical` (`…/vi.html`) **≠** `og:url` (`/`) | `buildPageMetadata` thống nhất OG/Twitter/canonical | QA checklist mỗi template; CMS field validation |
| **Sitemap** | Index XML, **lastmod 2021** trên child sitemap refs | `sitemap.ts` động + `lastModified` từ CMS | Submit GSC; monitor 404/5xx sau cutover |
| **Robots** | `robots.txt` tối giản | `robots.ts` disallow `/api/`, `/*?q=*` | Khớp policy internal search (impact: tránh index rác) |
| **Structured data** | **Không thấy** `ld+json` trong sample | `json-ld.ts` + inject theo page | Rich Results test trong CI (`seo:audit` mở rộng) |
| **GEO / AI** | `/llms.txt` → **404** (curl `-sI` live) | `public/llms.txt` trong repo | Host `llms.txt` (200) + entity nhất quán (impact: retrieval trong AI search) |
| **Caching** | `Cache-Control: no-store` (sample) | Edge-friendly Next static/chunking | CDN cache policy + **bỏ session** khỏi HTML marketing nếu có thể (impact: LCP/TTFB) |
| **Security headers** | Không liệt kê đầy đủ trong sample response | `next.config.ts`: nosniff, frame, HSTS prod | CSP theo analytics (TR mục tiêu) |
| **Session on marketing** | `ci_session` + CSRF cookie | Stateless web tier | Giảm cookie không cần thiết (impact: privacy + cache) |
| **Testing** | Không đánh giá | **Không có** e2e/unit trong repo (grep) | Lighthouse CI + contract GraphQL + smoke (impact: velocity, regression) |
| **CI/CD** | Không thấy từ repo | Không thấy `.github/workflows` | Lint, typecheck, `seo:audit`, deploy artifact (impact: governance) |
| **Observability** | Không đánh giá | TR yêu cầu APM/RUM (mục tiêu) | Error budget, uptime synthetic (impact: MTTR) |

## Ma trận quyết định (impact → hành động)

| Nếu không đổi | Hệ quả đo được / kinh doanh |
|---------------|-----------------------------|
| Giữ PHP template + sitemap “đóng băng” 2021 | Crawl budget kém; nghi ngờ **freshness**; khó mở rộng sản phẩm |
| Canonical/OG lệch | **Chia sẻ social** và reporting attribution sai; risk duplicate |
| Không hreflang | **Trùng EN/VI** trên SERP; CTR kém |
| Marketing pages mang session | **Không cache được HTML**; chi phí hạ tầng cao hơn cần thiết |
| Không test/CI | Mỗi release **rủi ro regression**; chậm khi mở team |

| Khi chuyển sang Next + Strapi đúng chuẩn | Lợi ích |
|------------------------------------------|---------|
| Metadata + sitemap động | **Index đúng URL**; cập nhật tin/nghiên cứu nhanh |
| Section-based CMS | Marketing **tự phục vụ**; giảm phụ thuộc dev cho copy |
| ISR + webhook | **Độ trễ thấp** sau publish; giảm tải DB read |
| `llms.txt` + chunk rõ | **GEO readiness** cho AI answers |
