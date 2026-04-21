# KPI & expected outcomes — transformation program

**Mục tiêu:** Mỗi chỉ số gắn **owner**, **cách đo**, và **ngưỡng** để tránh tranh luận định tính.

---

## 1. Acquisition & SEO

| KPI | Baseline (ghi nhận tại audit) | Target (6–12 tháng sau cutover ổn định) | Cách đo | Impact kinh doanh |
|-----|-------------------------------|----------------------------------------|---------|-------------------|
| **Indexed pages (GSC)** | So với sitemap; sitemap live có lastmod 2021 | Tăng hoặc ổn định theo số URL thật; lỗi “Discovered not indexed” giảm | Google Search Console | Khả năng **hiển thị** cho sản phẩm/tin |
| **Duplicate / Alternate hreflang issues** | hreflang không thấy trên sample live | 0 critical trong GSC International Targeting | GSC | Tránh **cannibalize** VI/EN |
| **Rich result validity** | JSON-LD không thấy trên sample | Pass validation cho Organization + Article template | Rich Results Test / CI | **CTR** SERP |
| **Organic sessions to /news, /research** | Log analytics hiện tại | +X% (đặt X theo baseline sau 90 ngày) | GA4 | **Lead education** |

---

## 2. Performance (Core Web Vitals)

| KPI | Target (TR §3.1) | Cách đo | Impact |
|-----|------------------|---------|--------|
| **LCP** | p75 ≤ 2.5s mobile | CrUX / Lighthouse CI | **Bounce**, conversion |
| **INP** | p75 ≤ 200ms | CrUX | Tương tác form, menu |
| **CLS** | p75 ≤ 0.1 | CrUX | Tin cậy layout fintech |

**Baseline:** Chạy Lighthouse trên `/vi`, `/vi/tin-tuc` (hoặc tương đương), `/vi/san-pham-dich-vu` trước cutover.  
**Ghi chú:** Live hiện `Cache-Control: no-store` — thường **bất lợi** cho TTFB/LCP; target stack Next+CDN kỳ vọng cải thiện.

---

## 3. Conversion & product discovery

| KPI | Cách đo | Impact |
|-----|---------|--------|
| **CTR hero “Mở tài khoản”** | GTM events | **Account opening funnel** |
| **Completion rate** các bước mở TK (nếu cùng domain) | Funnel GA4 | Doanh thu nền tảng |
| **Tìm kiếm nội bộ** usage | Site search events | Insight nội dung |

---

## 4. Engineering & delivery

| KPI | Baseline | Target | Impact |
|-----|----------|--------|--------|
| **Deploy frequency** | Không đo được từ repo | ≥ 1/tuần staging; prod theo change | **Time-to-market** |
| **Failed deploy %** | — | < 2% | Ổn định |
| **Mean time to restore (MTTR)** | — | < 4h (marketing site) | Rủi ro thương hiệu |
| **GraphQL p95 latency** | — | Ngưỡng nội bộ + alert | Chi phí hạ tầng |

---

## 5. Risk & compliance

| KPI | Cách đo | Impact |
|-----|---------|--------|
| **Critical vulnerabilities (deps)** | `pnpm audit` / Dependabot | **Bảo mật** (PHP 7.4 live là red flag) |
| **404 rate sau redirect** | CDN/server logs | **SEO equity** |
| **Cookie / consent** | Audit tag GTM | **Pháp lý** |

---

## 6. GEO / AI retrieval (trailing)

| KPI | Cách đo | Impact |
|-----|---------|--------|
| **llms.txt availability** | HTTP 200 | Cho phép **AI discovery** có kiểm soát |
| **Brand answer correctness** | Manual eval trên 10 prompt | **Reputation** |

---

## Bảng tóm tắt cho slide 20

| Nhóm | 3 số cần nhớ |
|------|----------------|
| **SEO** | Indexed coverage ổn định, hreflang sạch, rich results pass |
| **Perf** | LCP/INP/CLS đạt ngưỡng good p75 |
| **Delivery** | Deploy định kỳ + MTTR ngắn |
