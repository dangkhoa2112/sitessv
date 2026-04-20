import { LOCALES } from './constants';

type LocalizedEntry = {
  attributes?: {
    locale?: string | null;
    slug?: string | null;
  } | null;
} | null;

export type LocaleAwareEntity = {
  slug?: string | null;
  localizations?: {
    data?: LocalizedEntry[] | null;
  } | null;
} | null;

type GetBySlugFn<T extends LocaleAwareEntity> = (locale: string, slug: string) => Promise<T>;

export async function resolveLocalizedSlug<T extends LocaleAwareEntity>({
  locale,
  slug,
  getBySlug
}: {
  locale: string;
  slug: string;
  getBySlug: GetBySlugFn<T>;
}): Promise<{ item: T | null; redirectSlug: string | null }> {
  const item = await getBySlug(locale, slug);
  if (item) {
    const canonicalSlug = item.slug?.trim();
    return {
      item,
      redirectSlug: canonicalSlug && canonicalSlug !== slug ? canonicalSlug : null
    };
  }

  for (const sourceLocale of LOCALES) {
    if (sourceLocale === locale) continue;

    const sourceItem = await getBySlug(sourceLocale, slug);
    if (!sourceItem) continue;

    const localizedSlug = sourceItem.localizations?.data
      ?.find((entry) => entry?.attributes?.locale === locale)
      ?.attributes?.slug
      ?.trim();

    if (localizedSlug && localizedSlug !== slug) {
      return {
        item: null,
        redirectSlug: localizedSlug
      };
    }
  }

  return {
    item: null,
    redirectSlug: null
  };
}
