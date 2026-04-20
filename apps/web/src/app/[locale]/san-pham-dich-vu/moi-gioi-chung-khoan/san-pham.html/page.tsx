import type { Metadata } from 'next';
import { BrokerageLandingPage } from '@/components/services/BrokerageLandingPage';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/san-pham-dich-vu/moi-gioi-chung-khoan/san-pham.html`,
    fallback: {
      title: locale === 'vi' ? 'Môi giới chứng khoán' : 'Securities brokerage',
      description:
        locale === 'vi'
          ? 'Trang dịch vụ môi giới chứng khoán, giao dịch trực tuyến, tư vấn đầu tư và tài chính.'
          : 'Brokerage landing page covering online trading, advisory, and financing.'
    }
  });
}

export default async function BrokerageProductPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <BrokerageLandingPage locale={locale} />;
}
