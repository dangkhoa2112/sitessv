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
    pathname: `/${locale}/services/moi-gioi-chung-khoan/he-thong-giao-dich.html`,
    fallback: {
      title: locale === 'vi' ? 'Hệ thống giao dịch' : 'Trading system',
      description:
        locale === 'vi'
          ? 'Giao dịch qua ứng dụng mobile, web trading và phần mềm desktop.'
          : 'Mobile, web, and desktop trading experiences.'
    }
  });
}

export default async function TradingSystemPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <BrokerageTradingPage locale={locale} />;
}
