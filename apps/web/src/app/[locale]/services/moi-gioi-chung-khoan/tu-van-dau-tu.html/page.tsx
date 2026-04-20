import type { Metadata } from 'next';
import { BrokerageAdvisoryPage } from '@/components/services/BrokerageProductPages';
import { getServiceBySlug } from '@/lib/cms-api';
import { buildPageMetadata } from '@/lib/seo';

function advisoryServiceSlug(locale: string) {
  return locale === 'vi' ? 'tu-van-dau-tu' : 'investment-advisory';
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const service = await getServiceBySlug(locale, advisoryServiceSlug(locale));
  return buildPageMetadata({
    locale,
    pathname: `/${locale}/services/moi-gioi-chung-khoan/tu-van-dau-tu.html`,
    seo: service?.seo,
    fallback: {
      title: service?.title || (locale === 'vi' ? 'Tư vấn đầu tư chứng khoán' : 'Investment advisory'),
      description:
        service?.summary ||
        (locale === 'vi'
          ? 'Đăng ký tư vấn và gặp chuyên viên đồng hành đầu tư.'
          : 'Register for advisory support and meet an advisor.')
    }
  });
}

export default async function AdvisoryPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const service = await getServiceBySlug(locale, advisoryServiceSlug(locale));
  return <BrokerageAdvisoryPage locale={locale} service={service} />;
}
