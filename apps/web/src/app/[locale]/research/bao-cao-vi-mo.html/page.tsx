import type { Metadata } from 'next';
import { ResearchCategoryPage } from '@/components/research/ResearchCategoryPage';
import { getPageBySlug, listResearch } from '@/lib/cms-api';
import { buildPageMetadata } from '@/lib/seo';
import { assetUrl } from '@/lib/urls';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: `/${locale}/research/bao-cao-vi-mo.html`,
    fallback: {
      title: locale === 'vi' ? 'Báo cáo chiến lược / vĩ mô' : 'Strategy / macro reports',
      description:
        locale === 'vi'
          ? 'Các báo cáo chiến lược, vĩ mô và định hướng dài hạn.'
          : 'Strategy, macro, and longer-term allocation reports.'
    }
  });
}

export default async function MacroReportsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  const data = await listResearch({ locale, page: 1, pageSize: 9, search: q || '' });
  const cmsPage = await getPageBySlug(locale, 'research');
  return (
    <ResearchCategoryPage
      locale={locale}
      kind="macro"
      data={data.items}
      search={q || ''}
      heroImageUrl={assetUrl(cmsPage?.coverImage?.data?.attributes?.url)}
    />
  );
}
