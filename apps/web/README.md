# Web App (Next.js)

## Run
```bash
pnpm --filter @fintech/web dev
```

## Quality Gates
```bash
pnpm --filter @fintech/web lint
pnpm --filter @fintech/web typecheck
pnpm --filter @fintech/web seo:audit
```

## Main Features
- App Router + Server Components default
- next-intl locale routing (`/vi`, `/en`)
- Apollo GraphQL integration to Strapi
- CMS-driven header/footer/homepage/sections
- Dynamic listing/detail templates for services, news, events, research, careers
- SEO metadata + JSON-LD + sitemap/robots
- GEO baseline (`llms.txt`) + SEO/GEO audit script
- Contact form (React Hook Form + Zod + honeypot)
