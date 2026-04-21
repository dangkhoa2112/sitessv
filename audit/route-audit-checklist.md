# Route Audit Checklist

Scope: remaining route files in `apps/web/src/app/[locale]` plus the route-driving components that still affect SEO/GEO and template consistency.

Legend:
- `PASS` = acceptable for now, no blocking SEO/GEO issue found in current code.
- `WARN` = works, but there is a structural/content/canonical risk worth revisiting.
- `FIX` = should be changed before release if you want enterprise-grade SEO/GEO consistency.

## Core routes

| File | Route | Status | Audit note |
|---|---|---|---|
| [`apps/web/src/app/[locale]/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/page.tsx) | `/vi` `/en` | WARN | Homepage still mixes legacy fallback content with CMS-driven sections. The banner block is intentionally preserved, but verify final hero/intro/CTA order, heading hierarchy, and internal-link depth on mobile and desktop. |
| [`apps/web/src/app/[locale]/services/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/services/page.tsx) | `/services` | PASS | Listing shell is clean: `PageHero`, search, pagination, and CMS sections are all present. Keep an eye on duplicated H1/H2 semantics inside `SectionRenderer`. |
| [`apps/web/src/app/[locale]/news/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/news/page.tsx) | `/news` | PASS | Good listing template with search, cards, and pagination. Metadata is route-aware and the intent is clear. |
| [`apps/web/src/app/[locale]/research/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/research/page.tsx) | `/research` | PASS | Research hub is structured well through `ResearchCenterPage`; internal discovery and section hierarchy are strong enough for now. |
| [`apps/web/src/app/[locale]/events/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/events/page.tsx) | `/events` | PASS | Listing page is consistent with the other hubs. Search and pagination are in place, and route metadata is aligned. |
| [`apps/web/src/app/[locale]/careers/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/careers/page.tsx) | `/careers` | PASS | Clear hiring hub with editorial intro, search, and pagination. Good enough structurally; no schema gap on the listing page itself. |
| [`apps/web/src/app/[locale]/faq/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/faq/page.tsx) | `/faq` | PASS | FAQ page now emits `FAQPage` JSON-LD and the visible content matches the structured data path. |
| [`apps/web/src/app/[locale]/contact/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/contact/page.tsx) | `/contact` | PASS | Contact page is clean and readable. Org contact signals already exist in the layout JSON-LD, so the route is acceptable. |
| [`apps/web/src/app/[locale]/support/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/support/page.tsx) | `/support` | PASS | Support hub uses `SupportCenterPage` and keeps the page intent focused. No blocking SEO issue found. |
| [`apps/web/src/app/[locale]/search/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/search/page.tsx) | `/search` | PASS | Correctly noindexed and scoped as an internal search page. Good enough for crawl control. |
| [`apps/web/src/app/[locale]/sitemap/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/sitemap/page.tsx) | `/sitemap` | PASS | HTML sitemap is useful for discovery and internal linking. Structure is straightforward. |
| [`apps/web/src/app/[locale]/about/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/about/page.tsx) | `/about` | PASS | Good breadcrumb JSON-LD and strong company-intro shell. This is one of the better template implementations. |
| [`apps/web/src/app/[locale]/legal/[slug]/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/legal/%5Bslug%5D/page.tsx) | `/legal/:slug` | WARN | Breadcrumb currently points back to `/sitemap` instead of a legal hub or legal index page. If you want cleaner IA, add a legal hub route or change the breadcrumb target. |
| [`apps/web/src/app/[locale]/[slug]/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/%5Bslug%5D/page.tsx) | generic pages | PASS | Blocked routes are protected and localized slug resolution is in place. This file is intentionally thin and safe. |

## Detail pages

