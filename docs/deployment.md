# Deployment Notes

## Local (Dev)
- CMS: `pnpm --filter @fintech/cms develop`
- Web: `pnpm --filter @fintech/web dev`
- MySQL: XAMPP service

## Production Linux VPS (Reference)
1. Install Node 20, pnpm, MySQL/Nginx.
2. Deploy codebase to `/var/www/fintrust-platform`.
3. Configure env files for `apps/cms/.env` and `apps/web/.env.local`.
   - Web: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_STRAPI_URL`, `NEXT_PUBLIC_STRAPI_GRAPHQL_URL`, `NEXT_PUBLIC_STRAPI_ASSET_URL` (optional), `NEXT_PUBLIC_CDN_URL` or `ASSET_CDN_URL` (optional), `CONTACT_FORM_WEBHOOK_URL`, `CONTACT_FORM_WEBHOOK_SECRET`, `REVALIDATION_SECRET`, `CORS_ORIGINS`
   - CMS: `PUBLIC_URL`, `WEB_URL`, `CORS_ORIGINS`, `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`
4. Build apps:
   ```bash
   pnpm install --frozen-lockfile
   pnpm --filter @fintech/cms build
   pnpm --filter @fintech/web build
   ```
5. Run processes with PM2/systemd:
   - `strapi start` on port `1337`
   - `next start` on port `3000`
6. Nginx reverse proxy:
   - `/` -> Next.js (`localhost:3000`)
   - `/uploads` and `/graphql` can pass to Strapi (`localhost:1337`) if separated, or keep internal and let Next consume server-side.

## Recommended Nginx Essentials
- Enable gzip/brotli
- Add security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, strict CSP tuned for media domains)
- Cache static assets aggressively

## Revalidation
- Current strategy uses time-based revalidation (`REVALIDATE_TIME`).
- On-demand revalidation endpoint is available at `POST /api/revalidate`; wire Strapi publish/unpublish webhooks to it with `REVALIDATION_SECRET`, `X-Webhook-Timestamp` (epoch ms or ISO-8601), and `X-Webhook-Signature` (`sha256` HMAC over `timestamp.rawBody`).

## Backup Basics
- Daily MySQL dump (`mysqldump fintech_corporate_cms`)
- Upload directory backup (`apps/cms/public/uploads`)
- Keep 7-30 restore points depending on compliance policy
