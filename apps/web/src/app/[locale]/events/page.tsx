import type { Metadata } from 'next';
import { ContentCard } from '@/components/ui/ContentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHero } from '@/components/ui/PageHero';
import { Pagination } from '@/components/ui/Pagination';
import { SearchBar } from '@/components/ui/SearchBar';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { getPageBySlug, listEvents } from '@/lib/cms-api';
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
  const cmsPage = await getPageBySlug(locale, 'events');

  return buildListingPageMetadata({
    locale,
    basePath: `/${locale}/events`,
    page: pageNumber,
    hasSearchQuery,
    title: cmsPage?.title || (locale === 'vi' ? 'Sự kiện đầu tư' : 'Investment Events'),
    description:
      cmsPage?.summary ||
      (locale === 'vi'
        ? 'Lịch sự kiện hội thảo, workshop và hoạt động dành cho cộng đồng nhà đầu tư.'
        : 'Calendar of investor events, workshops, webinars, and market briefings.')
  });
}

export default async function EventsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { locale } = await params;
  const { page, q } = await searchParams;
  const currentPage = Number(page || 1);
  const cmsPage = await getPageBySlug(locale, 'events');
  const title = cmsPage?.title || (locale === 'vi' ? 'Sự kiện đầu tư' : 'Investment Events');
  const subtitle =
    cmsPage?.summary ||
    (locale === 'vi'
      ? 'Lịch sự kiện hội thảo, workshop và hoạt động dành cho cộng đồng nhà đầu tư.'
      : 'Calendar of investor events, workshops, webinars, and market briefings.');

  const data = await listEvents({ locale, page: currentPage, pageSize: 9, search: q || '' });

  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        highlights={locale === 'vi' ? ['Workshop thị trường', 'Webinar chiến lược', 'Cộng đồng đầu tư'] : ['Market workshops', 'Strategy webinars', 'Investor community']}
        imageUrl={assetUrl(cmsPage?.coverImage?.data?.attributes?.url) || SHINHAN_VISUALS.services.research.hero}
      />
      {cmsPage?.sections?.length ? (
        <div className="subpage-shell subpage-shell--compact">
          <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
            <SectionRenderer sections={cmsPage.sections} locale={locale as 'vi' | 'en'} />
          </div>
        </div>
      ) : null}
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide">
          <SearchBar
            action={`/${locale}/events`}
            search={q}
            placeholder={locale === 'vi' ? 'Tìm sự kiện...' : 'Search events...'}
            label={locale === 'vi' ? 'Tìm sự kiện' : 'Search events'}
            buttonLabel={locale === 'vi' ? 'Tìm' : 'Search'}
          />
          {data.items.length === 0 ? (
            <EmptyState
              title={locale === 'vi' ? 'Chưa có sự kiện phù hợp' : 'No matching events'}
              description={locale === 'vi' ? 'Vui lòng thử lại với từ khóa khác.' : 'Please try another keyword.'}
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.items.map((item: any) => (
                <ContentCard
                  key={item.id}
                  title={item.attributes.title}
                  summary={item.attributes.summary}
                  href={`/${locale}/events/${item.attributes.slug}`}
                  date={item.attributes.startDate || item.attributes.publishDate}
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
            basePath={`/${locale}/events`}
            query={q || ''}
            previousLabel={locale === 'vi' ? 'Trước' : 'Prev'}
            nextLabel={locale === 'vi' ? 'Sau' : 'Next'}
          />
        </div>
      </div>
    </>
  );
}
