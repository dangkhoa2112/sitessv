import type { Metadata } from 'next';
import { DebtMarketPage } from '@/components/services/InvestmentBankingPages';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: `/${locale}/services/investment-banking/thi-truong-no.html`,
    fallback: {
      title: locale === 'vi' ? 'Thị trường nợ' : 'Debt capital markets',
      description:
        locale === 'vi'
          ? 'Tư vấn và thu xếp vốn trung - dài hạn.'
          : 'Advisory and funding for medium- and long-term capital needs.'
    }
  });
}

export default async function DebtMarketEnRoute({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <DebtMarketPage locale={locale} />;
}
