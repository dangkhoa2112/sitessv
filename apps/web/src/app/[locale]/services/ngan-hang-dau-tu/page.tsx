import type { Metadata } from 'next';
import { InvestmentBankingLandingPage } from '@/components/services/InvestmentBankingPages';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: `/${locale}/services/ngan-hang-dau-tu`,
    fallback: {
      title: locale === 'vi' ? 'Ngân hàng đầu tư' : 'Investment banking',
      description:
        locale === 'vi'
          ? 'Thị trường vốn và thị trường nợ cho doanh nghiệp.'
          : 'Equity and debt capital markets for businesses.'
    }
  });
}

export default async function InvestmentBankingPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <InvestmentBankingLandingPage locale={locale} />;
}
