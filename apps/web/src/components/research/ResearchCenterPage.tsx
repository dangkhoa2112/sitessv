import Link from 'next/link';
import { ContentCard } from '@/components/ui/ContentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { InsightRail } from '@/components/ui/InsightRail';
import { PageHero } from '@/components/ui/PageHero';
import { Pagination } from '@/components/ui/Pagination';
import { SearchBar } from '@/components/ui/SearchBar';
import { TagChip } from '@/components/ui/TagChip';
import { assetUrl } from '@/lib/urls';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

type ResearchCenterPageProps = {
  locale: string;
  data: {
    items: Array<any>;
    pagination?: { pageCount?: number };
  };
  search?: string;
  page: number;
  heroImageUrl?: string;
};

function isVi(locale: string) {
  return locale === 'vi';
}

export function ResearchCenterPage({ locale, data, search, page, heroImageUrl }: ResearchCenterPageProps) {
  const vi = isVi(locale);

  const tracks = [
    {
      title: vi ? 'SSV Khuyến nghị' : 'SSV recommendations',
      summary: vi
        ? 'Cổ phiếu khuyến nghị, tóm tắt lý do và lệnh giao dịch nhanh từ chuyên gia phân tích.'
        : 'Recommended stocks, concise theses, and quick trade actions from analysts.',
      href: `/${locale}/research`
    },
    {
      title: vi ? 'Báo cáo định kỳ' : 'Periodic reports',
      summary: vi
        ? 'Morning call, tổng hợp thị trường và cập nhật ngắn hạn theo nhịp giao dịch.'
        : 'Morning call, market wrap-ups, and short-horizon commentary for active trading.',
      href: `/${locale}/research/bao-cao-dinh-ky.html`
    },
    {
      title: vi ? 'Báo cáo vĩ mô' : 'Macro reports',
      summary: vi
        ? 'Các báo cáo chiến lược, vĩ mô và định hướng phân bổ cho danh mục dài hạn.'
        : 'Strategy and macro reports for long-term allocation.',
      href: `/${locale}/research/bao-cao-vi-mo.html`
    },
    {
      title: vi ? 'Phân tích viên' : 'Analysts',
      summary: vi
        ? 'Danh sách chuyên viên phân tích theo nhóm ngành, kinh nghiệm và báo cáo theo dõi.'
        : 'Analyst roster by sector coverage, experience, and report access.',
      href: `/${locale}/research/phan-tich-vien.html`
    }
  ];

  const highlights = vi
    ? ['Morning call', 'Báo cáo doanh nghiệp', 'Khuyến nghị theo danh mục', 'Tín hiệu AI hỗ trợ']
    : ['Morning call', 'Company coverage', 'Portfolio recommendations', 'AI-assisted signals'];

  return (
    <>
      <PageHero
        kicker={vi ? 'Trung tâm phân tích' : 'Research Center'}
        title={vi ? 'Báo cáo và nghiên cứu' : 'Research and reports'}
        subtitle={
          vi
            ? 'Kho nội dung nghiên cứu gồm khuyến nghị cổ phiếu, báo cáo định kỳ, báo cáo vĩ mô và đội ngũ phân tích viên.'
            : 'A research library covering stock recommendations, periodic notes, macro reports, and analysts.'
        }
        highlights={highlights}
        imageUrl={heroImageUrl || SHINHAN_VISUALS.research.hero}
      />

      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
          <InsightRail
            eyebrow={vi ? 'Research Tracks' : 'Research Tracks'}
            title={vi ? 'Trung tâm phân tích đa lớp cho quyết định đầu tư' : 'A multi-layer research center for investment decisions'}
            description={
              vi
                ? 'Thiết kế theo cách người dùng thực sự đọc nghiên cứu: khuyến nghị, tổng hợp thị trường, phân tích doanh nghiệp và vĩ mô.'
                : 'Designed around how investors actually consume research: recommendations, market wraps, company coverage, and macro.'
            }
            items={[
              {
                meta: 'Daily',
                title: vi ? 'Morning call & tổng hợp' : 'Morning call & market wrap',
                description: vi
                  ? 'Tóm tắt vận động chỉ số, thanh khoản và dòng tiền.'
                  : 'Summaries of indices, liquidity, and flow behavior.'
              },
              {
                meta: 'Coverage',
                title: vi ? 'Doanh nghiệp & ngành' : 'Company & sector',
                description: vi
                  ? 'Luận điểm đầu tư, cập nhật định giá và catalyst theo ngành.'
                  : 'Theses, valuation refreshes, and sector catalysts.'
              },
              {
                meta: 'Macro',
                title: vi ? 'Vĩ mô & chiến lược' : 'Macro & strategy',
                description: vi
                  ? 'Khung nhìn dài hạn cho phân bổ tài sản và chiến lược thị trường.'
                  : 'Longer-horizon views for asset allocation and market strategy.'
              }
            ]}
          />

          <section className="subpage-panel">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="max-w-3xl">
                <p className="subpage-eyebrow">{vi ? 'Danh mục chính' : 'Core tracks'}</p>
                <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                  {vi ? 'Đi vào đúng khu vực nghiên cứu bạn cần' : 'Jump directly to the research area you need'}
                </h2>
              </div>
              <Link
                href={`/${locale}/research`}
                className="rounded-full border border-[rgba(36,69,140,0.18)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)]"
              >
                {vi ? 'Xem toàn bộ' : 'View all'}
              </Link>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {tracks.map((track) => (
                <Link
                  key={track.title}
                  href={track.href}
                  className="subpage-soft-card group flex h-full flex-col p-4 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <h3 className="text-[1rem] font-semibold text-slate-950">{track.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{track.summary}</p>
                  <span className="mt-auto pt-4 text-sm font-semibold text-[var(--color-primary)] transition group-hover:translate-x-0.5">
                    {vi ? 'Mở mục này' : 'Open section'}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="subpage-panel">
            <div className="max-w-3xl">
              <p className="subpage-eyebrow">{vi ? 'Cổ phiếu khuyến nghị' : 'Recommended stocks'}</p>
              <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                {vi ? 'Báo cáo nổi bật và khuyến nghị giao dịch' : 'Featured reports and trade ideas'}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {vi
                  ? 'Người dùng có thể xem các báo cáo nổi bật theo ngày, cùng các nghiên cứu chuyên sâu từ chuyên viên phân tích.'
                  : 'Users can review highlighted reports by date and deeper coverage from analysts.'}
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {(data.items || []).slice(0, 6).map((item: any) => (
                <ContentCard
                  key={item.id}
                  title={item.attributes.title}
                  summary={item.attributes.summary}
                  href={`/${locale}/research/${item.attributes.slug}`}
                  date={item.attributes.publishDate}
                  category={item.attributes.category?.data?.attributes?.title}
                  imageUrl={assetUrl(item.attributes.coverImage?.data?.attributes?.url)}
                  locale={locale}
                />
              ))}
            </div>
          </section>

          <section className="subpage-panel">
            <div className="max-w-3xl">
              <p className="subpage-eyebrow">{vi ? 'Nghiên cứu & phân tích' : 'Research & analysis'}</p>
              <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                {vi ? 'Nội dung theo nhịp thị trường' : 'Content aligned to the market rhythm'}
              </h2>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                vi ? 'Morning call' : 'Morning call',
                vi ? 'Báo cáo doanh nghiệp' : 'Company report',
                vi ? 'Báo cáo ngành' : 'Sector report',
                vi ? 'Báo cáo chiến lược / vĩ mô' : 'Strategy / macro',
                vi ? 'Phân tích viên' : 'Analysts'
              ].map((label) => (
                <TagChip key={label} label={label} />
              ))}
            </div>
          </section>

          <section className="subpage-panel">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="max-w-3xl">
                <p className="subpage-eyebrow">{vi ? 'Tìm kiếm báo cáo' : 'Search reports'}</p>
                <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                  {vi ? 'Lọc theo nhu cầu của bạn' : 'Filter by your needs'}
                </h2>
              </div>
            </div>
            <div className="mt-4">
              <SearchBar action={`/${locale}/research`} search={search} placeholder={vi ? 'Tìm báo cáo...' : 'Search reports...'} />
            </div>

            {data.items.length === 0 ? (
              <div className="mt-5">
                <EmptyState
                  title={vi ? 'Không có báo cáo phù hợp' : 'No matching reports'}
                  description={vi ? 'Hãy thử thay đổi từ khóa tìm kiếm.' : 'Try a different search keyword.'}
                />
              </div>
            ) : null}
            <div className="mt-5">
              <Pagination
                page={page}
                pageCount={data.pagination?.pageCount || 1}
                basePath={`/${locale}/research`}
                query={search || ''}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
