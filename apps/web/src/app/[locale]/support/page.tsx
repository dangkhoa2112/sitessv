import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SupportCenterPage } from '@/components/support/SupportCenterPage';
import { buildPageMetadata } from '@/lib/seo';
import { getPageBySlug } from '@/lib/cms-api';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = await getPageBySlug(locale, 'support');

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/support`,
    seo: page?.seo,
    fallback: {
      title: page?.title,
      description: page?.summary
    }
  });
}

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getPageBySlug(locale, 'support');

  if (!page) notFound();

  return <SupportCenterPage locale={locale} page={page} />;
}