| File | Route | Status | Audit note |
|---|---|---|---|
| [`apps/web/src/app/[locale]/news/[slug]/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/news/%5Bslug%5D/page.tsx) | `/news/:slug` | PASS | Good article template: `Article` JSON-LD, breadcrumbs, related content, and date metadata are all present. |
| [`apps/web/src/app/[locale]/research/[slug]/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/research/%5Bslug%5D/page.tsx) | `/research/:slug` | PASS | Good research article pattern. Schema, breadcrumb, and downloadable content are aligned. |
| [`apps/web/src/app/[locale]/events/[slug]/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/events/%5Bslug%5D/page.tsx) | `/events/:slug` | PASS | `Event` JSON-LD is in place and the related events block improves discoverability. |
| [`apps/web/src/app/[locale]/careers/[slug]/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/careers/%5Bslug%5D/page.tsx) | `/careers/:slug` | PASS | `JobPosting` JSON-LD is present, and the editorial intro keeps the role intent clear. |
| [`apps/web/src/app/[locale]/support/[...slug]/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/support/%5B...slug%5D/page.tsx) | `/support/...` | PASS | Canonical now normalizes to the leaf slug, and the page emits breadcrumb/WebPage schema plus related support links. |
| [`apps/web/src/app/[locale]/support/chuong-trinh-uu-dai/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/support/chuong-trinh-uu-dai/page.tsx) | legacy promotions alias | PASS | Now a direct 301 to `/support`. |
| [`apps/web/src/app/[locale]/support/chuong-trinh-uu-dai/[...slug]/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/support/chuong-trinh-uu-dai/%5B...slug%5D/page.tsx) | legacy promotions alias | PASS | Now a direct 301 to `/support`. |

## Service routes

| File | Route | Status | Audit note |
|---|---|---|---|
| [`apps/web/src/app/[locale]/services/[slug]/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/services/%5Bslug%5D/page.tsx) | service resolver | PASS | Canonical and `seoDefault` are now wired, and the custom landing pages receive schema URLs. Still a complex switchboard, so verify no dead alias branch remains later. |
| [`apps/web/src/app/[locale]/services/ngan-hang-dau-tu/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/services/ngan-hang-dau-tu/page.tsx) | `/services/ngan-hang-dau-tu` | PASS | Clean wrapper to the investment banking landing component. Schema is handled in the component now. |
| [`apps/web/src/app/[locale]/services/ngan-hang-dau-tu.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/services/ngan-hang-dau-tu.html/page.tsx) | legacy alias | PASS | Redirect-only route. Safe as a migration shim. |
| [`apps/web/src/app/[locale]/services/ngan-hang-dau-tu/thi-truong-von.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/services/ngan-hang-dau-tu/thi-truong-von.html/page.tsx) | `/services/ngan-hang-dau-tu/thi-truong-von.html` | PASS | Clean legacy-style landing route. |
| [`apps/web/src/app/[locale]/services/ngan-hang-dau-tu/thi-truong-no.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/services/ngan-hang-dau-tu/thi-truong-no.html/page.tsx) | `/services/ngan-hang-dau-tu/thi-truong-no.html` | PASS | Clean legacy-style landing route. |
| [`apps/web/src/app/[locale]/services/investment-banking/thi-truong-von.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/services/investment-banking/thi-truong-von.html/page.tsx) | `/services/investment-banking/thi-truong-von.html` | PASS | English alias is still supported cleanly. |
| [`apps/web/src/app/[locale]/services/investment-banking/thi-truong-no.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/services/investment-banking/thi-truong-no.html/page.tsx) | `/services/investment-banking/thi-truong-no.html` | PASS | English alias is still supported cleanly. |
| [`apps/web/src/app/[locale]/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html/page.tsx) | trading landing | PASS | Component now supplies Service JSON-LD by default. |
| [`apps/web/src/app/[locale]/services/moi-gioi-chung-khoan/tu-van-dau-tu.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/services/moi-gioi-chung-khoan/tu-van-dau-tu.html/page.tsx) | advisory landing | PASS | CMS-backed advisory route is fine; component-level schema is now in place. |
| [`apps/web/src/app/[locale]/services/moi-gioi-chung-khoan/dich-vu-tai-chinh.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/services/moi-gioi-chung-khoan/dich-vu-tai-chinh.html/page.tsx) | financial services | PASS | Good legacy landing page. |
| [`apps/web/src/app/[locale]/services/moi-gioi-chung-khoan/he-thong-giao-dich.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/services/moi-gioi-chung-khoan/he-thong-giao-dich.html/page.tsx) | trading system | PASS | Good legacy landing page. |
| [`apps/web/src/app/[locale]/services/moi-gioi-chung-khoan/san-xin-ha.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/services/moi-gioi-chung-khoan/san-xin-ha.html/page.tsx) | San Xin Ha | PASS | Component-level schema is now in place and the route is okay. |
| [`apps/web/src/app/[locale]/san-pham-dich-vu/moi-gioi-chung-khoan/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/san-pham-dich-vu/moi-gioi-chung-khoan/page.tsx) | legacy brokerage alias | PASS | Now a direct 301 to `/services/moi-gioi-chung-khoan`. |
| [`apps/web/src/app/[locale]/san-pham-dich-vu/moi-gioi-chung-khoan.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/san-pham-dich-vu/moi-gioi-chung-khoan.html/page.tsx) | legacy brokerage alias | PASS | Now a direct 301 to `/services/moi-gioi-chung-khoan`. |
| [`apps/web/src/app/[locale]/san-pham-dich-vu/moi-gioi-chung-khoan/san-pham.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/san-pham-dich-vu/moi-gioi-chung-khoan/san-pham.html/page.tsx) | legacy brokerage landing | PASS | Now a direct 301 to `/services/moi-gioi-chung-khoan`. |

## Support and research legacy routes

