# Local Setup with XAMPP MySQL

## 1. Start MySQL in XAMPP
- Open XAMPP Control Panel.
- Start `MySQL` service.
- Confirm port is `3306`.

## 2. Create Database
In phpMyAdmin or MySQL client:
```sql
CREATE DATABASE fintech_corporate_cms
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

## 3. Environment Files
```bash
cp apps/cms/.env.example apps/cms/.env
cp apps/web/.env.example apps/web/.env.local
```

## 4. Install and Run
```bash
pnpm install
pnpm dev:cms
pnpm dev:web
```

## 5. Seed Data
```bash
SEED_ON_BOOTSTRAP=true pnpm --filter @fintech/cms develop
```

## Common Troubleshooting
- `ECONNREFUSED 127.0.0.1:3306`: MySQL service not running.
- `ER_ACCESS_DENIED_ERROR`: adjust `DATABASE_USERNAME`/`DATABASE_PASSWORD` in `apps/cms/.env`.
- `Unknown collation`: set DB collation to `utf8mb4_unicode_ci`.
- Port conflict: if MySQL runs on different port, update `DATABASE_PORT`.
- Strapi Node error: use Node `20.x` (`nvm use 20`).
