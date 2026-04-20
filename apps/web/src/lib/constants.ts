export const SITE_NAME = 'FinTrust Securities';

export const LOCALES = ['vi', 'en'] as const;
export type SiteLocale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: SiteLocale =
  (process.env.NEXT_PUBLIC_DEFAULT_LOCALE as SiteLocale) || 'vi';

function normalizeUrl(input: string | undefined, fallback: string) {
  const value = input?.trim();
  if (!value) return fallback;

  try {
    const parsed = new URL(value);
    const pathname = parsed.pathname.replace(/\/+$/, '');
    return `${parsed.origin}${pathname === '' ? '' : pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}

export const SITE_URL = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL, 'http://localhost:3000');
export const STRAPI_URL = normalizeUrl(process.env.NEXT_PUBLIC_STRAPI_URL, 'http://localhost:1337');
export const STRAPI_GRAPHQL_URL =
  process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL || `${STRAPI_URL}/graphql`;

export const REVALIDATE_TIME = Number.isFinite(Number(process.env.REVALIDATE_TIME))
  ? Number(process.env.REVALIDATE_TIME)
  : 120;
