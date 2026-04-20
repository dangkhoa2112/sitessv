import type { Metadata } from 'next';
import { ResearchCenterPage } from '@/components/research/ResearchCenterPage';
import { getPageBySlug, listResearch } from '@/lib/cms-api';
import { buildListingPageMetadata } from '@/lib/seo';
import { assetUrl } from '@/lib/urls';

export async function generateMetadata({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { page, q } = await searchParams;
  const pageNumber = Number(page || 1);
  const hasSearchQuery = Boolean(q?.trim());

  return buildListingPageMetadata({
    locale,
    basePath: `/${locale}/research`,
    page: pageNumber,
    hasSearchQuery,
    title: locale === 'vi' ? 'Trung tâm phân tích' : 'Research Center',
    description:
      locale === 'vi'
        ? 'Khuyến nghị cổ phiếu, báo cáo định kỳ, báo cáo vĩ mô và đội ngũ phân tích viên.'
        : 'Stock recommendations, periodic reports, macro reports, and analysts.'
  });
}

export default async function ResearchPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { locale } = await params;
  const { page, q } = await searchParams;
  const currentPage = Number(page || 1);
  const data = await listResearch({ locale, page: currentPage, pageSize: 9, search: q || '' });
  const cmsPage = await getPageBySlug(locale, 'research');

  return (
    <ResearchCenterPage
      locale={locale}
      data={data}
      search={q || ''}
      page={currentPage}
      heroImageUrl={assetUrl(cmsPage?.coverImage?.data?.attributes?.url)}
    />
  );
}
