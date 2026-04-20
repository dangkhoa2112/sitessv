# SEO + GEO Engineering Checklist

## Route level
- [ ] Page exports `generateMetadata` or `metadata`.
- [ ] Canonical URL is deterministic.
- [ ] hreflang includes `vi`, `en`, and `x-default`.
- [ ] Search/result pages are `noindex,follow` when needed.

## Content level
- [ ] Exactly one H1.
- [ ] Intro summary explains intent in <= 3 sentences.
- [ ] Publish date / updated date is available when applicable.
- [ ] Author entity is available when applicable.

## Structured data
- [ ] Relevant JSON-LD is present (`Article`, `FAQPage`, `BreadcrumbList`, etc.).
- [ ] Structured data values match visible content.

## Crawl/index files
- [ ] `robots.ts` valid.
- [ ] `sitemap.ts` includes indexable routes.
- [ ] `public/llms.txt` exists and is current.

## Repository quality gate
- [ ] `pnpm --filter @fintech/web seo:audit` passes.
- [ ] `pnpm --filter @fintech/web lint` passes.
- [ ] `pnpm --filter @fintech/web typecheck` passes.
