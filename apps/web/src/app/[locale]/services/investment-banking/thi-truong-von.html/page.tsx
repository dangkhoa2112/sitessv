import type { Metadata } from 'next';
import { EquityMarketPage } from '@/components/services/InvestmentBankingPages';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: `/${locale}/services/investment-banking/thi-truong-von.html`,
    fallback: {
      title: locale === 'vi' ? 'Thị trường vốn' : 'Equity capital markets',
      description:
        locale === 'vi'
          ? 'Tư vấn giao dịch, M&A và chào bán phân phối cổ phần.'
          : 'Transaction advisory, M&A, and share distribution.'
    }
  });
}

export default async function EquityMarketEnRoute({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <EquityMarketPage locale={locale} />;
}
