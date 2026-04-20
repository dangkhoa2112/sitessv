import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/ui/JsonLd';
import { AboutReferenceLayout } from '@/components/about/AboutReferenceLayout';
import { buildPageMetadata } from '@/lib/seo';
import { getPageBySlug } from '@/lib/cms-api';
import { breadcrumbJsonLd } from '@/lib/json-ld';
import { absoluteUrl } from '@/lib/urls';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = await getPageBySlug(locale, 'about');

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/about`,
    seo: page?.seo,
    fallback: {
      title: page?.title,
      description: page?.summary
    }
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getPageBySlug(locale, 'about');

  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: locale === 'vi' ? 'Trang chủ' : 'Home', url: absoluteUrl(`/${locale}`) },
          { name: locale === 'vi' ? 'Giới thiệu' : 'About', url: absoluteUrl(`/${locale}/about`) }
        ])}
      />
      <AboutReferenceLayout locale={locale} page={page} />
    </>
  );
}
