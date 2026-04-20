import type { Metadata } from 'next';
import { ContentCard } from '@/components/ui/ContentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHero } from '@/components/ui/PageHero';
import { SearchBar } from '@/components/ui/SearchBar';
import { listEvents } from '@/lib/cms-api';
import { buildListingPageMetadata } from '@/lib/seo';
import { assetUrl } from '@/lib/urls';

export async function generateMetadata({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;

  return buildListingPageMetadata({
    locale,
    basePath: `/${locale}/support/chuong-trinh-uu-dai`,
    title: locale === 'vi' ? 'Chương trình ưu đãi' : 'Promotions',
    description:
      locale === 'vi'
        ? 'Tổng hợp ưu đãi, khuyến mãi và hoạt động nổi bật dành cho nhà đầu tư.'
        : 'A curated feed of investor promotions, campaigns, and featured activities.',
    hasSearchQuery: Boolean(q?.trim())
  });
}

export default async function SupportPromotionsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  const data = await listEvents({ locale, page: 1, pageSize: 12, search: q || '' });
  const vi = locale === 'vi';

  return (
    <>
      <PageHero
        kicker={vi ? 'Hỗ trợ' : 'Support'}
        title={vi ? 'Chương trình ưu đãi' : 'Promotions'}
        subtitle={vi ? 'Ưu đãi, khuyến mãi và hoạt động nổi bật dành cho nhà đầu tư.' : 'Campaigns, promotions, and featured activities for investors.'}
        highlights={vi ? ['Ưu đãi mở tài khoản', 'Khuyến mãi giao dịch', 'Sự kiện nổi bật'] : ['Account offers', 'Trading campaigns', 'Featured events']}
      />

      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
          <section className="subpage-panel">
            <div className="max-w-3xl">
              <p className="subpage-eyebrow">{vi ? 'Danh sách ưu đãi' : 'Promotion feed'}</p>
              <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                {vi ? 'Tất cả chương trình và sự kiện liên quan' : 'All related campaigns and events'}
              </h2>
            </div>

            <div className="mt-4">
              <SearchBar action={`/${locale}/support/chuong-trinh-uu-dai`} search={q} placeholder={vi ? 'Tìm ưu đãi...' : 'Search promotions...'} />
            </div>

            {data.items.length === 0 ? (
              <div className="mt-5">
                <EmptyState
                  title={vi ? 'Chưa có ưu đãi phù hợp' : 'No matching promotions'}
                  description={vi ? 'Thử tìm bằng từ khóa khác.' : 'Try a different keyword.'}
                />
              </div>
            ) : (
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
          </section>
        </div>
      </div>
    </>
  );
}
