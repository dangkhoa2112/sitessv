import type { Metadata } from 'next';
import { ContentCard } from '@/components/ui/ContentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { InsightRail } from '@/components/ui/InsightRail';
import { PageHero } from '@/components/ui/PageHero';
import { SearchBar } from '@/components/ui/SearchBar';
import { listNews, listResearch, listServices } from '@/lib/cms-api';
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
    pathname: `/${locale}/search`,
    seo: {
      metaRobots: 'noindex,follow'
    },
    fallback: {
      title: locale === 'vi' ? 'Tìm kiếm nội dung' : 'Search Content',
      description:
        locale === 'vi'
          ? 'Trang tìm kiếm nội dung nội bộ cho bài viết, báo cáo và dịch vụ.'
          : 'Internal content search for services, news, and research pages.'
    }
  });
}

export default async function SearchPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  const query = q || '';

  const [services, news, research] = await Promise.all([
    listServices({ locale, page: 1, pageSize: 6, search: query }),
    listNews({ locale, page: 1, pageSize: 6, search: query }),
    listResearch({ locale, page: 1, pageSize: 6, search: query })
  ]);

  const hasQuery = query.trim().length > 0;
  const noData = hasQuery && services.items.length + news.items.length + research.items.length === 0;

  return (
    <>
      <PageHero
        title={locale === 'vi' ? 'Tìm kiếm nội dung' : 'Search content'}
        subtitle={locale === 'vi' ? 'Tra cứu nhanh tin tức, dịch vụ và báo cáo.' : 'Quickly search services, articles, and reports.'}
        highlights={locale === 'vi' ? ['Cross-content', 'Tìm theo ngữ cảnh', 'AI ranking'] : ['Cross-content', 'Context search', 'AI ranking']}
      />
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide">
          <InsightRail
            eyebrow={locale === 'vi' ? 'Unified Search' : 'Unified Search'}
            title={locale === 'vi' ? 'Một truy vấn, nhiều lớp nội dung đầu tư' : 'One query across multi-layer investment content'}
            description={
              locale === 'vi'
                ? 'Tìm kiếm đồng thời dịch vụ, bản tin và báo cáo phân tích để giảm thời gian chuyển trang khi ra quyết định.'
                : 'Query services, news, and research in one place to reduce context switching during decision making.'
            }
            items={
              locale === 'vi'
                ? [
                    { meta: 'Discovery', title: 'Tìm theo nhu cầu', description: 'Hỗ trợ từ khóa sản phẩm, chiến lược, mã cổ phiếu và chủ đề vận hành.' },
                    { meta: 'Relevance', title: 'Ưu tiên kết quả', description: 'Kết quả được sắp theo tính liên quan để người dùng đi thẳng vào nội dung quan trọng.' },
                    { meta: 'AI Layer', title: 'Ngữ nghĩa tài chính', description: 'Mở rộng khả năng hiểu cụm từ ngành và ý định đầu tư của người dùng.' }
                  ]
                : [
                    { meta: 'Discovery', title: 'Intent-based search', description: 'Support product, strategy, ticker, and operations-oriented keywords.' },
                    { meta: 'Relevance', title: 'Prioritized ranking', description: 'Results are weighted by relevance to reduce decision latency.' },
                    { meta: 'AI Layer', title: 'Financial semantics', description: 'Extended understanding of domain terms and investment intent patterns.' }
                  ]
            }
          />
          <SearchBar action={`/${locale}/search`} search={query} placeholder={locale === 'vi' ? 'Nhập từ khóa tìm kiếm...' : 'Type your search term...'} />

          {!hasQuery ? (
            <EmptyState
              title={locale === 'vi' ? 'Nhập từ khóa để bắt đầu' : 'Enter a keyword to start'}
              description={locale === 'vi' ? 'Ví dụ: môi giới, chiến lược, tài khoản.' : 'Example: brokerage, strategy, account.'}
            />
          ) : null}

          {noData ? (
            <EmptyState
              title={locale === 'vi' ? 'Không tìm thấy kết quả' : 'No results found'}
              description={locale === 'vi' ? 'Vui lòng thử từ khóa khác.' : 'Please try another keyword.'}
            />
          ) : null}

          {services.items.length > 0 ? (
            <section className="subpage-section">
              <h2 className="subpage-section-title">{locale === 'vi' ? 'Dịch vụ' : 'Services'}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {services.items.map((item: any) => (
                  <ContentCard
                    key={`service-${item.id}`}
                    title={item.attributes.title}
                    summary={item.attributes.summary}
                    href={`/${locale}/services/${item.attributes.slug}`}
                    imageUrl={assetUrl(item.attributes.coverImage?.data?.attributes?.url)}
                    locale={locale}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {news.items.length > 0 ? (
            <section className="subpage-section">
              <h2 className="subpage-section-title">{locale === 'vi' ? 'Tin tức' : 'News'}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {news.items.map((item: any) => (
                  <ContentCard
                    key={`news-${item.id}`}
                    title={item.attributes.title}
                    summary={item.attributes.summary}
                    href={`/${locale}/news/${item.attributes.slug}`}
                    imageUrl={assetUrl(item.attributes.coverImage?.data?.attributes?.url)}
                    locale={locale}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {research.items.length > 0 ? (
            <section className="subpage-section">
              <h2 className="subpage-section-title">{locale === 'vi' ? 'Nghiên cứu' : 'Research'}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {research.items.map((item: any) => (
                  <ContentCard
                    key={`research-${item.id}`}
                    title={item.attributes.title}
                    summary={item.attributes.summary}
                    href={`/${locale}/research/${item.attributes.slug}`}
                    imageUrl={assetUrl(item.attributes.coverImage?.data?.attributes?.url)}
                    locale={locale}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
}
