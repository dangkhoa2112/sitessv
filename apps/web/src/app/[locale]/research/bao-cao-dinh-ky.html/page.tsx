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
    pathname: `/${locale}/research/bao-cao-dinh-ky.html`,
    fallback: {
      title: locale === 'vi' ? 'Báo cáo định kỳ' : 'Periodic reports',
      description:
        locale === 'vi'
          ? 'Morning call, tổng hợp thị trường và báo cáo ngắn hạn.'
          : 'Morning call, market wraps, and short-horizon reports.'
    }
  });
}

export default async function PeriodicReportsPage({
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
      kind="periodic"
      data={data.items}
      search={q || ''}
      heroImageUrl={assetUrl(cmsPage?.coverImage?.data?.attributes?.url)}
    />
  );
}
