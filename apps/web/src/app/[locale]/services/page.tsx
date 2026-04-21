import type { Metadata } from 'next';
import { ContentCard } from '@/components/ui/ContentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHero } from '@/components/ui/PageHero';
import { Pagination } from '@/components/ui/Pagination';
import { SearchBar } from '@/components/ui/SearchBar';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { getPageBySlug, listServices } from '@/lib/cms-api';
import { buildListingPageMetadata } from '@/lib/seo';
import { assetUrl } from '@/lib/urls';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

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
  const cmsPage = await getPageBySlug(locale, 'services');

  return buildListingPageMetadata({
    locale,
    basePath: `/${locale}/services`,
    page: pageNumber,
    hasSearchQuery,
    title: cmsPage?.title || (locale === 'vi' ? 'Sản phẩm và Dịch vụ' : 'Products and Services'),
    description:
      cmsPage?.summary ||
      (locale === 'vi'
        ? 'Danh mục sản phẩm và dịch vụ đầu tư dành cho khách hàng cá nhân, doanh nghiệp và định chế.'
        : 'Investment products and service offerings for retail, corporate, and institutional clients.')
  });
}

export default async function ServicesPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { locale } = await params;
  const { page, q } = await searchParams;

  const currentPage = Number(page || 1);
  const data = await listServices({ locale, page: currentPage, pageSize: 9, search: q || '' });
  const cmsPage = await getPageBySlug(locale, 'services');
  const title = cmsPage?.title || (locale === 'vi' ? 'Sản phẩm & Dịch vụ' : 'Products & Services');
  const subtitle =
    cmsPage?.summary ||
    (locale === 'vi'
      ? 'Danh mục giải pháp dành cho nhà đầu tư cá nhân, doanh nghiệp và định chế.'
      : 'Investment products and service offerings for retail, corporate, and institutional clients.');

  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        highlights={locale === 'vi' ? ['Môi giới chứng khoán', 'Ngân hàng đầu tư', 'Nền tảng giao dịch số'] : ['Brokerage service', 'Investment banking', 'Digital trading platforms']}
        imageUrl={assetUrl(cmsPage?.coverImage?.data?.attributes?.url) || SHINHAN_VISUALS.services.brokerage.hero}
      />
      {cmsPage?.sections?.length ? (
        <div className="subpage-shell subpage-shell--compact">
          <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
            <SectionRenderer sections={cmsPage.sections} locale={locale as 'vi' | 'en'} />
          </div>
        </div>
      ) : null}
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
          <SearchBar
            action={`/${locale}/services`}
            search={q}
            placeholder={locale === 'vi' ? 'Tìm dịch vụ...' : 'Search services...'}
            label={locale === 'vi' ? 'Tìm dịch vụ' : 'Search services'}
            buttonLabel={locale === 'vi' ? 'Tìm' : 'Search'}
          />
          {data.items.length === 0 ? (
            <EmptyState
              title={locale === 'vi' ? 'Không có dịch vụ phù hợp' : 'No matching service'}
              description={locale === 'vi' ? 'Vui lòng thử từ khóa khác.' : 'Please try a different keyword.'}
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.items.map((item: any) => (
                <ContentCard
                  key={item.id}
                  title={item.attributes.title}
                  summary={item.attributes.summary}
                  href={`/${locale}/services/${item.attributes.slug}`}
                  date={item.attributes.publishDate}
                  category={item.attributes.category?.data?.attributes?.title}
                  imageUrl={assetUrl(item.attributes.coverImage?.data?.attributes?.url)}
                  locale={locale}
                />
              ))}
            </div>
          )}

          <Pagination
            page={currentPage}
            pageCount={data.pagination?.pageCount || 1}
            basePath={`/${locale}/services`}
            query={q || ''}
            previousLabel={locale === 'vi' ? 'Trước' : 'Prev'}
            nextLabel={locale === 'vi' ? 'Sau' : 'Next'}
          />
        </div>
      </div>
    </>
  );
}
