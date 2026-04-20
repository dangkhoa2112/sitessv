import type { Metadata } from 'next';
import { ResearchCategoryPage } from '@/components/research/ResearchCategoryPage';
import { getPageBySlug } from '@/lib/cms-api';
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
    pathname: `/${locale}/research/phan-tich-vien.html`,
    fallback: {
      title: locale === 'vi' ? 'Phân tích viên' : 'Analysts',
      description:
        locale === 'vi'
          ? 'Danh sách chuyên viên phân tích và phạm vi nghiên cứu.'
          : 'Analyst directory and coverage areas.'
    }
  });
}

export default async function AnalystsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cmsPage = await getPageBySlug(locale, 'research');
  return <ResearchCategoryPage locale={locale} kind="analyst" heroImageUrl={assetUrl(cmsPage?.coverImage?.data?.attributes?.url)} />;
}
