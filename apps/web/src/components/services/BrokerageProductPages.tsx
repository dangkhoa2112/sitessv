import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Link from 'next/link';
import { DownloadCard } from '@/components/ui/DownloadCard';
import { InsightRail } from '@/components/ui/InsightRail';
import { PageHero } from '@/components/ui/PageHero';
import { AdvisorInquiryModal } from '@/components/services/AdvisorInquiryModal';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';
import { SHINHAN_BRAND_LINKS } from '@/lib/shinhan-links';
import { assetUrl } from '@/lib/urls';

function isVi(locale: string) {
  return locale === 'vi';
}

function PlatformCard({
  icon,
  title,
  description,
  href,
  cta
}: {
  icon: string | StaticImageData;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <Link href={href} className="subpage-soft-card group flex h-full flex-col border border-white/70 bg-white/88 p-4 transition hover:-translate-y-0.5 hover:bg-white">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgba(224,236,252,0.96),rgba(197,217,246,0.9))]">
          <Image src={icon} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
        </div>
        <div>
          <h3 className="text-[1rem] font-semibold text-slate-950">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
      <span className="mt-auto pt-4 text-sm font-semibold text-[var(--color-primary)] transition group-hover:translate-x-0.5">{cta}</span>
    </Link>
  );
}

function ChecklistCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="subpage-soft-card p-4">
      <h3 className="text-[1rem] font-semibold text-slate-950">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function BrokerageTradingPage({ locale }: { locale: string }) {
  const vi = isVi(locale);

  return (
    <>
      <PageHero
        kicker={vi ? 'Sản phẩm & Dịch vụ' : 'Products & Services'}
        title={vi ? 'Giao dịch trực tuyến' : 'Online trading'}
        subtitle={
          vi
            ? 'Nền tảng giao dịch nhanh, ổn định và đa thiết bị, đáp ứng nhu cầu của nhà đầu tư hiện đại trên web, desktop và mobile.'
            : 'Fast, stable, multi-device trading across web, desktop, and mobile for modern investors.'
        }
        highlights={vi ? ['San Xin Ha', 'Shinhan Web Trading', 'Shinhan Home Trading'] : ['San Xin Ha', 'Web Trading', 'Home Trading']}
        imageUrl={SHINHAN_VISUALS.services.trading}
      />

      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
          <InsightRail
            eyebrow={vi ? 'Ra mắt San Xin Ha' : 'Introducing San Xin Ha'}
            title={
              vi
                ? 'Ứng dụng chứng khoán đột phá cho mọi nhà đầu tư'
                : 'A breakthrough investing app for every investor'
            }
            description={
              vi
                ? 'Ứng dụng đầu tư mang tính đột phá từ Tập đoàn Tài chính Shinhan, tích hợp AI Signal, ưu đãi giao dịch và công cụ hỗ trợ quyết định.'
                : 'A modern Shinhan Finance Group investing app with AI Signal, trading perks, and decision support tools.'
            }
            items={[
              {
                meta: 'AI Signal',
                title: vi ? 'Khuyến nghị thời điểm' : 'Timing insights',
                description: vi
                  ? 'AI hỗ trợ xác định thời điểm mua bán tối ưu, giúp quyết định giao dịch nhanh và có cơ sở hơn.'
                  : 'AI helps surface optimized buy/sell timing for faster, more informed decisions.'
              },
              {
                meta: vi ? 'Experience' : 'Experience',
                title: vi ? 'An toàn và ổn định' : 'Stable execution',
                description: vi
                  ? 'Trải nghiệm giao dịch mượt, phù hợp cho cả nhà đầu tư chủ động lẫn người mới bắt đầu.'
                  : 'Smooth, reliable execution for both active traders and first-time investors.'
              },
              {
                meta: vi ? 'Tools' : 'Tools',
                title: vi ? 'Công cụ đa tiện ích' : 'Multi-tool stack',
                description: vi
                  ? 'Tích hợp bảng giá, biểu đồ, báo cáo và thông tin đầu tư ngay trong cùng một hành trình.'
                  : 'Prices, charts, research, and market information in one connected workflow.'
              }
            ]}
          />

          <section className="subpage-panel">
            <div className="max-w-3xl">
              <p className="subpage-eyebrow">{vi ? 'Trải nghiệm đa nền tảng' : 'Multi-platform experience'}</p>
              <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                {vi ? 'Giao dịch theo cách bạn muốn' : 'Trade the way you want'}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {vi
                  ? 'Trang gốc có 3 luồng chính: mobile app, phần mềm máy tính và web trading. Mỗi luồng được tách ra để dễ tiếp cận hơn.'
                  : 'The original page organizes trading into mobile, desktop, and web experiences. Here they are separated for easier navigation.'}
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <PlatformCard
                icon={SHINHAN_VISUALS.services.platforms.mts}
                title={vi ? 'Giao dịch qua ứng dụng Mobile - San Xin Ha' : 'Mobile trading - San Xin Ha'}
                description={
                  vi
                    ? 'Giao diện thân thiện, AI Signal, bộ công cụ hỗ trợ đầu tư và trải nghiệm di động tối ưu.'
                    : 'Friendly UI, AI Signal, and a mobile-first toolbox designed for active investors.'
                }
                href={`/${locale}/services/moi-gioi-chung-khoan/san-xin-ha.html`}
                cta={vi ? 'Tải ứng dụng cho điện thoại' : 'Get the mobile app'}
              />
              <PlatformCard
                icon={SHINHAN_VISUALS.services.platforms.hts}
                title={vi ? 'Giao dịch qua phần mềm máy tính - Shinhan Home Trading' : 'Desktop trading - Shinhan Home Trading'}
                description={
                  vi
                    ? 'Phần mềm chuyên nghiệp với dữ liệu thời gian thực, công cụ điều khiển nhanh và nhiều biểu đồ hỗ trợ phân tích.'
                    : 'A desktop platform with real-time data, quick controls, and richer charting tools for analysis.'
                }
                href={`/${locale}/services/moi-gioi-chung-khoan/he-thong-giao-dich.html`}
                cta={vi ? 'Tải ứng dụng cho máy tính' : 'Download desktop app'}
              />
              <PlatformCard
                icon={SHINHAN_VISUALS.services.platforms.wts}
                title={vi ? 'Giao dịch trực tuyến qua Web - Shinhan Web Trading' : 'Web trading - Shinhan Web Trading'}
                description={
                  vi
                    ? 'Giao dịch ngay trên trình duyệt, không cần cài đặt, đầy đủ tính năng và tối ưu cho mọi nhà đầu tư.'
                    : 'Browser-based trading with no installation, full functionality, and broad accessibility.'
                }
                href={SHINHAN_BRAND_LINKS.trading.web}
                cta={vi ? 'Truy cập ngay' : 'Open web trading'}
              />
            </div>
          </section>

          <section className="subpage-panel grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ChecklistCard
              title={vi ? 'Tại sao chọn hệ thống này?' : 'Why this platform?'}
              items={
                vi
                  ? ['Cập nhật dữ liệu thị trường theo thời gian thực', 'Tích hợp đầy đủ tính năng giao dịch', 'Thiết kế cho cả nhà đầu tư mới và chuyên sâu']
                  : ['Real-time market updates', 'Full-featured trading workflows', 'Built for new and advanced investors']
              }
            />
            <ChecklistCard
              title={vi ? 'Tính năng cốt lõi' : 'Core features'}
              items={
                vi
                  ? ['AI signal hỗ trợ ra quyết định', 'Biểu đồ, bảng giá và công cụ phân tích', 'Giao diện thân thiện, trực quan']
                  : ['AI decision support', 'Charts, quotes, and analytics', 'Friendly and intuitive interface']
              }
            />
            <ChecklistCard
              title={vi ? 'Kênh hỗ trợ' : 'Support channels'}
              items={
                vi
                  ? ['Giao dịch trên mobile, web và desktop', 'Tài liệu hướng dẫn theo từng nền tảng', 'Mở tài khoản và hỗ trợ online']
                  : ['Mobile, web, and desktop access', 'Platform-specific guides', 'Online account opening and support']
              }
            />
            <article className="subpage-soft-card p-4">
              <h3 className="text-[1rem] font-semibold text-slate-950">{vi ? 'Liên kết nhanh' : 'Quick links'}</h3>
              <div className="mt-3 space-y-2">
                <Link href={`/${locale}/services/moi-gioi-chung-khoan/dich-vu-tai-chinh`} className="block rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-[var(--color-primary)]">
                  {vi ? 'Dịch vụ tài chính' : 'Financial services'}
                </Link>
                <Link href={`/${locale}/services/moi-gioi-chung-khoan/tu-van-dau-tu`} className="block rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-[var(--color-primary)]">
                  {vi ? 'Tư vấn đầu tư' : 'Investment advisory'}
                </Link>
                <Link href={`/${locale}/services/moi-gioi-chung-khoan/san-xin-ha`} className="block rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-[var(--color-primary)]">
                  {vi ? 'Sàn Xịn Ha' : 'San Xin Ha'}
                </Link>
                <Link href={`/${locale}/services/moi-gioi-chung-khoan/he-thong-giao-dich.html`} className="block rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-[var(--color-primary)]">
                  {vi ? 'Hệ thống giao dịch' : 'Trading system'}
                </Link>
              </div>
            </article>
          </section>

          <section className="subpage-panel">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="max-w-3xl">
                <p className="subpage-eyebrow">{vi ? 'Bản công bố rủi ro' : 'Risk disclosure'}</p>
                <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                  {vi ? 'Chi tiết và hướng dẫn sử dụng từng nền tảng' : 'Guides for each platform'}
                </h2>
              </div>
              <Link href={`/${locale}/services`} className="rounded-full border border-[rgba(36,69,140,0.18)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
                {vi ? 'Xem toàn bộ dịch vụ' : 'View all services'}
              </Link>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <DownloadCard title={vi ? 'Tài liệu giao dịch trực tuyến' : 'Online trading guide'} summary={vi ? 'Bản hướng dẫn và các lưu ý sử dụng nền tảng.' : 'Instructions and usage notes for the trading stack.'} href={`/${locale}/support/huong-dan-giao-dich.html`} />
              <DownloadCard title={vi ? 'Bản công bố rủi ro' : 'Risk disclosure'} summary={vi ? 'Thông tin về rủi ro khi sử dụng giao dịch trực tuyến.' : 'Risk information for online trading users.'} href={`/${locale}/support/quy-dinh-giao-dich.html`} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

type AdvisoryImage = {
  data?: {
    attributes?: {
      url?: string | null;
      alternativeText?: string | null;
    } | null;
  } | null;
} | null;

type AdvisoryProfile = {
  name?: string | null;
  quote?: string | null;
  cert?: string | null;
  experience?: string | null;
  phone?: string | null;
  badge?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  avatar?: AdvisoryImage;
};

type AdvisoryService = {
  advisorSectionTitle?: string | null;
  advisorSectionDescription?: string | null;
  advisorSectionBackgroundImage?: AdvisoryImage;
  advisors?: AdvisoryProfile[] | null;
};

function normalizePhoneHref(phone?: string | null) {
  if (!phone) return '';
  return phone.replace(/(?!^\+)[^\d]/g, '');
}

function AdvisoryAvatar({ advisor }: { advisor: AdvisoryProfile }) {
  const avatarUrl = assetUrl(advisor.avatar?.data?.attributes?.url);
  const alt = advisor.avatar?.data?.attributes?.alternativeText || advisor.name || '';

  if (avatarUrl) {
    return (
      <div className="relative h-16 w-16 overflow-hidden rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(224,236,252,0.96),rgba(197,217,246,0.9))]">
        <Image src={avatarUrl} alt={alt} fill sizes="64px" className="object-cover" />
      </div>
    );
  }

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(224,236,252,0.96),rgba(197,217,246,0.9))] text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
      {advisor.name?.slice(0, 2) || 'AD'}
    </div>
  );
}

