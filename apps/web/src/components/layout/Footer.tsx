import Link from 'next/link';
import Image from 'next/image';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';
import { SHINHAN_BRAND_LINKS } from '@/lib/shinhan-links';

type LinkItem = {
  label: string;
  href: string;
  children?: LinkItem[];
};

function isExternalLink(href: string) {
  return href.startsWith('http://') || href.startsWith('https://');
}

function FooterLink({
  href,
  className,
  children
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (isExternalLink(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function defaultColumns(locale: string): LinkItem[] {
  if (locale === 'vi') {
    return [
      {
        label: 'Sản phẩm & dịch vụ',
        href: '/vi/san-pham-dich-vu',
        children: [
          { label: 'Môi Giới Chứng Khoán', href: '/vi/san-pham-dich-vu/moi-gioi-chung-khoan' },
          { label: 'Giao dịch trực tuyến', href: '/vi/san-pham-dich-vu/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html' },
          { label: 'Tư vấn đầu tư', href: '/vi/san-pham-dich-vu/moi-gioi-chung-khoan/tu-van-dau-tu.html' },
          { label: 'Dịch Vụ Tài Chính', href: '/vi/san-pham-dich-vu/moi-gioi-chung-khoan/dich-vu-tai-chinh.html' },
          { label: 'Ngân hàng đầu tư', href: '/vi/san-pham-dich-vu/ngan-hang-dau-tu' }
        ]
      },
      {
        label: 'Trung Tâm Hỗ Trợ',
        href: '/vi/support',
        children: [
          { label: 'Hướng Dẫn Sử Dụng', href: '/vi/support' },
          { label: 'Thông báo', href: '/vi/news' },
          { label: 'Sự Kiện & Tin tức', href: '/vi/events' },
          { label: 'Chính sách bảo vệ thông tin', href: '/vi/phap-ly/chinh-sach-bao-mat' },
          { label: 'Quy định sử dụng dịch vụ SSV', href: '/vi/phap-ly/dieu-khoan-su-dung' }
        ]
      },
      {
        label: 'Truy cập nhanh',
        href: '/vi',
        children: [
          { label: 'Giới thiệu', href: '/vi/gioi-thieu' },
          { label: 'Nghề nghiệp', href: '/vi/nghe-nghiep' },
          { label: 'Liên hệ', href: '/vi/lien-he' },
          { label: 'Công bố thông tin', href: '/vi/news' }
        ]
      }
    ];
  }

  return [
    {
      label: 'Products & Services',
      href: '/en/services',
      children: [
        { label: 'Securities Brokerage', href: '/en/services/moi-gioi-chung-khoan' },
        { label: 'Online Trading', href: '/en/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html' },
        { label: 'Investment Advisory', href: '/en/services/moi-gioi-chung-khoan/tu-van-dau-tu.html' },
        { label: 'Financial Services', href: '/en/services/moi-gioi-chung-khoan/dich-vu-tai-chinh.html' },
        { label: 'Investment Banking', href: '/en/services/investment-banking' }
      ]
    },
    {
      label: 'Support Center',
      href: '/en/support',
      children: [
        { label: 'Service Guide', href: '/en/support' },
        { label: 'Announcements', href: '/en/news' },
        { label: 'Events & News', href: '/en/events' },
        { label: 'Data Protection Policy', href: '/en/legal/privacy-policy' },
        { label: 'Terms of Services', href: '/en/legal/terms-of-use' }
      ]
    },
    {
      label: 'Quick Access',
      href: '/en',
      children: [
        { label: 'About', href: '/en/about' },
        { label: 'Careers', href: '/en/careers' },
        { label: 'Contact', href: '/en/contact' },
        { label: 'Disclosures', href: '/en/news' }
      ]
    }
  ];
}

function defaultLegal(locale: string): LinkItem[] {
  if (locale === 'vi') {
    return [
      { label: 'Điều khoản sử dụng', href: '/vi/phap-ly/dieu-khoan-su-dung' },
      { label: 'Bảo mật và an toàn', href: '/vi/phap-ly/chinh-sach-bao-mat' },
      { label: 'Sơ đồ', href: '/sitemap.xml' },
      { label: 'Khuyến cáo', href: '/vi/phap-ly/mien-tru-trach-nhiem' }
    ];
  }

  return [
    { label: 'Terms of Use', href: '/en/legal/terms-of-use' },
    { label: 'Security & Privacy', href: '/en/legal/privacy-policy' },
    { label: 'Sitemap', href: '/sitemap.xml' },
    { label: 'Disclaimer', href: '/en/legal/disclaimer' }
  ];
}

export function Footer({
  locale = 'vi',
  columns = [],
  legalLinks = [],
  copyrightText
}: {
  locale?: string;
  columns?: LinkItem[];
  legalLinks?: LinkItem[];
  copyrightText?: string;
}) {
  const useProvidedColumns =
    columns.length > 0 && columns.some((column) => /sản phẩm|products/i.test(column.label));
  const useProvidedLegal = legalLinks.length > 0 && legalLinks.some((item) => /điều khoản|terms/i.test(item.label));
  const resolvedColumns = useProvidedColumns ? columns : defaultColumns(locale);
  const resolvedLegal = useProvidedLegal ? legalLinks : defaultLegal(locale);
  const resolvedCopyright =
    copyrightText && /shinhan securities vietnam/i.test(copyrightText)
      ? copyrightText
      : '© Copyright 2020 Shinhan Securities Vietnam';
  const labels =
    locale === 'en'
      ? {
          office: 'Head Office',
          branch: 'Ha Noi Branch',
          connect: 'Connect with us',
          legalTitle: 'Legal'
        }
      : {
          office: 'Trụ sở chính',
          branch: 'Chi nhánh Hà Nội',
          connect: 'Kết nối với chúng tôi',
          legalTitle: 'Pháp lý'
        };

  const socials = [
    {
      href: SHINHAN_BRAND_LINKS.social.facebook,
      icon: SHINHAN_VISUALS.brand.socials.facebook,
      alt: 'Facebook'
    },
    {
      href: SHINHAN_BRAND_LINKS.social.youtube,
      icon: SHINHAN_VISUALS.brand.socials.youtube,
      alt: 'Youtube'
    },
    {
      href: SHINHAN_BRAND_LINKS.social.linkedin,
      icon: SHINHAN_VISUALS.brand.socials.linkedin,
      alt: 'LinkedIn'
    },
    {
      href: SHINHAN_BRAND_LINKS.social.zalo,
      icon: SHINHAN_VISUALS.brand.socials.zalo,
      alt: 'Zalo'
    }
  ];

  return (
    <footer className="border-t border-[#d2deec] bg-[linear-gradient(180deg,#f3f7fc_0%,#edf3f9_50%,#e8eff7_100%)]">
      <div className="shinhan-container py-7 md:py-8">
        <div className="overflow-hidden rounded-[1.4rem] border border-[#d5e3f2] bg-white/74 shadow-[0_24px_48px_-36px_rgba(20,35,104,0.42)] backdrop-blur-md">
          <div className="grid gap-7 p-5 md:p-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
            <div className="lg:pr-5">
              <Image
                src={SHINHAN_VISUALS.brand.footerLogo}
                alt="Shinhan Securities Vietnam"
                width={300}
                height={53}
                className="h-auto w-56 md:w-60"
              />

              <div className="mt-4 space-y-1.5 text-[13px] leading-6 text-[#27384c] md:text-[14px]">
                <p>
                  <strong className="font-semibold text-[var(--color-primary)]">{labels.office}:</strong> Tầng 18, Tòa nhà The Mett, 15 Trần Bạch Đằng
                </p>
                <p>Phường An Khánh, TP. Hồ Chí Minh</p>
                <p>
                  <strong className="font-semibold text-[var(--color-primary)]">{labels.branch}:</strong> Tầng 2, Tòa nhà Leadvisors, Số 41A Lý Thái Tổ
                </p>
                <p>Phường Hoàn Kiếm, Hà Nội</p>
              </div>

              <ul className="mt-4 space-y-2 text-[13px] text-[#1f2f44] md:text-[14px]">
                <li>
                  <a
                    href={SHINHAN_BRAND_LINKS.contact.hotlineTel}
                    className="inline-flex items-center gap-2 rounded-full border border-transparent pr-2 transition hover:border-[#cde0f0] hover:bg-white/70 hover:text-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6aa9c6]"
                  >
                    <Image src={SHINHAN_VISUALS.brand.icons.call} alt="" width={27} height={27} />
                    {SHINHAN_BRAND_LINKS.contact.hotlineLabel}
                  </a>
                </li>
                <li>
                  <a
                    href={SHINHAN_BRAND_LINKS.contact.emailHref}
                    className="inline-flex items-center gap-2 rounded-full border border-transparent pr-2 transition hover:border-[#cde0f0] hover:bg-white/70 hover:text-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6aa9c6]"
                  >
                    <Image src={SHINHAN_VISUALS.brand.icons.mail} alt="" width={27} height={27} />
                    {SHINHAN_BRAND_LINKS.contact.email}
                  </a>
                </li>
              </ul>
            </div>

            {resolvedColumns.map((column) => (
              <div key={column.label}>
                <h3 className="text-[1.05rem] font-semibold tracking-tight text-[var(--color-primary)] md:text-[1.12rem]">
                  {column.label}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {(column.children || []).map((link) => (
                    <li key={link.href}>
                      <FooterLink
                        href={link.href}
                        className="inline-flex items-center rounded-md border border-transparent px-1 py-0.5 text-[13px] text-[#2b3d51] transition hover:border-[#d4e4f2] hover:bg-white/80 hover:text-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6aa9c6] md:text-[14px]"
                      >
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-[#d7e4f1] bg-[linear-gradient(90deg,#eef5fc_0%,#e8f1fa_100%)] px-5 py-3 md:px-6">
            <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4f6f8b] md:text-[12px]">
                {labels.connect}
              </p>
              <div className="flex items-center gap-2">
                {socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#c5d9ea] bg-white/85 transition hover:-translate-y-0.5 hover:border-[#90b6d0] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6aa9c6]"
                    aria-label={social.alt}
                  >
                    <Image src={social.icon} alt={social.alt} width={22} height={22} className="h-[18px] w-[18px] object-contain" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#0f1b55]/18 bg-[var(--color-primary)] py-3.5 text-white">
        <div className="shinhan-container">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] md:text-[13px]">
              <span className="font-semibold uppercase tracking-[0.08em] text-white/72">{labels.legalTitle}</span>
              {resolvedLegal.slice(0, 4).map((item) => (
                <FooterLink
                  key={item.href}
                  href={item.href}
                  className="rounded-sm text-white/90 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9ddaf0]"
                >
                  {item.label}
                </FooterLink>
              ))}
            </div>
            <p className="text-[12px] text-white/90 md:text-[13px]">{resolvedCopyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
