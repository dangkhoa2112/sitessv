import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHero } from '@/components/ui/PageHero';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { getPageBySlug } from '@/lib/cms-api';
import { buildPageMetadata } from '@/lib/seo';
import { assetUrl } from '@/lib/urls';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

function normalizeSlug(slugParts: string[]) {
  const leaf = slugParts[slugParts.length - 1] || '';
  return leaf.replace(/\.html$/, '');
}

function isVi(locale: string) {
  return locale === 'vi';
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const normalizedSlug = normalizeSlug(slug);
  const page = await getPageBySlug(locale, normalizedSlug);

  if (!page) return {};

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/support/${slug.join('/')}`,
    seo: page.seo,
    fallback: {
      title: page.title || undefined,
      description: page.summary || undefined
    }
  });
}

export default async function SupportSubPage({
  params
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  const normalizedSlug = normalizeSlug(slug);
  const page = await getPageBySlug(locale, normalizedSlug);

  if (!page) notFound();

  const vi = isVi(locale);
  const title = page.title || (vi ? 'Hỗ trợ khách hàng' : 'Customer Support');
  const summary = page.summary || '';

  return (
    <>
      <PageHero
        kicker={vi ? 'Hỗ trợ' : 'Support'}
        title={title}
        subtitle={summary}
        highlights={vi ? ['Hỗ trợ nhanh', 'Tài liệu sử dụng', 'FAQ'] : ['Fast support', 'How-to docs', 'FAQ']}
        imageUrl={assetUrl(page.coverImage?.data?.attributes?.url) || SHINHAN_VISUALS.support.hero}
      />

      <div className="subpage-shell">
        <div className="subpage-content subpage-content--narrow space-y-6 md:space-y-8">
          <Breadcrumbs
            items={[
              { label: vi ? 'Trang chủ' : 'Home', href: `/${locale}` },
              { label: vi ? 'Hỗ trợ khách hàng' : 'Support', href: `/${locale}/support` },
              { label: title, href: `/${locale}/support/${slug.join('/')}` }
            ]}
          />

          <SectionRenderer sections={page.sections || []} />
        </div>
      </div>
    </>
  );
}