function AdvisorCard({ advisor, locale }: { advisor: AdvisoryProfile; locale: string }) {
  const vi = isVi(locale);
  const phoneHref = normalizePhoneHref(advisor.phone);
  const ctaLabel = advisor.ctaLabel || (vi ? 'Nhận tư vấn' : 'Request advice');
  const avatarUrl = assetUrl(advisor.avatar?.data?.attributes?.url);

  return (
    <article className="overflow-hidden rounded-[1.35rem] border border-[rgba(36,69,140,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,255,0.96))] p-4 shadow-[0_18px_42px_-34px_rgba(15,27,85,0.42)] md:p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="flex gap-3">
          <AdvisoryAvatar advisor={advisor} />
          <div className="min-w-0 flex-1">
            {advisor.badge ? (
              <span className="inline-flex rounded-full border border-[rgba(36,69,140,0.14)] bg-[rgba(36,69,140,0.06)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                {advisor.badge}
              </span>
            ) : null}
            <h3 className="mt-2 text-[1.08rem] font-semibold leading-tight text-slate-950 md:text-[1.25rem]">{advisor.name}</h3>
            {advisor.quote ? <p className="mt-2 text-sm italic leading-6 text-slate-600">{advisor.quote}</p> : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          {advisor.phone ? (
            <a
              href={phoneHref ? `tel:${phoneHref}` : undefined}
              className="inline-flex items-center rounded-full border border-[rgba(36,69,140,0.16)] bg-white px-3 py-2 text-sm font-semibold text-[var(--color-primary)] transition hover:-translate-y-0.5 hover:bg-[rgba(36,69,140,0.04)]"
            >
              {advisor.phone}
            </a>
          ) : null}
          <AdvisorInquiryModal
            locale={locale}
            advisorName={advisor.name || (vi ? 'Chuyên viên tư vấn' : 'Advisor')}
            advisorPhone={advisor.phone}
            advisorBadge={advisor.badge}
            advisorAvatarUrl={avatarUrl}
            triggerLabel={ctaLabel}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-3 border-t border-[rgba(36,69,140,0.08)] pt-4 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            {vi ? 'Số chứng chỉ' : 'License'}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-950">{advisor.cert || '—'}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            {vi ? 'Kinh nghiệm' : 'Experience'}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-950">{advisor.experience || '—'}</p>
        </div>
      </div>
    </article>
  );
}

export function BrokerageAdvisoryPage({ locale, service }: { locale: string; service?: AdvisoryService | null }) {
  const vi = isVi(locale);
  const advisors =
    service?.advisors?.length
      ? service.advisors
      : [
          {
            name: 'Nguyễn Quang Trường',
            quote: 'Tuân thủ 1 chiến lược đầu tư quan trọng hơn việc chiến lược đó là gì.',
            cert: '003559/MGCK',
            experience: '2007-2021',
            phone: '1900 6868',
            badge: vi ? 'Tư vấn viên tiêu biểu của tháng' : 'Featured advisor of the month',
            ctaLabel: vi ? 'Nhận tư vấn' : 'Request advice',
            ctaHref: `/${locale}/contact`
          },
          {
            name: 'Nguyễn Thị Thành Uyên',
            quote: vi ? 'Chiến lược đầu tư tập trung' : 'Focused investing strategy',
            cert: '003559/MGCK',
            experience: '2007-2021',
            phone: '1900 6868',
            badge: vi ? 'Tư vấn viên tiêu biểu của tháng' : 'Featured advisor of the month',
            ctaLabel: vi ? 'Nhận tư vấn' : 'Request advice',
            ctaHref: `/${locale}/contact`
          }
        ];
  const advisorSectionTitle = service?.advisorSectionTitle || (vi ? 'Danh sách chuyên viên tư vấn' : 'Advisor directory');
  const advisorSectionDescription =
    service?.advisorSectionDescription ||
    (vi
      ? 'Chọn tư vấn viên và để lại thông tin để đội ngũ liên hệ sớm.'
      : 'Pick an advisor and leave your details so we can follow up quickly.');
  const advisorSectionBackgroundImage = assetUrl(service?.advisorSectionBackgroundImage?.data?.attributes?.url);

  return (
    <>
      <PageHero
        kicker={vi ? 'Sản phẩm & Dịch vụ' : 'Products & Services'}
        title={vi ? 'Tư vấn đầu tư chứng khoán' : 'Investment advisory'}
        subtitle={
          vi
            ? 'Đội ngũ môi giới - tư vấn chuyên nghiệp đồng hành trong phân tích thị trường, ngành nghề và chiến lược đầu tư.'
            : 'A professional advisory team supporting market analysis, sector insight, and investment strategy.'
        }
        highlights={vi ? ['Đăng ký tại đây', 'Danh sách chuyên viên', 'Hỗ trợ chuyên nghiệp'] : ['Register here', 'Advisor directory', 'Dedicated support']}
        imageUrl={SHINHAN_VISUALS.services.investmentBanking.hero}
      />

      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
          <InsightRail
            eyebrow={vi ? 'Hỗ trợ tư vấn chuyên nghiệp' : 'Professional advisory support'}
            title={vi ? 'Đăng ký tại đây' : 'Register here'}
            description={
              vi
                ? 'Hoàn tất đăng ký để đội ngũ tư vấn liên hệ và hỗ trợ bạn tốt nhất trong hành trình đầu tư.'
                : 'Complete the registration and we will contact you with tailored investment support.'
            }
            items={[
              {
                meta: 'Step 1',
                title: vi ? 'Gửi yêu cầu' : 'Submit request',
                description: vi ? 'Điền thông tin và mối quan tâm của bạn.' : 'Fill in your details and interests.'
              },
              {
                meta: 'Step 2',
                title: vi ? 'Chọn chuyên viên' : 'Choose advisor',
                description: vi ? 'Chọn chuyên viên tư vấn phù hợp nhu cầu.' : 'Pick the advisor best aligned to your needs.'
              },
              {
                meta: 'Step 3',
                title: vi ? 'Nhận tư vấn' : 'Get contacted',
                description: vi ? 'Chúng tôi sẽ chủ động liên hệ sớm nhất.' : 'We will reach out as soon as possible.'
              }
            ]}
          />

          <section className="subpage-panel relative overflow-hidden">
            {advisorSectionBackgroundImage ? (
              <div className="pointer-events-none absolute inset-0">
                <Image
                  src={advisorSectionBackgroundImage}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,251,255,0.2),rgba(248,251,255,0.86))]" />
              </div>
            ) : null}
            <div className="relative grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
              <div className="relative z-10">
                <p className="subpage-eyebrow">{advisorSectionTitle}</p>
                <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                  {vi ? 'Chọn tư vấn viên và để lại thông tin' : 'Choose an advisor and leave your details'}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{advisorSectionDescription}</p>
                <div className="mt-4 grid gap-3">
                  {advisors.map((advisor, index) => (
                    <AdvisorCard key={`${advisor.name || advisor.phone || advisor.cert || 'advisor'}-${index}`} advisor={advisor} locale={locale} />
                  ))}
                </div>
              </div>

              <div className="subpage-soft-card relative z-10 p-4 md:p-5">
                <p className="subpage-eyebrow">{vi ? 'Bắt đầu đăng ký' : 'Start registration'}</p>
                <h3 className="mt-2 text-[1.15rem] font-semibold text-slate-950">
                  {vi ? 'Điền thông tin và mối quan tâm của bạn' : 'Tell us about your interests'}
                </h3>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">{vi ? 'Họ tên, email, số điện thoại' : 'Name, email, phone number'}</div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">{vi ? 'Sản phẩm quan tâm và khung thời gian' : 'Products of interest and time frame'}</div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">{vi ? 'Nút “Gửi yêu cầu”' : 'Send request button'}</div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href={`/${locale}/contact`} className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white">
                    {vi ? 'Liên hệ' : 'Contact'}
                  </Link>
                  <Link href={`/${locale}/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen`} className="rounded-full border border-[rgba(36,69,140,0.18)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
                    {vi ? 'Xem giao dịch trực tuyến' : 'View online trading'}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export function BrokerageFinancialPage({ locale }: { locale: string }) {
  const vi = isVi(locale);
  return (
    <>
      <PageHero
        kicker={vi ? 'Sản phẩm & Dịch vụ' : 'Products & Services'}
        title={vi ? 'Dịch vụ tài chính' : 'Financial services'}
        subtitle={
          vi
            ? 'Các giải pháp hỗ trợ tài chính dành cho nhà đầu tư chứng khoán, tập trung vào ký quỹ và ứng trước tiền bán.'
            : 'Financial support products for securities investors, focused on margin and advance-cash services.'
        }
        highlights={vi ? ['Giao dịch ký quỹ', 'Ứng trước tiền bán', 'Lãi suất ưu đãi'] : ['Margin lending', 'Cash advance', 'Preferential rates']}
        imageUrl={SHINHAN_VISUALS.services.brokerage.hero}
      />

      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
          <InsightRail
            eyebrow={vi ? 'Ưu tiên cho mục tiêu sinh lợi' : 'Prioritize your return goal'}
            title={vi ? 'Tại Chứng khoán Shinhan, chúng tôi giúp mọi người tự trồng cây xanh' : 'Helping investors grow with discipline'}
            description={
              vi
                ? 'Nội dung gốc nhấn mạnh cách tiếp cận tài chính có kỷ luật, ưu tiên mục tiêu sinh lợi của khách hàng.'
                : 'The original page frames financial services around disciplined growth and investor return goals.'
            }
            items={[
              {
                meta: vi ? 'Rate' : 'Rate',
                title: vi ? 'Lãi suất cạnh tranh' : 'Competitive rates',
                description: vi ? 'Công bố theo từng thời điểm và phù hợp từng sản phẩm.' : 'Published by product and reviewed periodically.'
              },
              {
                meta: vi ? 'Limit' : 'Limit',
                title: vi ? 'Hạn mức tốt' : 'Flexible limits',
                description: vi ? 'Hạn mức và thời hạn cho vay đáp ứng nhu cầu giao dịch.' : 'Limits and terms aligned to trading needs.'
              },
              {
                meta: vi ? 'Access' : 'Access',
                title: vi ? 'Đăng ký dễ dàng' : 'Easy registration',
                description: vi ? 'Dễ dàng đăng ký và theo dõi dịch vụ.' : 'Simple registration and service tracking.'
              }
            ]}
          />

          <section className="subpage-panel grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="subpage-eyebrow">{vi ? 'Dịch vụ Giao Dịch Ký Quỹ' : 'Margin trading service'}</p>
              <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                {vi ? 'Sản phẩm hỗ trợ tài chính cho vay để đầu tư chứng khoán' : 'A financing product for securities investment'}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {vi
                  ? 'Khách hàng có thể vay trên giá trị tài sản đang có trong tài khoản với tài sản đảm bảo là cổ phiếu nằm trong danh mục cho phép.'
                  : 'Investors can borrow against current portfolio value, using eligible stocks as collateral.'}
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <DownloadCard title={vi ? 'Hướng dẫn sử dụng' : 'How to use'} summary={vi ? 'Xem chi tiết quy trình sử dụng dịch vụ.' : 'Detailed service workflow.'} href={`/${locale}/support/dang-ky-giao-dich-ky-quy.html`} />
                <DownloadCard title={vi ? 'Danh mục cổ phiếu ký quỹ' : 'Marginable stocks'} summary={vi ? 'Danh mục cập nhật theo từng thời điểm.' : 'Updated list of approved stocks.'} href={`/${locale}/support/thong-bao.html`} />
              </div>
            </div>

            <div className="subpage-soft-card p-4 md:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{vi ? 'Điều kiện chính' : 'Key terms'}</p>
              <div className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
                <p>{vi ? 'Khách hàng cần có tài khoản giao dịch chứng khoán tại SSV.' : 'Customer must have an SSV trading account.'}</p>
                <p>{vi ? 'Lãi suất cho vay hiện hành được công bố theo từng thời điểm.' : 'Current lending rate is disclosed by period.'}</p>
                <p>{vi ? 'Thời hạn vay không quá 90 ngày, có thể gia hạn theo quy định.' : 'Loan term up to 90 days with extension per policy.'}</p>
                <p>{vi ? 'Lệnh gọi bổ sung thực hiện qua điện thoại, SMS, email hoặc văn bản.' : 'Margin call notices via phone, SMS, email, or notice.'}</p>
              </div>
            </div>
          </section>

          <section className="subpage-panel">
            <div className="max-w-3xl">
              <p className="subpage-eyebrow">{vi ? 'Dịch vụ Ứng Trước Tiền Bán' : 'Cash advance service'}</p>
              <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                {vi ? 'Ứng trước một phần hay toàn bộ tiền bán trước khi tiền về tài khoản' : 'Advance part or all of sale proceeds before they settle'}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {vi
                  ? 'Dành cho khách hàng cần nguồn vốn lớn, không bị giới hạn về danh mục và tỷ lệ đầu tư.'
                  : 'For customers who need capital flexibility without being constrained by portfolio allocation.'}
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <ChecklistCard
                title={vi ? 'Điều kiện & thời hạn' : 'Terms and timing'}
                items={
                  vi
                    ? ['Giao dịch bán đã khớp lệnh và đang chờ tiền về', 'Lãi suất công bố theo từng thời điểm', 'Hoàn ứng khi tiền bán về tài khoản']
                    : ['Sale order matched and waiting for settlement', 'Interest rate announced periodically', 'Repayment when sale proceeds settle']
                }
              />
              <ChecklistCard
                title={vi ? 'Cách giải ngân' : 'Disbursement'}
                items={
                  vi
                    ? ['Đăng ký ứng trước online', 'Tiền và phí được trích tự động sau T+2', 'Dành cho khách hàng cần vốn ngắn hạn']
                    : ['Register the advance online', 'Funds and fees deducted automatically after T+2', 'Designed for short-term liquidity needs']
                }
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export function SanXinHaPage({ locale }: { locale: string }) {
  const vi = isVi(locale);
  return (
    <>
      <PageHero
        kicker={vi ? 'Ứng dụng đầu tư chứng khoán' : 'Stock investing app'}
        title={vi ? 'San Xịn Ha' : 'San Xin Ha'}
        subtitle={
          vi
            ? 'Ứng dụng đầu tư đột phá với ưu đãi giao dịch, AI Signal và trải nghiệm giao dịch đa nền tảng.'
            : 'A breakthrough investing app with trading perks, AI Signal, and multi-platform access.'
        }
        highlights={vi ? ['Miễn phí giao dịch', 'AI Signal', 'Đa tiện ích'] : ['Free trading', 'AI Signal', 'Multi-tool access']}
        imageUrl={SHINHAN_VISUALS.support.hero}
      />

      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
          <InsightRail
            eyebrow={vi ? 'Ra mắt ứng dụng mới' : 'New app launch'}
            title={vi ? 'San Xin Ha là trợ thủ mạnh mẽ và người bạn đồng hành tin cậy' : 'San Xin Ha is a powerful assistant and reliable companion'}
            description={
              vi
                ? 'Từ bản công bố gốc, ứng dụng tập trung vào lợi thế AI, phí ưu đãi và trải nghiệm đầu tư thông minh.'
                : 'The source page emphasizes AI-driven insights, trading perks, and a smart investor journey.'
            }
            items={[
              {
                meta: 'Perk',
                title: vi ? 'Miễn phí giao dịch trọn đời' : 'Free trading for life',
                description: vi ? 'Ưu đãi chi phí giúp tối ưu hóa lợi nhuận đầu tư.' : 'A cost advantage designed to improve investor returns.'
              },
              {
                meta: 'Margin',
                title: vi ? 'Ưu đãi margin hấp dẫn' : 'Margin incentives',
                description: vi ? 'Khuyến khích giao dịch với lãi vay ưu đãi theo thời hạn.' : 'Supportive borrowing terms tied to campaign periods.'
              },
              {
                meta: 'AI',
                title: vi ? 'Signal đầu tư thông minh' : 'Smart investment signals',
                description: vi ? 'Gợi ý thời điểm mua bán tối ưu, nhanh và chính xác.' : 'Actionable buy/sell timing guidance, fast and precise.'
              }
            ]}
          />

          <section className="subpage-panel grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-72 overflow-hidden rounded-[1.25rem] border border-white/70 bg-white shadow-[0_18px_34px_-26px_rgba(15,27,85,0.35)]">
              <Image src={SHINHAN_VISUALS.services.trading} alt={vi ? 'San Xin Ha' : 'San Xin Ha'} fill className="object-cover" sizes="(max-width: 768px) 100vw, 42vw" />
            </div>
            <div>
              <p className="subpage-eyebrow">{vi ? 'Ưu đãi không giới hạn' : 'Unlimited perks'}</p>
              <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                {vi ? 'Trải nghiệm giao dịch với nhiều ưu đãi nổi bật' : 'Trade with standout incentives'}
              </h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <DownloadCard title={vi ? 'Miễn lãi margin 60 ngày' : '60-day margin free period'} summary={vi ? '0% lãi vay margin trong 60 ngày đầu.' : '0% margin interest for the first 60 days.'} href={`/${locale}/support/dang-ky-giao-dich-ky-quy.html`} />
                <DownloadCard title={vi ? 'Giảm 2% lãi vay' : '2% interest reduction'} summary={vi ? 'Áp dụng theo chiến dịch đến hết năm 2025.' : 'Campaign-based rate reduction through 2025.'} href={`/${locale}/support/chuong-trinh-uu-dai`} />
                <DownloadCard title={vi ? 'Mở tài khoản số đẹp' : 'Lucky account number'} summary={vi ? 'Tùy chọn số tài khoản yêu thích.' : 'Choose your preferred account number.'} href={`/${locale}/support/mo-tai-khoan-truc-tuyen.html`} />
                <DownloadCard title={vi ? 'Quà tặng lên tới 2.500.000 VNĐ' : 'Gifts up to 2.5M VND'} summary={vi ? 'Tặng công cụ đầu tư và ưu đãi giới thiệu.' : 'App benefits and referral gifts.'} href={`/${locale}/support/chuong-trinh-uu-dai`} />
              </div>
            </div>
          </section>

          <section className="subpage-panel">
            <div className="max-w-3xl">
              <p className="subpage-eyebrow">{vi ? 'Giao dịch đa kênh' : 'Cross-platform trading'}</p>
              <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                {vi ? 'Mobile, desktop và web trong một hệ sinh thái' : 'Mobile, desktop, and web in one ecosystem'}
              </h2>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <PlatformCard
                icon={SHINHAN_VISUALS.services.platforms.mts}
                title={vi ? 'Ứng dụng giao dịch Mobile' : 'Mobile app'}
                description={vi ? 'Thiết kế trực quan, thân thiện, mượt mà.' : 'A friendly, intuitive, smooth experience.'}
                href={`/${locale}/services/moi-gioi-chung-khoan/he-thong-giao-dich.html`}
                cta={vi ? 'Truy cập ngay' : 'Open now'}
              />
              <PlatformCard
                icon={SHINHAN_VISUALS.services.platforms.hts}
                title={vi ? 'Phần mềm máy tính' : 'Desktop software'}
                description={vi ? 'Dành cho thao tác chuyên sâu và biểu đồ nâng cao.' : 'For advanced workflows and richer charting.'}
                href={`/${locale}/services/moi-gioi-chung-khoan/he-thong-giao-dich.html`}
                cta={vi ? 'Tải phần mềm' : 'Download'}
              />
              <PlatformCard
                icon={SHINHAN_VISUALS.services.platforms.wts}
                title={vi ? 'Web Trading' : 'Web trading'}
                description={vi ? 'Truy cập qua trình duyệt, không cần cài đặt.' : 'Browser access with no installation required.'}
                href={`/${locale}/services/moi-gioi-chung-khoan/he-thong-giao-dich.html`}
                cta={vi ? 'Truy cập web' : 'Open web'}
              />
            </div>
          </section>

          <section className="subpage-panel">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="max-w-3xl">
                <p className="subpage-eyebrow">{vi ? 'Cần hỗ trợ thêm?' : 'Need more help?'}</p>
                <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                  {vi ? 'Để SSV đồng hành cùng bạn' : 'Let SSV guide you'}
                </h2>
              </div>
              <Link href={`/${locale}/contact`} className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white">
                {vi ? 'Mở tài khoản ngay' : 'Open an account'}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
