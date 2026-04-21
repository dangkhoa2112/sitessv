'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { buildLocalePath, switchLocalePath } from '@/lib/localized-routes';
import { SITE_NAME } from '@/lib/constants';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';
import { SHINHAN_BRAND_LINKS } from '@/lib/shinhan-links';

type LinkItem = {
  label: string;
  href: string;
  children?: LinkItem[];
};

type HeaderProps = {
  locale: string;
  items?: LinkItem[];
  primaryButton?: { label: string; href: string };
};

function isExternalLink(href: string) {
  return href.startsWith('http://') || href.startsWith('https://');
}

function HeaderLink({
  href,
  className,
  children,
  onClick
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  if (isExternalLink(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer" onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function defaultNav(locale: string): LinkItem[] {
  if (locale === 'vi') {
    const route = (path: string) => buildLocalePath(locale, path);

    return [
      { label: 'Giới thiệu', href: route('/about') },
      {
        label: 'Sản phẩm & dịch vụ',
        href: route('/services'),
        children: [
          { label: 'Môi Giới Chứng Khoán', href: route('/services/moi-gioi-chung-khoan') },
          { label: 'Giao dịch trực tuyến', href: route('/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html') },
          { label: 'Tư vấn đầu tư', href: route('/services/moi-gioi-chung-khoan/tu-van-dau-tu.html') },
          { label: 'Dịch vụ tài chính', href: route('/services/moi-gioi-chung-khoan/dich-vu-tai-chinh.html') },
          { label: 'Ngân hàng đầu tư', href: route('/services/ngan-hang-dau-tu') }
        ]
      },
      { label: 'Trung tâm phân tích', href: route('/research') },
      { label: 'Hỗ trợ khách hàng', href: route('/support') }
    ];
  }

  return [
    { label: 'About', href: '/en/about' },
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
    { label: 'Research Center', href: '/en/research' },
    { label: 'Customer Support', href: '/en/support' }
  ];
}

export function Header({ locale, items = [], primaryButton }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navItems = useMemo(() => (items.length > 0 && items.length <= 4 ? items : defaultNav(locale)), [items, locale]);
  const viPath = switchLocalePath(pathname || '/', 'vi');
  const enPath = switchLocalePath(pathname || '/', 'en');
  const tradeLabel = locale === 'vi' ? 'Giao dịch' : 'Trading';
  const tradeHref = SHINHAN_BRAND_LINKS.trading.web;
  const accountButton =
    primaryButton?.href && isExternalLink(primaryButton.href)
      ? primaryButton
      : {
          label: locale === 'vi' ? 'Mở tài khoản' : 'Open account',
          href: SHINHAN_BRAND_LINKS.trading.login
        };

  return (
    <header className="sticky top-0 z-50 shadow-[0_1px_0_0_rgba(20,35,104,0.18)]">
      <div className="hidden bg-[var(--color-primary)] text-white lg:block">
        <div className="shinhan-container flex h-10 items-center justify-end gap-4 text-[13px]">
          <a href={SHINHAN_BRAND_LINKS.contact.hotlineTel} className="font-medium hover:opacity-90">
            Hotline: <strong className="ml-2 text-[15px]">{SHINHAN_BRAND_LINKS.contact.hotlineLabel}</strong>
          </a>
          <div className="h-5 w-px bg-white/25" />
          <div className="flex items-center gap-2">
            <span className="text-white/80">{locale === 'vi' ? 'Ngôn ngữ:' : 'Language:'}</span>
            <Link href={viPath} className={`rounded px-2 py-0.5 ${locale === 'vi' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
              VN
            </Link>
            <Link href={enPath} className={`rounded px-2 py-0.5 ${locale === 'en' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
              EN
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="shinhan-container flex h-[4.9rem] items-center justify-between">
          <Link href={`/${locale}`} className="flex shrink-0 items-center">
            <Image src={SHINHAN_VISUALS.brand.logo} alt={SITE_NAME} width={276} height={46} className="h-8 w-auto md:h-10" priority />
          </Link>

          <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <div key={item.href} className="group relative">
                <HeaderLink
                  href={item.href}
                  className="whitespace-nowrap text-[15px] font-medium text-[#212121] transition hover:text-[var(--color-primary)]"
                >
                  {item.label}
                </HeaderLink>
                {item.children?.length ? (
                  <div className="invisible absolute left-1/2 top-[calc(100%+16px)] z-30 min-w-72 -translate-x-1/2 rounded-none border border-[#e4e4e4] bg-white py-3 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {item.children.map((child) => (
                      <HeaderLink
                        key={child.href}
                        href={child.href}
                        className="block px-5 py-2 text-[14px] text-[#1e1e1e] transition hover:bg-[#f6f8ff] hover:text-[var(--color-primary)]"
                      >
                        {child.label}
                      </HeaderLink>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <a
              href={tradeHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[42px] items-center rounded-[6px] border border-[var(--color-accent)] bg-white px-6 text-[15px] font-medium text-[var(--color-accent)] transition hover:bg-[#fff8ee] hover:text-[#b88743]"
            >
              {tradeLabel}
            </a>
            <a
              href={accountButton.href}
              target={isExternalLink(accountButton.href) ? '_blank' : undefined}
              rel={isExternalLink(accountButton.href) ? 'noreferrer' : undefined}
              className="inline-flex h-[42px] items-center rounded-[6px] border border-[var(--color-accent)] bg-[var(--color-primary)] px-6 text-[15px] font-medium text-[var(--color-accent)] transition hover:bg-[var(--color-primary-strong)] hover:text-[#f1cd8f]"
            >
              {accountButton.label}
            </a>
          </div>

          <button
            type="button"
            className="inline-flex items-center rounded-[6px] border border-[var(--color-primary)] px-3 py-2 text-sm font-medium text-[var(--color-primary)] xl:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? 'Đóng' : 'Menu'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="border-t border-[#d9d9d9] bg-white xl:hidden"
          >
            <div className="shinhan-container space-y-3 py-4">
              <div className="flex items-center justify-between rounded-md bg-[#f4f7ff] p-3 text-sm">
                <a href={SHINHAN_BRAND_LINKS.contact.hotlineTel} className="text-[var(--color-primary)]">
                  {SHINHAN_BRAND_LINKS.contact.hotlineLabel}
                </a>
                <div className="flex items-center gap-2 text-xs">
                  <Link href={viPath} className={`rounded px-2 py-1 ${locale === 'vi' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[#1e1e1e]'}`}>
                    VN
                  </Link>
                  <Link href={enPath} className={`rounded px-2 py-1 ${locale === 'en' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[#1e1e1e]'}`}>
                    EN
                  </Link>
                </div>
              </div>

              {navItems.map((item) => (
                <div key={item.href} className="rounded-md border border-[#ececec] px-3 py-2">
                  <HeaderLink
                    href={item.href}
                    className="block py-1 text-[15px] font-medium text-[#111]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </HeaderLink>
                  {item.children?.length ? (
                    <div className="mt-1 border-t border-[#f1f1f1] pt-1">
                      {item.children.map((child) => (
                        <HeaderLink
                          key={child.href}
                          href={child.href}
                          className="block rounded px-2 py-1 text-[14px] text-[#4b4b4b]"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </HeaderLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={tradeHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--color-accent)] bg-white text-sm font-medium text-[var(--color-accent)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {tradeLabel}
                </a>
                <a
                  href={accountButton.href}
                  target={isExternalLink(accountButton.href) ? '_blank' : undefined}
                  rel={isExternalLink(accountButton.href) ? 'noreferrer' : undefined}
                  className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--color-accent)] bg-[var(--color-primary)] text-sm font-medium text-[var(--color-accent)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {accountButton.label}
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
