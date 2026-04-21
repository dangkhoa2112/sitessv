import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LocaleLangSync } from '@/components/layout/LocaleLangSync';
import { FloatingQuickPanel } from '@/components/home/FloatingQuickPanel';
import { getLayout } from '@/lib/cms-api';
import { JsonLd } from '@/components/ui/JsonLd';
import { organizationJsonLd, websiteJsonLd } from '@/lib/json-ld';
import { SHINHAN_BRAND_LINKS } from '@/lib/shinhan-links';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const layout = await getLayout(locale);
  const quickPanel =
    locale === 'vi'
      ? {
          title: 'Đây là lần đầu bạn ghé thăm?',
          quickLinks: [
            { label: 'Hướng dẫn mở tài khoản online', href: `/${locale}/support/mo-tai-khoan-truc-tuyen.html` },
            { label: 'Hướng dẫn giao dịch', href: `/${locale}/support/huong-dan-giao-dich.html` },
            { label: 'Hướng dẫn nộp & rút tiền', href: `/${locale}/services/moi-gioi-chung-khoan/dich-vu-tai-chinh.html` },
            { label: 'Danh mục khuyến nghị', href: `/${locale}/research` }
          ],
          shortcuts: [
            { label: 'Mobile Trading', href: `/${locale}/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html` },
            { label: 'Web Trading', href: SHINHAN_BRAND_LINKS.trading.web }
          ],
          shortcutTitle: 'Shortcut'
        }
      : {
          title: 'Is this your first visit?',
          quickLinks: [
            { label: 'Online account guide', href: `/${locale}/support/mo-tai-khoan-truc-tuyen.html` },
            { label: 'Trading guide', href: `/${locale}/support/huong-dan-giao-dich.html` },
            { label: 'Deposit & withdraw guide', href: `/${locale}/services/moi-gioi-chung-khoan/dich-vu-tai-chinh.html` },
            { label: 'Recommended portfolio', href: `/${locale}/research` }
          ],
          shortcuts: [
            { label: 'Mobile Trading', href: `/${locale}/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html` },
            { label: 'Web Trading', href: SHINHAN_BRAND_LINKS.trading.web }
          ],
          shortcutTitle: 'Shortcut'
        };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleLangSync locale={locale} />
      <JsonLd data={layout.seoDefault?.organizationSchema || organizationJsonLd(locale, layout.global)} />
      <JsonLd data={websiteJsonLd(locale)} />
      <div className="flex min-h-screen flex-col">
        <Header
          locale={locale}
          items={layout.header?.items || []}
          primaryButton={layout.header?.primaryButton || undefined}
        />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <FloatingQuickPanel
          title={quickPanel.title}
          quickLinks={quickPanel.quickLinks}
          shortcuts={quickPanel.shortcuts}
          shortcutTitle={quickPanel.shortcutTitle}
          openLabel={locale === 'vi' ? 'Mở menu nhanh' : 'Open quick menu'}
          closeLabel={locale === 'vi' ? 'Thu gọn menu nhanh' : 'Collapse quick menu'}
          variant="ultra-minimal"
        />
        <Footer
          locale={locale}
          columns={layout.footer?.columns || []}
          legalLinks={layout.footer?.legalLinks || []}
          copyrightText={layout.footer?.copyrightText}
        />
      </div>
    </NextIntlClientProvider>
  );
}
