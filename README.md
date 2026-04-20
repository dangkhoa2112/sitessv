# FinTrust Corporate Fintech Platform

Production-oriented multilingual corporate fintech website built with:
- Next.js App Router frontend (`apps/web`)
- Strapi headless CMS (`apps/cms`)
- GraphQL-only content delivery
- MySQL (XAMPP-compatible)
- vi/en localization

## Requirements
- Node.js 20.x (required for Strapi v4)
- pnpm 10+
- XAMPP MySQL running on `127.0.0.1:3306`

## Quick Start
1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Copy env files:
   ```bash
   cp apps/cms/.env.example apps/cms/.env
   cp apps/web/.env.example apps/web/.env.local
   ```
3. Create database in XAMPP MySQL:
   - DB name: `fintech_corporate_cms`
   - Charset/Collation: `utf8mb4` / `utf8mb4_unicode_ci`
4. Start CMS:
   ```bash
   pnpm dev:cms
   ```
5. Seed sample data (first run):
   ```bash
   SEED_ON_BOOTSTRAP=true pnpm --filter @fintech/cms develop
   ```
6. Start frontend:
   ```bash
   pnpm dev:web
   ```

Frontend: http://localhost:3000  
CMS Admin: http://localhost:1337/admin  
GraphQL: http://localhost:1337/graphql

## Documentation
- [Technical Requirements](./docs/technical-requirements.md)
- [Architecture](./docs/architecture.md)
- [Content Model](./docs/content-model.md)
- [Local Setup with XAMPP](./docs/setup-local-xampp.md)
- [SEO/GEO Strategy](./docs/seo-strategy.md)
- [SEO/GEO Engineering Checklist](./docs/seo-geo-checklist.md)
- [Deployment Notes](./docs/deployment.md)
- [Content Writing Guidance](./docs/content-writing-guidance.md)

## SEO/GEO Baseline Check
```bash
pnpm seo:audit
```
