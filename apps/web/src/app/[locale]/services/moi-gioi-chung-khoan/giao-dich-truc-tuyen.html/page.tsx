import type { Metadata } from 'next';
import { BrokerageTradingPage } from '@/components/services/BrokerageProductPages';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: `/${locale}/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html`,
    fallback: {
      title: locale === 'vi' ? 'Giao dịch trực tuyến' : 'Online trading',
      description:
        locale === 'vi'
          ? 'Nền tảng giao dịch trực tuyến San Xin Ha, web trading và desktop trading.'
          : 'Online trading platforms including San Xin Ha, web trading, and desktop trading.'
    }
  });
}

export default async function OnlineTradingPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <BrokerageTradingPage locale={locale} />;
}
