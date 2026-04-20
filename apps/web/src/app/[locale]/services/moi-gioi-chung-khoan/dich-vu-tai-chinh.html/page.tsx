import type { Metadata } from 'next';
import { BrokerageFinancialPage } from '@/components/services/BrokerageProductPages';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: `/${locale}/services/moi-gioi-chung-khoan/dich-vu-tai-chinh.html`,
    fallback: {
      title: locale === 'vi' ? 'Dịch vụ tài chính' : 'Financial services',
      description:
        locale === 'vi'
          ? 'Giao dịch ký quỹ và ứng trước tiền bán cho nhà đầu tư.'
          : 'Margin and cash-advance products for investors.'
    }
  });
}

export default async function FinancialServicesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <BrokerageFinancialPage locale={locale} />;
}
