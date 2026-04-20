# Architecture Overview

## Solution Shape
- Monorepo with `apps/web` (public site), `apps/cms` (Strapi admin/content API), and optional shared `packages/*`.
- Frontend consumes CMS strictly via GraphQL endpoint.
- Strapi stores structured editorial data in MySQL (XAMPP local, Linux MySQL in production).

## Rendering Strategy
- Next.js server-first rendering for indexable content.
- ISR-style revalidation (`REVALIDATE_TIME`) for content pages.
- App Router persistent layout shell for smooth transitions.
- Client components only for interactive areas (mobile menu, FAQ accordion, form).

## Multilingual
- Route-based locale segmentation: `/vi/*`, `/en/*`.
- CMS i18n per entry + locale-aware GraphQL queries.
- Locale switcher in global header.

## SEO/GEO
- Dynamic metadata from CMS + fallback defaults.
- robots + XML sitemap generated from CMS entities.
- JSON-LD for Organization, Website, Breadcrumb, Article, FAQ.
- Modular content blocks suitable for AI/search extraction.

## Security Baseline
- Environment secret separation.
- Form payload validation with Zod.
- Honeypot anti-spam field.
- Sanitized rich text rendering.
- Public role constrained to read permissions only.
