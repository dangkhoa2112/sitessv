import Image from 'next/image';
import Link from 'next/link';
import { ContentCard } from '@/components/ui/ContentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHero } from '@/components/ui/PageHero';
import { SearchBar } from '@/components/ui/SearchBar';
import { assetUrl } from '@/lib/urls';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

type ResearchCategoryPageProps = {
  locale: string;
  kind: 'periodic' | 'macro' | 'analyst';
  data?: Array<any>;
  search?: string;
  heroImageUrl?: string;
};

function isVi(locale: string) {
  return locale === 'vi';
}

function AnalystCard({
  name,
  experience,
  coverage,
  stocks
}: {
  name: string;
  experience: string;
  coverage: string;
  stocks?: string[];
}) {
  return (
    <article className="subpage-soft-card p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgba(224,236,252,0.95),rgba(197,217,246,0.9))]">
          <Image src={SHINHAN_VISUALS.research.analystIcon} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
        </div>
        <div>
          <h3 className="text-[1rem] font-semibold text-slate-950">{name}</h3>
          <p className="mt-1 text-sm text-slate-600">{experience}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{coverage}</p>
      {stocks?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {stocks.map((stock) => (
            <span key={stock} className="subpage-chip">
              {stock}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function ResearchCategoryPage({ locale, kind, data = [], search, heroImageUrl }: ResearchCategoryPageProps) {
  const vi = isVi(locale);

  if (kind === 'analyst') {
    const analysts = vi
      ? [
          { name: 'Bùi Thị Thảo Ly', experience: '> 10 năm', coverage: 'Giám đốc phân tích, Vĩ mô & Chiến lược' },
          { name: 'Nguyễn Hoàn Niên', experience: '5-10 năm', coverage: 'Vĩ mô & Chiến lược; Dữ liệu & Sản phẩm' },
          { name: 'Hoàng Nam', experience: '5-10 năm', coverage: 'Thị trường & Chiến lược; Tiện ích; Khu Công Nghiệp', stocks: ['GEG', 'VSH', 'HDG', 'NT2', 'TV1'] },
          { name: 'Nguyễn Phương Thảo', experience: '5-10 năm', coverage: 'Logistic, Hóa chất, Dầu khí', stocks: ['GMD', 'HAH', 'DGC', 'PLX', 'BSR'] },
          { name: 'Nguyễn Dương Phương', experience: '1-5 năm', coverage: 'Ngân Hàng; Trái phiếu', stocks: ['TCB', 'MBB', 'VCB', 'ACB', 'VPB'] },
          { name: 'Lê Thiên Hương', experience: '1-5 năm', coverage: 'Vật liệu xây dựng; Xây dựng', stocks: ['HPG', 'NKG', 'HSG', 'CTD', 'BMP'] }
        ]
      : [
          { name: 'Bui Thi Thao Ly', experience: '> 10 years', coverage: 'Head of Research, Macro & Strategy' },
          { name: 'Nguyen Hoan Nien', experience: '5-10 years', coverage: 'Macro & Strategy; Data & Products' },
          { name: 'Hoang Nam', experience: '5-10 years', coverage: 'Market & Strategy; Utilities; Industrial Parks', stocks: ['GEG', 'VSH', 'HDG', 'NT2', 'TV1'] },
          { name: 'Nguyen Phuong Thao', experience: '5-10 years', coverage: 'Logistics, Chemicals, Oil & Gas', stocks: ['GMD', 'HAH', 'DGC', 'PLX', 'BSR'] },
          { name: 'Nguyen Duong Phuong', experience: '1-5 years', coverage: 'Banks; Bonds', stocks: ['TCB', 'MBB', 'VCB', 'ACB', 'VPB'] },
          { name: 'Le Thien Huong', experience: '1-5 years', coverage: 'Construction materials; Construction', stocks: ['HPG', 'NKG', 'HSG', 'CTD', 'BMP'] }
        ];

    return (
      <>
        <PageHero
          kicker={vi ? 'Trung tâm phân tích' : 'Research Center'}
          title={vi ? 'Phân tích viên' : 'Analysts'}
          subtitle={vi ? 'Danh sách chuyên viên phân tích theo nhóm ngành và kinh nghiệm.' : 'Analyst roster by sector coverage and experience.'}
          highlights={vi ? ['Vĩ mô', 'Chiến lược', 'Doanh nghiệp'] : ['Macro', 'Strategy', 'Company coverage']}
          imageUrl={heroImageUrl || SHINHAN_VISUALS.research.hero}
        />
        <div className="subpage-shell">
          <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
            <section className="subpage-panel">
              <SearchBar action={`/${locale}/research/phan-tich-vien.html`} search={search} placeholder={vi ? 'Tìm chuyên viên...' : 'Search analysts...'} />
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {analysts.map((analyst) => (
                  <AnalystCard key={analyst.name} {...analyst} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }

  const title = kind === 'periodic' ? (vi ? 'Báo cáo định kỳ' : 'Periodic reports') : vi ? 'Báo cáo chiến lược / vĩ mô' : 'Strategy / macro reports';
  const subtitle =
    kind === 'periodic'
      ? vi
        ? 'Morning call, tổng hợp thị trường và các bản tin ngắn hạn.'
        : 'Morning call, market wrap, and short-horizon notes.'
      : vi
        ? 'Các báo cáo chiến lược, vĩ mô và bức tranh dài hạn.'
        : 'Strategy and macro reports for a longer view.';

  return (
    <>
      <PageHero
        kicker={vi ? 'Trung tâm phân tích' : 'Research Center'}
        title={title}
        subtitle={subtitle}
        highlights={kind === 'periodic' ? (vi ? ['Morning call', 'Tổng hợp thị trường', 'Báo cáo ngày'] : ['Morning call', 'Market wrap', 'Daily notes']) : vi ? ['Chiến lược', 'Vĩ mô', 'Phân bổ'] : ['Strategy', 'Macro', 'Allocation']}
        imageUrl={heroImageUrl || SHINHAN_VISUALS.research.hero}
      />
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
          <section className="subpage-panel">
            <SearchBar action={`/${locale}/research/${kind === 'periodic' ? 'bao-cao-dinh-ky.html' : 'bao-cao-vi-mo.html'}`} search={search} placeholder={vi ? 'Tìm báo cáo...' : 'Search reports...'} />
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {data.length ? (
                data.map((item: any) => (
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
                ))
              ) : (
                <EmptyState title={vi ? 'Chưa có nội dung' : 'No content yet'} description={vi ? 'Nội dung đang được cập nhật.' : 'Content is being updated.'} />
              )}
            </div>
          </section>
          <section className="subpage-panel">
            <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/research`} className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white">
                {vi ? 'Trở về trung tâm' : 'Back to center'}
              </Link>
              <Link href={`/${locale}/research/phan-tich-vien.html`} className="rounded-full border border-[rgba(36,69,140,0.18)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
                {vi ? 'Xem phân tích viên' : 'View analysts'}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