| File | Route | Status | Audit note |
|---|---|---|---|
| [`apps/web/src/app/[locale]/trung-tam-phan-tich/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/trung-tam-phan-tich/page.tsx) | research hub alias | PASS | Alias hub is clean and renders the same research-center experience. |
| [`apps/web/src/app/[locale]/trung-tam-phan-tich/[slug]/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/trung-tam-phan-tich/%5Bslug%5D/page.tsx) | research detail alias | PASS | Alias detail page resolves and redirects correctly. |
| [`apps/web/src/app/[locale]/trung-tam-phan-tich/bao-cao-dinh-ky.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/trung-tam-phan-tich/bao-cao-dinh-ky.html/page.tsx) | periodic reports alias | PASS | Thin wrapper over `ResearchCategoryPage`; no major issue. |
| [`apps/web/src/app/[locale]/trung-tam-phan-tich/bao-cao-vi-mo.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/trung-tam-phan-tich/bao-cao-vi-mo.html/page.tsx) | macro reports alias | PASS | Thin wrapper over `ResearchCategoryPage`; no major issue. |
| [`apps/web/src/app/[locale]/trung-tam-phan-tich/phan-tich-vien.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/trung-tam-phan-tich/phan-tich-vien.html/page.tsx) | analysts alias | PASS | Thin wrapper over `ResearchCategoryPage`; no major issue. |
| [`apps/web/src/app/[locale]/research/bao-cao-dinh-ky.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/research/bao-cao-dinh-ky.html/page.tsx) | periodic reports | PASS | Canonical alias route is fine. |
| [`apps/web/src/app/[locale]/research/bao-cao-vi-mo.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/research/bao-cao-vi-mo.html/page.tsx) | macro reports | PASS | Canonical alias route is fine. |
| [`apps/web/src/app/[locale]/research/phan-tich-vien.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/research/phan-tich-vien.html/page.tsx) | analysts | PASS | Canonical alias route is fine. |
| [`apps/web/src/app/[locale]/about-us/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/about-us/page.tsx) | legacy redirect | PASS | Redirect-only route to `/about`. |
| [`apps/web/src/app/[locale]/about-us.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/about-us.html/page.tsx) | legacy redirect | PASS | Redirect-only route to `/about`. |
| [`apps/web/src/app/[locale]/ve-chung-toi/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/ve-chung-toi/page.tsx) | legacy redirect | PASS | Direct 301 to `/about`; no intermediate hop. |
| [`apps/web/src/app/[locale]/ve-chung-toi.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/ve-chung-toi.html/page.tsx) | legacy redirect | PASS | Direct 301 to `/about`; no intermediate hop. |
| [`apps/web/src/app/[locale]/ve-chung-toi/cong-ty-dau-tu-shinhan/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/ve-chung-toi/cong-ty-dau-tu-shinhan/page.tsx) | legacy redirect | PASS | Direct 301 to `/about`; no intermediate hop. |
| [`apps/web/src/app/[locale]/ve-chung-toi/cong-ty-dau-tu-shinhan.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/ve-chung-toi/cong-ty-dau-tu-shinhan.html/page.tsx) | legacy redirect | PASS | Direct 301 to `/about`; no intermediate hop. |
| [`apps/web/src/app/[locale]/ve-chung-toi/tap-doan-tai-chinh-shinhan/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/ve-chung-toi/tap-doan-tai-chinh-shinhan/page.tsx) | legacy redirect | PASS | Direct 301 to `/about`; no intermediate hop. |
| [`apps/web/src/app/[locale]/ve-chung-toi/tap-doan-tai-chinh-shinhan.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/ve-chung-toi/tap-doan-tai-chinh-shinhan.html/page.tsx) | legacy redirect | PASS | Direct 301 to `/about`; no intermediate hop. |
| [`apps/web/src/app/[locale]/ve-chung-toi/lien-he/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/ve-chung-toi/lien-he/page.tsx) | legacy redirect | PASS | Direct 301 to `/contact`; no intermediate hop. |
| [`apps/web/src/app/[locale]/ve-chung-toi/lien-he.html/page.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/app/%5Blocale%5D/ve-chung-toi/lien-he.html/page.tsx) | legacy redirect | PASS | Direct 301 to `/contact`; no intermediate hop. |

## Supporting components that still affect route quality

| File | Route impact | Status | Audit note |
|---|---|---|---|
| [`apps/web/src/components/sections/SectionRenderer.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/components/sections/SectionRenderer.tsx) | CMS sections across many routes | WARN | The `related-content` block is still a generic placeholder paragraph with a single hub link. For GEO/internal-linking, it should become real related-card content or accept route-specific related links. |
| [`apps/web/src/components/home/HomeCmsSections.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/components/home/HomeCmsSections.tsx) | homepage CMS blocks | PASS | FAQ schema is emitted here already, so the homepage CMS layer is materially better than the generic renderer. |
| [`apps/web/src/components/about/AboutReferenceLayout.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/components/about/AboutReferenceLayout.tsx) | `/about` and legacy about paths | PASS | Strong H1 + TOC + anchored sections. This is one of the better enterprise templates in the repo. |
| [`apps/web/src/components/research/ResearchCenterPage.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/components/research/ResearchCenterPage.tsx) | `/research` and alias hub pages | PASS | Good hub pattern with tracks, tag chips, cards, and search. |
| [`apps/web/src/components/support/SupportCenterPage.tsx`](/Users/dangkhoa/Desktop/sitetintuc/apps/web/src/components/support/SupportCenterPage.tsx) | `/support` | PASS | Good hierarchy and editorial intro. No blocking issue detected. |

## Highest-priority follow-ups

1. Replace the promotions routes' `events` data source with a real promotions content type.
2. Replace the generic `related-content` placeholder in `SectionRenderer` with actual link cards.
3. Add a legal hub route if `/legal/[slug]` should remain a first-class content family.
