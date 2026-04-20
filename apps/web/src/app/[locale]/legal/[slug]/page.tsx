import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { EditorialIntro } from '@/components/layout/EditorialIntro';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { getPageBySlug } from '@/lib/cms-api';
import { resolveLocalizedSlug } from '@/lib/localized-slug';
import { buildPageMetadata } from '@/lib/seo';
import { assetUrl } from '@/lib/urls';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await getPageBySlug(locale, slug);
  const canonicalSlug = page?.slug || slug;

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/legal/${canonicalSlug}`,
    seo: page?.seo,
    fallback: {
      title: page?.title,
      description: page?.summary
    }
  });
}

export default async function LegalDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const resolved = await resolveLocalizedSlug({ locale, slug, getBySlug: getPageBySlug });
  if (resolved.redirectSlug) {
    permanentRedirect(`/${locale}/legal/${resolved.redirectSlug}`);
  }

  const page = resolved.item;

  if (!page) notFound();
  const canonicalSlug = page.slug || slug;

  return (
    <>
      <EditorialIntro
        breadcrumbs={[
          { label: locale === 'vi' ? 'Trang chủ' : 'Home', href: `/${locale}` },
          { label: locale === 'vi' ? 'Pháp lý' : 'Legal', href: `/${locale}/sitemap` },
          { label: page.title, href: `/${locale}/legal/${canonicalSlug}` }
        ]}
        kicker={locale === 'vi' ? 'Pháp lý' : 'Legal'}
        title={page.title}
        subtitle={page.summary}
        imageUrl={assetUrl(page.coverImage?.data?.attributes?.url) || SHINHAN_VISUALS.about.overview}
        visualLabel={locale === 'vi' ? 'Legal overview' : 'Legal overview'}
        visualCopy={
          locale === 'vi'
            ? 'Tài liệu pháp lý và điều khoản được trình bày nhất quán để người dùng tra cứu nhanh hơn.'
            : 'Legal documents and terms presented in a consistent, easier-to-scan format.'
        }
      />
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--narrow">
          <SectionRenderer sections={page.sections} />
        </div>
      </div>
    </>
  );
}
