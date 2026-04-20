import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { InsightRail } from '@/components/ui/InsightRail';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';
import { SHINHAN_BRAND_LINKS } from '@/lib/shinhan-links';

type BrokerageLandingPageProps = {
  locale: string;
};

const ICONS = {
  trading: SHINHAN_VISUALS.services.research.icon,
  advisory: SHINHAN_VISUALS.services.investmentBanking.icon,
  financial: SHINHAN_VISUALS.services.partnerFinance
} as const;

function isVi(locale: string) {
  return locale === 'vi';
}

export function BrokerageLandingPage({ locale }: BrokerageLandingPageProps) {
  const vi = isVi(locale);

  const services = [
    {
      id: 'online-trading',
      href: `/${locale}/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html`,
      icon: ICONS.trading,
      title: vi ? 'Giao dịch trực tuyến' : 'Online trading',
      summary: vi
        ? 'Hệ thống giao dịch nhanh, ổn định, phù hợp nhiều phong cách đầu tư.'
        : 'Fast, stable execution designed for a range of investor profiles.',
      detail: vi
        ? 'Chúng tôi cung cấp hệ thống giao dịch với tốc độ nhanh và ổn định, mang lại trải nghiệm mượt cho nhà đầu tư chủ động lẫn nhà đầu tư mới bắt đầu.'
        : 'We provide a fast and stable trading system for both active investors and first-time users.',
    },
    {
      id: 'investment-advisory',
      href: `/${locale}/services/moi-gioi-chung-khoan/tu-van-dau-tu.html`,
      icon: ICONS.advisory,
      title: vi ? 'Tư vấn đầu tư chứng khoán' : 'Investment advisory',
      summary: vi
        ? 'Đội ngũ chuyên viên đồng hành trong phân tích thị trường và chiến lược đầu tư.'
        : 'Advisors support market analysis and practical investment planning.',
      detail: vi
        ? 'Các chuyên gia tư vấn là cộng sự tin tưởng trên con đường đầu tư thịnh vượng của khách hàng, giúp định hình chiến lược đầu tư phù hợp với từng mục tiêu.'
        : 'Our advisors work with clients to shape a strategy aligned to their goals and risk appetite.',
    },
    {
      id: 'financial-services',
      href: `/${locale}/services/moi-gioi-chung-khoan/dich-vu-tai-chinh.html`,
      icon: ICONS.financial,
      title: vi ? 'Dịch vụ tài chính' : 'Financial services',
      summary: vi
        ? 'Giải pháp hỗ trợ tài chính dựa trên tài sản hiện có để tối ưu hiệu quả đầu tư.'
        : 'Financial solutions that help optimize investing against existing assets.',
      detail: vi
        ? 'Sản phẩm hỗ trợ tài chính cho vay đầu tư chứng khoán dựa trên giá trị tài sản đang có, nhằm gia tăng lợi nhuận khi giá tăng.'
        : 'Margin-oriented solutions based on existing portfolio value to support growth in rising markets.',
    }
  ];

  const futureCards = vi
    ? [
        {
          title: 'Công ty chứng khoán hàng đầu Hàn Quốc',
          description: 'Tự hào là môi trường đầu tư chuyên nghiệp, tin cậy và an toàn dành cho nhà đầu tư.'
        },
        {
          title: 'Hệ thống giao dịch hiện đại',
          description: 'Nền tảng chứng khoán chuyên nghiệp với nhiều tiện ích hỗ trợ giao dịch nhanh và chủ động.'
        },
        {
          title: 'Hỗ trợ tư vấn chuyên nghiệp',
          description: 'Đội ngũ môi giới - tư vấn tận tâm, am hiểu thị trường và xu hướng giao dịch.'
        },
        {
          title: 'Cung cấp thông tin đầu tư tin cậy',
          description: 'Thông tin được phân tích và cung cấp bởi đội ngũ nghiên cứu chuyên nghiệp.'
        },
        {
          title: 'Giải pháp tài chính toàn diện cùng One Shinhan',
          description: 'Kết nối ưu đãi và hệ sinh thái khách hàng trong cùng hệ thống Shinhan tại Việt Nam.'
        }
      ]
    : [
        {
          title: 'Leading securities firm from Korea',
          description: 'A professional, trusted, and secure environment for investors.'
        },
        {
          title: 'Modern trading infrastructure',
          description: 'A professional platform with useful features for fast, self-directed investing.'
        },
        {
          title: 'Professional advisory support',
          description: 'Dedicated advisors with market depth and practical execution know-how.'
        },
        {
          title: 'Trusted investment intelligence',
          description: 'Research-backed market information designed to support better decisions.'
        },
        {
          title: 'One Shinhan financial ecosystem',
          description: 'Exclusive benefits across the Shinhan ecosystem in Vietnam.'
        }
      ];

  return (
    <>
      <PageHero
        kicker={vi ? 'Sản phẩm & Dịch vụ' : 'Products & Services'}
        title={vi ? 'Môi giới chứng khoán' : 'Securities brokerage'}
        subtitle={
          vi
            ? 'Chúng tôi ở đây để đồng hành cùng mục tiêu tài chính của bạn với trải nghiệm giao dịch, tư vấn và giải pháp tài chính được thiết kế cho nhà đầu tư hiện đại.'
            : 'We are here to support your financial goals with trading, advice, and financing built for modern investors.'
        }
        highlights={
          vi
            ? ['Tối đa hóa lợi nhuận', 'Đa dạng hóa đầu tư', 'Nền tảng tài chính vững vàng']
            : ['Profit optimization', 'Diversified investing', 'Long-term financial foundation']
        }
        imageUrl={SHINHAN_VISUALS.services.brokerage.hero}
      />

      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
          <InsightRail
            eyebrow={vi ? 'Đầu tư bền vững cùng Shinhan' : 'Invest sustainably with Shinhan'}
            title={vi ? 'Với chúng tôi ngay hôm nay' : 'With us, today'}
            description={
              vi
                ? 'Thành công trên thị trường chứng khoán cần thời gian và đối tác uy tín. Chúng tôi muốn đồng hành để bạn xây dựng nền tảng tài chính vững vàng và tương lai tốt đẹp hơn.'
                : 'Success in the stock market takes time and the right partner. We aim to help you build a stronger financial base and a better future.'
            }
            items={[
              {
                meta: vi ? 'Goal' : 'Goal',
                title: vi ? 'Tăng trưởng có kỷ luật' : 'Disciplined growth',
                description: vi
                  ? 'Tối ưu cơ hội tăng trưởng nhưng vẫn giữ kiểm soát rủi ro trong toàn bộ hành trình đầu tư.'
                  : 'Pursue growth while keeping risk under control across the investment journey.'
              },
              {
                meta: vi ? 'Approach' : 'Approach',
                title: vi ? 'Đồng hành chuyên nghiệp' : 'Professional support',
                description: vi
                  ? 'Đội ngũ tư vấn và nghiên cứu hỗ trợ nhà đầu tư trong phân tích, quyết định và thực thi.'
                  : 'Advisory and research teams help investors analyze, decide, and execute.'
              },
              {
                meta: vi ? 'Ecosystem' : 'Ecosystem',
                title: 'One Shinhan',
                description: vi
                  ? 'Kết nối khách hàng trong hệ sinh thái Shinhan tại Việt Nam để mở rộng tiện ích tài chính.'
                  : 'Connect to the Shinhan ecosystem in Vietnam to unlock broader financial utility.'
              }
            ]}
          />

          <section id="services" className="subpage-panel">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="max-w-3xl">
                <p className="subpage-eyebrow">{vi ? 'Các dịch vụ' : 'Services'}</p>
                <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                  {vi ? 'Chúng tôi mang đến cho bạn' : 'What we bring to you'}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {vi
                    ? 'Lộ trình dịch vụ được thiết kế theo đúng cách nhà đầu tư sử dụng sản phẩm: giao dịch, tư vấn và tài chính.'
                    : 'A service path designed around how investors actually use brokerage products: trading, advice, and financing.'}
                </p>
              </div>
              <Link href={`#future`} className="subpage-chip">
                {vi ? 'Xem phần lợi ích' : 'Jump to benefits'}
              </Link>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={service.href}
                  className="subpage-soft-card group flex h-full flex-col border border-white/70 bg-white/85 p-4 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgba(224,236,252,0.95),rgba(197,217,246,0.9))]">
                      <Image src={service.icon} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        {service.id.replace('-', ' ')}
                      </p>
                      <h3 className="mt-1 text-[1rem] font-semibold text-slate-950">{service.title}</h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{service.summary}</p>
                  <span className="mt-auto pt-4 text-sm font-semibold text-[var(--color-primary)] transition group-hover:translate-x-0.5">
                    {vi ? 'Tìm hiểu thêm' : 'Learn more'}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {services.map((service, index) => (
            <section
              key={service.id}
              id={service.id}
              className={`subpage-panel grid gap-5 overflow-hidden md:grid-cols-[1.05fr_0.95fr] ${index % 2 === 1 ? 'md:grid-cols-[0.95fr_1.05fr]' : ''}`}
            >
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <p className="subpage-eyebrow">{service.title}</p>
                <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.7rem]">
                  {service.summary}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.detail}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="subpage-chip">{vi ? 'Môi giới' : 'Brokerage'}</span>
                  <span className="subpage-chip">{vi ? 'Tư vấn' : 'Advisory'}</span>
                  <span className="subpage-chip">{vi ? 'Tài chính' : 'Financing'}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`#future`}
                    className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#16275d]"
                  >
                    {vi ? 'Xem lợi ích' : 'View benefits'}
                  </Link>
                  <Link
                    href={SHINHAN_BRAND_LINKS.trading.web}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[rgba(36,69,140,0.18)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-slate-50"
                  >
                    {vi ? 'Giao dịch ngay' : 'Trade now'}
                  </Link>
                </div>
              </div>
              <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="relative min-h-64 overflow-hidden rounded-[1.25rem] border border-white/70 bg-[linear-gradient(180deg,rgba(243,247,253,0.96),rgba(229,238,250,0.9))] shadow-[0_18px_34px_-26px_rgba(15,27,85,0.35)]">
                  <Image
                    src={index === 0 ? SHINHAN_VISUALS.services.brokerage.hero : index === 1 ? SHINHAN_VISUALS.services.trading : SHINHAN_VISUALS.services.investmentBanking.hero}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,32,90,0.08),rgba(5,32,90,0.28))]" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="max-w-md text-sm leading-6 text-white">
                      {vi
                        ? 'Thiết kế nội dung theo tinh thần của trang gốc: trực quan, có định hướng hành động và đủ chi tiết để nhà đầu tư ra quyết định.'
                        : 'Structured to mirror the original page: direct, action-oriented, and detailed enough for investors to make decisions.'}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          ))}

          <section id="future" className="subpage-panel">
            <div className="max-w-3xl">
              <p className="subpage-eyebrow">{vi ? 'Khởi tạo tương lai cùng Shinhan' : 'Build the future with Shinhan'}</p>
              <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                {vi
                  ? 'Chúng tôi nỗ lực mang đến cho nhà đầu tư sản phẩm, dịch vụ và trải nghiệm tốt nhất'
                  : 'We aim to provide investors with the best products, services, and experiences'}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {vi
                  ? 'Khung lợi ích dưới đây là bản chuyển ngữ và tái cấu trúc từ phần nội dung cũ, nhằm giữ tinh thần thương hiệu nhưng phù hợp source hiện tại.'
                  : 'The benefits below are a restructured migration of the legacy content, preserving the brand voice while fitting the current source.'}
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {futureCards.map((item, idx) => (
                <article key={item.title} className="subpage-soft-card">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgba(225,237,252,0.95),rgba(191,214,246,0.9))] text-sm font-semibold text-[var(--color-primary)]">
                    {idx + 1}
                  </div>
                  <h3 className="mt-3 text-[0.98rem] font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-[1.25rem] border border-[rgba(36,69,140,0.12)] bg-[linear-gradient(180deg,rgba(37,61,139,0.95),rgba(26,43,110,0.98))] p-5 text-white shadow-[0_18px_34px_-26px_rgba(15,27,85,0.5)] md:p-6">
              <p className="text-[1rem] font-semibold">
                {vi ? 'Hành trình đi đến tương lai tốt đẹp hơn bắt đầu từ đây' : 'The journey to a better future starts here'}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href={SHINHAN_BRAND_LINKS.trading.web} target="_blank" rel="noreferrer" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-slate-50">
                  {vi ? 'Mở tài khoản online' : 'Open an account online'}
                </Link>
                <Link href={`/${locale}/services`} className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                  {vi ? 'Xem thêm dịch vụ' : 'Browse services'}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
