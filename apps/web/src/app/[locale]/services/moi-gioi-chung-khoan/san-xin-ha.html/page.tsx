import type { Metadata } from 'next';
import { SanXinHaPage } from '@/components/services/BrokerageProductPages';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: `/${locale}/services/moi-gioi-chung-khoan/san-xin-ha.html`,
    fallback: {
      title: locale === 'vi' ? 'San Xin Ha' : 'San Xin Ha',
      description:
        locale === 'vi'
          ? 'Ứng dụng đầu tư chứng khoán với ưu đãi và AI signal.'
          : 'An investing app with perks and AI signal.'
    }
  });
}

export default async function SanXinHaProductPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SanXinHaPage locale={locale} />;
}
