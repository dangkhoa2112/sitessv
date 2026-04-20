import type { Metadata } from 'next';
import { ContentCard } from '@/components/ui/ContentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHero } from '@/components/ui/PageHero';
import { Pagination } from '@/components/ui/Pagination';
import { SearchBar } from '@/components/ui/SearchBar';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { getPageBySlug, listNews } from '@/lib/cms-api';
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
  const cmsPage = await getPageBySlug(locale, 'news');

  return buildListingPageMetadata({
    locale,
    basePath: `/${locale}/news`,
    page: pageNumber,
    hasSearchQuery,
    title: cmsPage?.title || (locale === 'vi' ? 'Tin tức thị trường' : 'Market News'),
    description:
      cmsPage?.summary ||
      (locale === 'vi'
        ? 'Cập nhật tin tức thị trường chứng khoán, doanh nghiệp và hoạt động của FinTrust.'
        : 'Latest updates on securities markets, corporate actions, and FinTrust activities.')
  });
}

export default async function NewsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { locale } = await params;
  const { page, q } = await searchParams;
  const currentPage = Number(page || 1);
  const cmsPage = await getPageBySlug(locale, 'news');

  const data = await listNews({ locale, page: currentPage, pageSize: 9, search: q || '' });

  return (
    <>
      {cmsPage?.sections?.length ? (
        <SectionRenderer sections={cmsPage.sections} />
      ) : (
        <PageHero
          title={locale === 'vi' ? 'Tin tức' : 'News'}
          subtitle={
            locale === 'vi'
              ? 'Cập nhật tin tức thị trường, thông báo vận hành và hoạt động doanh nghiệp theo dòng thời gian.'
              : 'Market news, operational notices, and corporate updates organized as a living feed.'
          }
          highlights={locale === 'vi' ? ['Thông báo', 'Ưu đãi', 'Diễn biến thị trường'] : ['Announcements', 'Promotions', 'Market pulse']}
          imageUrl={assetUrl(cmsPage?.coverImage?.data?.attributes?.url) || SHINHAN_VISUALS.services.research.hero}
        />
      )}
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide">
          <SearchBar action={`/${locale}/news`} search={q} placeholder={locale === 'vi' ? 'Tìm tin tức...' : 'Search news...'} />
          {data.items.length === 0 ? (
            <EmptyState
              title={locale === 'vi' ? 'Không có bản tin phù hợp' : 'No matching articles'}
              description={locale === 'vi' ? 'Thử điều chỉnh từ khóa tìm kiếm.' : 'Try a different search keyword.'}
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.items.map((item: any) => (
                <ContentCard
                  key={item.id}
                  title={item.attributes.title}
                  summary={item.attributes.summary}
                  href={`/${locale}/news/${item.attributes.slug}`}
                  date={item.attributes.publishDate}
                  category={item.attributes.category?.data?.attributes?.title}
                  imageUrl={assetUrl(item.attributes.coverImage?.data?.attributes?.url)}
                  locale={locale}
                />
              ))}
            </div>
          )}
          <Pagination page={currentPage} pageCount={data.pagination?.pageCount || 1} basePath={`/${locale}/news`} query={q || ''} />
        </div>
      </div>
    </>
  );
}
