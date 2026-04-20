export type SupportedLocale = 'vi' | 'en';

type RoutePair = {
  en: string;
  vi: string;
};

const ROUTE_PAIRS: RoutePair[] = [
  { en: '/services', vi: '/san-pham-dich-vu' },
  { en: '/research', vi: '/trung-tam-phan-tich' },
  { en: '/support', vi: '/ho-tro-khach-hang' },
  { en: '/contact', vi: '/lien-he' },
  { en: '/careers', vi: '/nghe-nghiep' },
  { en: '/about', vi: '/gioi-thieu' },
  { en: '/news', vi: '/tin-tuc' },
  { en: '/events', vi: '/su-kien' },
  { en: '/faq', vi: '/cau-hoi-thuong-gap' },
  { en: '/search', vi: '/tim-kiem' },
  { en: '/sitemap', vi: '/so-do-trang' },
  { en: '/legal', vi: '/phap-ly' }
];

const LOCALE_PREFIX_REGEX = /^\/(vi|en)(?=\/|$)/;

function normalizePath(pathname: string): string {
  if (!pathname) return '/';
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

function mapByPrefix(pathname: string, fromKey: 'en' | 'vi', toKey: 'en' | 'vi'): string {
  const queryIndex = pathname.indexOf('?');
  const hashIndex = pathname.indexOf('#');
  const cutIndex = [queryIndex, hashIndex].filter((index) => index >= 0).sort((a, b) => a - b)[0] ?? -1;
  const purePath = cutIndex >= 0 ? pathname.slice(0, cutIndex) : pathname;
  const suffix = cutIndex >= 0 ? pathname.slice(cutIndex) : '';

  const sortedPairs = [...ROUTE_PAIRS].sort((a, b) => b[fromKey].length - a[fromKey].length);

  for (const pair of sortedPairs) {
    const from = pair[fromKey];
    const to = pair[toKey];
    if (purePath === from) return `${to}${suffix}`;
    if (purePath.startsWith(`${from}/`)) return `${to}${purePath.slice(from.length)}${suffix}`;
  }

  return pathname;
}

export function localizePathWithoutLocale(pathname: string, targetLocale: SupportedLocale): string {
  const normalized = normalizePath(pathname);
  if (targetLocale === 'vi') {
    return mapByPrefix(normalized, 'en', 'vi');
  }
  return mapByPrefix(normalized, 'vi', 'en');
}

export function switchLocalePath(pathname: string, targetLocale: SupportedLocale): string {
  const normalized = normalizePath(pathname);
  const match = normalized.match(LOCALE_PREFIX_REGEX);

  if (!match) {
    const localized = localizePathWithoutLocale(normalized, targetLocale);
    return `/${targetLocale}${localized === '/' ? '' : localized}`;
  }

  const currentLocale = match[1] as SupportedLocale;
  const pathWithoutLocale = normalized.replace(LOCALE_PREFIX_REGEX, '') || '/';
  const localized = currentLocale === targetLocale ? pathWithoutLocale : localizePathWithoutLocale(pathWithoutLocale, targetLocale);
  return `/${targetLocale}${localized === '/' ? '' : localized}`;
}

export function buildLocalePath(locale: string, pathWithoutLocale: string): string {
  const safeLocale: SupportedLocale = locale === 'en' ? 'en' : 'vi';
  const localized = localizePathWithoutLocale(pathWithoutLocale, safeLocale);
  return `/${safeLocale}${localized === '/' ? '' : localized}`;
}
