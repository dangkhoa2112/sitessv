# CMS (Strapi v4)

## Run
```bash
pnpm --filter @fintech/cms develop
```

## Seed Data
```bash
SEED_ON_BOOTSTRAP=true pnpm --filter @fintech/cms develop
```

## Features
- MySQL-compatible with XAMPP
- GraphQL plugin enabled
- i18n plugin enabled (`vi`, `en`)
- Enterprise content model with reusable components and dynamic zones
- Draft/Publish workflow
- Public read permissions seeded for frontend GraphQL consumption
