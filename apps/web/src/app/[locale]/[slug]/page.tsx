import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHero } from '@/components/ui/PageHero';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { getPageBySlug } from '@/lib/cms-api';
import { resolveLocalizedSlug } from '@/lib/localized-slug';
import { buildPageMetadata } from '@/lib/seo';

const BLOCKED_SLUGS = new Set(['about', 'support', 'services', 'news', 'events', 'research', 'faq', 'careers', 'contact', 'legal', 'search', 'sitemap']);

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (BLOCKED_SLUGS.has(slug)) return {};

  const page = await getPageBySlug(locale, slug);
  const canonicalSlug = page?.slug || slug;

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/${canonicalSlug}`,
    seo: page?.seo,
    fallback: {
      title: page?.title,
      description: page?.summary
    }
  });
}

export default async function GenericPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (BLOCKED_SLUGS.has(slug)) notFound();

  const resolved = await resolveLocalizedSlug({ locale, slug, getBySlug: getPageBySlug });
  if (resolved.redirectSlug) {
    permanentRedirect(`/${locale}/${resolved.redirectSlug}`);
  }

  const page = resolved.item;
  if (!page) notFound();
  const canonicalSlug = page.slug || slug;

  return (
    <>
      <PageHero title={page.title} subtitle={page.summary} contentWidth="narrow" />
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--narrow">
          <Breadcrumbs
            items={[
              { label: locale === 'vi' ? 'Trang chủ' : 'Home', href: `/${locale}` },
              { label: page.title, href: `/${locale}/${canonicalSlug}` }
            ]}
          />
          <SectionRenderer sections={page.sections} locale={locale as 'vi' | 'en'} />
        </div>
      </div>
    </>
  );
}
