import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Link from 'next/link';
import { DownloadCard } from '@/components/ui/DownloadCard';
import { InsightRail } from '@/components/ui/InsightRail';
import { PageHero } from '@/components/ui/PageHero';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

function isVi(locale: string) {
  return locale === 'vi';
}

function SectionCard({
  title,
  summary,
  bullets,
  image
}: {
  title: string;
  summary: string;
  bullets: string[];
  image: string | StaticImageData;
}) {
  return (
    <article className="subpage-soft-card overflow-hidden p-4 md:p-5">
      <div className="relative h-44 overflow-hidden rounded-[1rem] border border-white/70 bg-white">
        <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 30vw" />
      </div>
      <h3 className="mt-4 text-[1.05rem] font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{summary}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {bullets.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function DealItem({
  title,
  amount,
  role,
  date
}: {
  title: string;
  amount: string;
  role: string;
  date?: string;
}) {
  return (
    <article className="subpage-soft-card p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{role}</p>
      <h3 className="mt-2 text-[1rem] font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{amount}</p>
      {date ? <p className="mt-1 text-sm text-slate-500">{date}</p> : null}
    </article>
  );
}

export function InvestmentBankingLandingPage({ locale }: { locale: string }) {
  const vi = isVi(locale);
  const base = `/${locale}/services/${vi ? 'ngan-hang-dau-tu' : 'investment-banking'}`;

  const services = [
    {
      title: vi ? 'Thị trường vốn (ECM)' : 'Equity capital markets (ECM)',
      summary: vi
        ? 'Cầu nối cho các giao dịch vốn cổ phần, M&A và phân phối cổ phần theo chuẩn quốc tế.'
        : 'A bridge for cross-border equity transactions, M&A, and share distribution.',
      href: `${base}/thi-truong-von.html`,
      image: SHINHAN_VISUALS.services.investmentBanking.hero,
      bullets: vi
        ? ['Tư vấn giao dịch', 'Tư vấn M&A', 'Chào bán & phân phối cổ phần']
        : ['Transaction advisory', 'M&A advisory', 'Share distribution']
    },
    {
      title: vi ? 'Thị trường nợ (DCM)' : 'Debt capital markets (DCM)',
      summary: vi
        ? 'Tư vấn và thu xếp vốn trung - dài hạn qua trái phiếu, khoản vay và sản phẩm tài trợ.'
        : 'Advisory and funding solutions for medium- and long-term capital needs.',
      href: `${base}/thi-truong-no.html`,
      image: SHINHAN_VISUALS.services.investmentBanking.hero,
      bullets: vi
        ? ['Trái phiếu & mezzanine', 'Huy động vốn quốc tế', 'Đầu tư & giao dịch CD']
        : ['Bonds & mezzanine', 'Foreign capital raising', 'CD investment and trading']
    }
  ];

  const deals = vi
    ? [
        { title: 'PVOIL', amount: '905 tỷ VND', role: 'Tư vấn mua bán', date: '11/2018' },
        { title: 'Petrolimex', amount: '60 triệu USD', role: 'Tư vấn mua bán', date: '9/2019' },
        { title: 'CMC', amount: 'Block deal', role: 'Giao dịch cổ phần', date: 'Tiêu biểu' },
        { title: 'Biwase', amount: '300 tỷ VND', role: 'Phát hành riêng lẻ', date: '10/2020' }
      ]
    : [
        { title: 'PVOIL', amount: '905 billion VND', role: 'M&A advisory', date: 'Nov 2018' },
        { title: 'Petrolimex', amount: '60 million USD', role: 'M&A advisory', date: 'Sep 2019' },
        { title: 'CMC', amount: 'Block deal', role: 'Equity transaction', date: 'Representative' },
        { title: 'Biwase', amount: '300 billion VND', role: 'Private placement', date: 'Oct 2020' }
      ];

  return (
    <>
      <PageHero
        kicker={vi ? 'Sản phẩm & Dịch vụ' : 'Products & Services'}
        title={vi ? 'Ngân hàng đầu tư' : 'Investment banking'}
        subtitle={
          vi
            ? 'Shinhan đóng vai trò cầu nối cho các giao dịch vốn cổ phần và vốn nợ, đồng hành doanh nghiệp trong M&A, phát hành và thu xếp vốn.'
            : 'Shinhan acts as a bridge for equity and debt capital transactions, supporting M&A, issuance, and funding.'
        }
        highlights={vi ? ['Thị trường vốn', 'Thị trường nợ', 'Giao dịch tiêu biểu'] : ['ECM', 'DCM', 'Selected transactions']}
        imageUrl={SHINHAN_VISUALS.services.investmentBanking.hero}
      />

      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
          <InsightRail
            eyebrow={vi ? 'Thông qua đội ngũ Shinhan' : 'Through the Shinhan team'}
            title={vi ? 'Doanh nghiệp Việt Nam có thêm cơ hội vươn ra thị trường rộng hơn' : 'Vietnamese businesses get broader access to capital and partners'}
            description={
              vi
                ? 'Nội dung gốc nhấn mạnh lợi thế hiểu thị trường Hàn Quốc, tìm kiếm đối tác, xây dựng thương hiệu và mở rộng kinh doanh.'
                : 'The source page emphasizes Korean market knowledge, partnership discovery, brand expansion, and growth.'
            }
            items={[
              {
                meta: vi ? 'Insight' : 'Insight',
                title: vi ? 'Hiểu thị trường Hàn Quốc' : 'Korean market know-how',
                description: vi ? 'Hiểu về kinh tế, văn hóa và hệ thống doanh nghiệp.' : 'Understanding economy, culture, and business systems.'
              },
              {
                meta: vi ? 'Network' : 'Network',
                title: vi ? 'Kết nối đối tác' : 'Partner matching',
                description: vi ? 'Tìm kiếm các đối tác kinh doanh tiềm năng.' : 'Finding and connecting with future business partners.'
              },
              {
                meta: vi ? 'Growth' : 'Growth',
                title: vi ? 'Mở rộng kinh doanh' : 'Business expansion',
                description: vi ? 'Giới thiệu thương hiệu và cơ hội phát triển mới.' : 'Brand exposure and new business growth opportunities.'
              }
            ]}
          />

          <section className="subpage-panel">
            <div className="max-w-3xl">
              <p className="subpage-eyebrow">{vi ? 'Các dịch vụ' : 'Services'}</p>
              <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                {vi ? 'Chúng tôi mang đến cho bạn' : 'What we bring to you'}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {vi
                  ? 'Hai mảng trọng tâm là Thị trường nợ và Thị trường vốn, được cấu trúc từ nội dung gốc của site cũ.'
                  : 'Two core tracks: debt capital markets and equity capital markets, restructured from the legacy site.'}
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {services.map((service) => (
                <Link key={service.title} href={service.href} className="group subpage-soft-card flex h-full flex-col overflow-hidden p-4 transition hover:-translate-y-0.5 hover:bg-white">
                  <div className="relative h-44 overflow-hidden rounded-[1rem] border border-white/70 bg-white">
                    <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                  </div>
                  <h3 className="mt-4 text-[1.05rem] font-semibold text-slate-950">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{service.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.bullets.map((bullet) => (
                      <span key={bullet} className="subpage-chip">
                        {bullet}
                      </span>
                    ))}
                  </div>
                  <span className="mt-auto pt-4 text-sm font-semibold text-[var(--color-primary)] transition group-hover:translate-x-0.5">
                    {vi ? 'Tìm hiểu thêm' : 'Learn more'}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="subpage-panel">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="max-w-3xl">
                <p className="subpage-eyebrow">{vi ? 'Các giao dịch tiêu biểu' : 'Selected transactions'}</p>
                <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                  {vi ? 'Kinh nghiệm triển khai trên nhiều cấu trúc giao dịch' : 'Experience across many deal structures'}
                </h2>
              </div>
              <Link href={`${base}/thi-truong-von.html`} className="rounded-full border border-[rgba(36,69,140,0.18)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
                {vi ? 'Xem ECM' : 'View ECM'}
              </Link>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {deals.map((deal) => (
                <DealItem key={deal.title} {...deal} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export function EquityMarketPage({ locale }: { locale: string }) {
  const vi = isVi(locale);
  const base = `/${locale}/services/${vi ? 'ngan-hang-dau-tu' : 'investment-banking'}`;

  return (
    <>
      <PageHero
        kicker={vi ? 'Ngân hàng đầu tư' : 'Investment banking'}
        title={vi ? 'Thị trường vốn (ECM)' : 'Equity capital markets (ECM)'}
        subtitle={
          vi
            ? 'Shinhan là cầu nối cho các giao dịch vốn cổ phần xuyên biên giới và các đợt chào bán cổ phần tại Việt Nam.'
            : 'Shinhan bridges cross-border equity transactions and share offerings in Vietnam.'
        }
        highlights={vi ? ['Tư vấn giao dịch', 'Tư vấn M&A', 'Chào bán & phân phối cổ phần'] : ['Transaction advisory', 'M&A advisory', 'Share distribution']}
        imageUrl={SHINHAN_VISUALS.services.investmentBanking.hero}
      />

      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
          <InsightRail
            eyebrow={vi ? 'Tổng quan thị trường vốn cổ phần' : 'Equity capital markets overview'}
            title={vi ? 'Cầu nối giữa nhà đầu tư quốc tế và doanh nghiệp Việt Nam' : 'A bridge between international investors and Vietnamese businesses'}
            description={
              vi
                ? 'ECM tập trung vào M&A, chào bán riêng lẻ, chào bán công khai và phân phối cổ phần.'
                : 'ECM focuses on M&A, private placements, public offerings, and equity distribution.'
            }
            items={[
              {
                meta: 'M&A',
                title: vi ? 'Tư vấn mua bán, sáp nhập' : 'M&A advisory',
                description: vi ? 'Tìm kiếm mục tiêu, đàm phán và hỗ trợ giao dịch.' : 'Target search, negotiation, and transaction support.'
              },
              {
                meta: 'IPO',
                title: vi ? 'Chào bán & phân phối cổ phần' : 'Offerings and distribution',
                description: vi ? 'Hỗ trợ các đợt chào bán riêng lẻ và ra công chúng.' : 'Support for private and public equity offerings.'
              },
              {
                meta: 'Cross-border',
                title: vi ? 'Giao dịch xuyên biên giới' : 'Cross-border deals',
                description: vi ? 'Kết nối nhà đầu tư quốc tế với doanh nghiệp Việt Nam.' : 'Connecting global investors with Vietnamese issuers.'
              }
            ]}
          />

          <section className="subpage-panel grid gap-4 md:grid-cols-2">
            <SectionCard
              image={SHINHAN_VISUALS.services.investmentBanking.hero}
              title={vi ? 'Các dịch vụ giao dịch M&A' : 'M&A transaction services'}
              summary={
                vi
                  ? 'Hỗ trợ toàn diện cho nhà đầu tư nước ngoài đầu tư vào doanh nghiệp Việt Nam.'
                  : 'Comprehensive support for foreign investors entering Vietnamese businesses.'
              }
              bullets={
                vi
                  ? ['Tìm kiếm công ty mục tiêu', 'Hỗ trợ gặp gỡ và đàm phán', 'Thực hiện giao dịch mua bán / góp vốn']
                  : ['Target company search', 'Meeting and negotiation support', 'Execution of acquisitions / contributions']
              }
            />
            <SectionCard
              image={SHINHAN_VISUALS.services.partnerBank}
              title={vi ? 'Chào bán & phân phối cổ phần' : 'Share offering and distribution'}
              summary={
                vi
                  ? 'Đồng hành qua từng giai đoạn từ công ty đại chúng đến IPO / niêm yết và phát hành tăng vốn.'
                  : 'Supporting companies through public-company conversion, IPO/listing, and subsequent equity raises.'
              }
              bullets={
                vi
                  ? ['Tư vấn thực hiện', 'Chào bán riêng lẻ', 'Bảo lãnh phát hành']
                  : ['Execution advisory', 'Private placement', 'Underwriting support']
              }
            />
          </section>

          <section className="subpage-panel">
            <div className="max-w-3xl">
              <p className="subpage-eyebrow">{vi ? 'Các giao dịch ECM tiêu biểu' : 'Selected ECM deals'}</p>
              <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                {vi ? 'Một số thương vụ tiêu biểu trong thị trường vốn' : 'Representative transactions across capital markets'}
              </h2>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <DealItem title="PVOIL" amount={vi ? '905 tỷ VND' : '905 billion VND'} role={vi ? 'Tư vấn mua bán' : 'M&A advisory'} date={vi ? 'Tháng 11/2018' : 'Nov 2018'} />
              <DealItem title="Petrolimex" amount={vi ? '60 triệu USD' : '60 million USD'} role={vi ? 'Tư vấn mua bán' : 'M&A advisory'} date={vi ? 'Tháng 9/2019' : 'Sep 2019'} />
              <DealItem title="CMC" amount={vi ? 'Block deal' : 'Block deal'} role={vi ? 'Giao dịch cổ phần' : 'Equity transaction'} />
              <DealItem title="Biwase" amount={vi ? '300 tỷ VND' : '300 billion VND'} role={vi ? 'Phát hành riêng lẻ' : 'Private placement'} date={vi ? 'Tháng 10/2020' : 'Oct 2020'} />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`${base}/thi-truong-no.html`} className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white">
                {vi ? 'Xem DCM' : 'View DCM'}
              </Link>
              <Link href={`/${locale}/contact`} className="rounded-full border border-[rgba(36,69,140,0.18)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
                {vi ? 'Liên hệ tư vấn' : 'Contact advisory'}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export function DebtMarketPage({ locale }: { locale: string }) {
  const vi = isVi(locale);
  const base = `/${locale}/services/${vi ? 'ngan-hang-dau-tu' : 'investment-banking'}`;

  return (
    <>
      <PageHero
        kicker={vi ? 'Ngân hàng đầu tư' : 'Investment banking'}
        title={vi ? 'Thị trường nợ (DCM)' : 'Debt capital markets (DCM)'}
        subtitle={
          vi
            ? 'Tư vấn và thu xếp nguồn vốn trung - dài hạn qua trái phiếu, khoản vay và các sản phẩm tài trợ.'
            : 'Advisory and capital raising across bonds, loans, and financing structures.'
        }
        highlights={vi ? ['Trái phiếu doanh nghiệp', 'Khoản vay quốc tế', 'CD trading'] : ['Corporate bonds', 'Foreign loans', 'CD trading']}
        imageUrl={SHINHAN_VISUALS.services.investmentBanking.hero}
      />

      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
          <InsightRail
            eyebrow={vi ? 'Tổng quan về thị trường nợ' : 'Debt capital markets overview'}
            title={vi ? 'Nguồn vốn trung - dài hạn cho doanh nghiệp' : 'Medium- to long-term capital for businesses'}
            description={
              vi
                ? 'Shinhan tư vấn và thu xếp vốn bằng phát hành trái phiếu, khoản vay và các sản phẩm mezzanine.'
                : 'Shinhan advises and arranges funding through bonds, loans, and mezzanine structures.'
            }
            items={[
              {
                meta: 'Bonds',
                title: vi ? 'Trái phiếu doanh nghiệp & mezzanine' : 'Corporate bonds & mezzanine',
                description: vi ? 'Cấu trúc tối ưu theo dòng tiền và tài sản bảo đảm.' : 'Optimized to cash flow and collateral profile.'
              },
              {
                meta: 'Global',
                title: vi ? 'Huy động vốn quốc tế' : 'Foreign capital raising',
                description: vi ? 'Tiếp cận Hàn Quốc, Hong Kong và Singapore.' : 'Access to Korea, Hong Kong, and Singapore.'
              },
              {
                meta: 'CD',
                title: vi ? 'Đầu tư và giao dịch CD' : 'CD investing and trading',
                description: vi ? 'Giao dịch chứng chỉ tiền gửi kỳ hạn 6-18 tháng.' : 'Certificates of deposit with 6-18 month tenors.'
              }
            ]}
          />

          <section className="subpage-panel grid gap-4 md:grid-cols-2">
            <SectionCard
              image={SHINHAN_VISUALS.services.investmentBanking.hero}
              title={vi ? 'Trái phiếu doanh nghiệp & mezzanine financing' : 'Corporate bonds & mezzanine financing'}
              summary={
                vi
                  ? 'Hỗ trợ doanh nghiệp huy động vốn qua phát hành trái phiếu và các sản phẩm tài trợ thứ cấp.'
                  : 'Helping businesses raise capital through bonds and subordinated financing products.'
              }
              bullets={
                vi
                  ? ['Nhà đầu tư đa dạng', 'Nguồn vốn trung và dài hạn', 'Chi phí phát hành tối ưu']
                  : ['Diverse investor base', 'Medium- and long-term capital', 'Optimized issuance cost']
              }
            />
            <SectionCard
              image={SHINHAN_VISUALS.services.partnerFinance}
              title={vi ? 'Huy động vốn từ thị trường nước ngoài' : 'Foreign capital raising'}
              summary={
                vi
                  ? 'Hỗ trợ doanh nghiệp tìm kiếm nguồn vốn và cấu trúc giao dịch ngoài Việt Nam.'
                  : 'Supporting businesses in sourcing and structuring offshore transactions.'
              }
              bullets={
                vi
                  ? ['USD hoặc Won', 'Khoản vay / Trái phiếu / Mezzanine', 'Hàn Quốc, Hồng Kông, Singapore']
                  : ['USD or KRW funding', 'Loans / bonds / mezzanine', 'Korea, Hong Kong, Singapore']
              }
            />
          </section>

          <section className="subpage-panel">
            <div className="max-w-3xl">
              <p className="subpage-eyebrow">{vi ? 'Các giao dịch DCM tiêu biểu' : 'Selected DCM deals'}</p>
              <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                {vi ? 'Những thương vụ tiêu biểu của mảng thị trường nợ' : 'Representative deals in debt capital markets'}
              </h2>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <DealItem title="Gelex" amount={vi ? '400 tỷ VND' : '400 billion VND'} role={vi ? 'Trái phiếu / Nhà thu xếp chính' : 'Bond / Lead arranger'} date={vi ? 'Tháng 5/2018' : 'May 2018'} />
              <DealItem title="Shinhan Finance" amount={vi ? '1.400 tỷ VND' : '1.4 trillion VND'} role={vi ? 'Trái phiếu / Nhà thu xếp chính' : 'Bond / Lead arranger'} date={vi ? 'Tháng 10/2019' : 'Oct 2019'} />
              <DealItem title="Home Credit" amount={vi ? '80 triệu USD' : '80 million USD'} role={vi ? 'Khoản vay có bảo đảm / Đồng thu xếp chính' : 'Secured loan / Co-lead arranger'} date={vi ? 'Tháng 12/2017' : 'Dec 2017'} />
              <DealItem title="CJ Cầu Tre" amount={vi ? '100 tỷ KRW' : '100 billion KRW'} role={vi ? 'Vay hợp vốn / Thu xếp & tư vấn chính' : 'Syndicated loan / Mandated lead arranger'} date={vi ? 'Tháng 12/2019' : 'Dec 2019'} />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`${base}/thi-truong-von.html`} className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white">
                {vi ? 'Xem ECM' : 'View ECM'}
              </Link>
              <Link href={`/${locale}/contact`} className="rounded-full border border-[rgba(36,69,140,0.18)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
                {vi ? 'Liên hệ tư vấn' : 'Contact advisory'}
              </Link>
            </div>
          </section>

          <section className="subpage-panel">
            <div className="max-w-3xl">
              <p className="subpage-eyebrow">{vi ? 'Dịch vụ ứng trước tiền bán' : 'Cash advance service'}</p>
              <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                {vi ? 'Một phần của hệ sinh thái tài chính cho nhà đầu tư' : 'Part of the investor financing ecosystem'}
              </h2>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <DownloadCard title={vi ? 'Ứng trước tiền bán' : 'Cash advance'} summary={vi ? 'Rút tiền trước khi tiền bán về tài khoản.' : 'Withdraw sale proceeds before settlement.'} href={`/${locale}/services/moi-gioi-chung-khoan/dich-vu-tai-chinh.html`} />
              <DownloadCard title={vi ? 'Danh mục cổ phiếu ký quỹ' : 'Marginable stocks'} summary={vi ? 'Tham khảo danh mục cho vay theo từng thời điểm.' : 'Check eligible stocks by period.'} href={`/${locale}/support/thong-bao.html`} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
