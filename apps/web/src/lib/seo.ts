import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from './constants';
import { localizePathWithoutLocale } from './localized-routes';
import { absoluteUrl, assetUrl } from './urls';

type SeoMetaInput = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  metaRobots?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  twitterCard?: string | null;
  keywords?: string | null;
  ogImage?: {
    data?: {
      attributes?: {
        url?: string;
      };
    } | null;
  } | null;
};

type BuildSeoInput = {
  locale: string;
  pathname: string;
  seo?: SeoMetaInput | null;
  kind?: 'website' | 'article' | 'service' | 'event' | 'job' | 'faq';
  fallback?: {
    title?: string;
    description?: string;
    keywords?: string | string[];
  };
};

type BuildListingSeoInput = {
  locale: string;
  basePath: string;
  title: string;
  description: string;
  page?: number;
  hasSearchQuery?: boolean;
};

const LOCALE_PREFIX_PATTERN = /^\/(vi|en)(?=\/|$)/;

function getPathWithoutLocalePrefix(pathname: string): string {
  const [rawPath, rawQuery] = pathname.split('?');
  const normalizedPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const pathWithoutLocale = normalizedPath.replace(LOCALE_PREFIX_PATTERN, '');
  const query = rawQuery ? `?${rawQuery}` : '';

  return `${pathWithoutLocale}${query}`;
}

function parseKeywords(value?: string | string[] | null): string[] | undefined {
  if (!value) return undefined;

  const chunks = Array.isArray(value)
    ? value
    : value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

  const unique = [...new Set(chunks)];
  return unique.length > 0 ? unique : undefined;
}

function parseMetaRobots(metaRobots?: string | null): Metadata['robots'] {
  const directives = (metaRobots || 'index,follow')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  const has = (directive: string) => directives.includes(directive);

  return {
    index: has('noindex') ? false : true,
    follow: has('nofollow') ? false : true,
    noarchive: has('noarchive'),
    nosnippet: has('nosnippet'),
    noimageindex: has('noimageindex'),
    nocache: has('nocache')
  };
}

export function buildPageMetadata({ locale, pathname, seo, fallback, kind = 'website' }: BuildSeoInput): Metadata {
  const title = seo?.metaTitle || fallback?.title || SITE_NAME;
  const description =
    seo?.metaDescription || fallback?.description || 'Enterprise fintech and securities corporate platform.';
  const keywords = parseKeywords(seo?.keywords || fallback?.keywords);
  const pathWithoutLocale = getPathWithoutLocalePrefix(pathname);
  const canonicalPath = localizePathWithoutLocale(pathWithoutLocale, locale === 'vi' ? 'vi' : 'en');

  const canonical = seo?.canonicalUrl || `${SITE_URL}/${locale}${canonicalPath === '/' ? '' : canonicalPath}`;
  const robots = parseMetaRobots(seo?.metaRobots);
  const ogImagePath = seo?.ogImage?.data?.attributes?.url;
  const ogImage = ogImagePath ? absoluteUrl(assetUrl(ogImagePath) || ogImagePath) : undefined;
  const viPath = locale === 'vi' ? pathWithoutLocale : localizePathWithoutLocale(pathWithoutLocale, 'vi');
  const enPath = locale === 'en' ? pathWithoutLocale : localizePathWithoutLocale(pathWithoutLocale, 'en');

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        vi: `${SITE_URL}/vi${viPath}`,
        en: `${SITE_URL}/en${enPath}`,
        'x-default': `${SITE_URL}/vi${viPath}`
      }
    },
    robots,
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      type: kind === 'article' ? 'article' : 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      url: canonical,
      siteName: SITE_NAME,
      images: ogImage ? [{ url: ogImage }] : undefined
    },
    twitter: {
      card: (seo?.twitterCard as 'summary' | 'summary_large_image') || 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined
    }
  };
}

export function buildListingPageMetadata({
  locale,
  basePath,
  title,
  description,
  page = 1,
  hasSearchQuery = false
}: BuildListingSeoInput): Metadata {
  const safePage = Number.isFinite(page) && page > 1 ? Math.floor(page) : 1;
  const canonicalPath = safePage > 1 && !hasSearchQuery ? `${basePath}?page=${safePage}` : basePath;

  return buildPageMetadata({
    locale,
    pathname: canonicalPath,
    seo: hasSearchQuery
      ? {
          metaRobots: 'noindex,follow'
        }
      : undefined,
    fallback: {
      title,
      description
    }
  });
}
