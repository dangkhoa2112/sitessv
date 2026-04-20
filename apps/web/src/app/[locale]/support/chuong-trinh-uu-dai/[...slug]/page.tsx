import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHero } from '@/components/ui/PageHero';
import { RichText } from '@/components/ui/RichText';
import { TagChip } from '@/components/ui/TagChip';
import { getEventBySlug } from '@/lib/cms-api';
import { buildPageMetadata } from '@/lib/seo';
import { assetUrl } from '@/lib/urls';

function normalizeSlug(slugParts: string[]) {
  const leaf = slugParts[slugParts.length - 1] || '';
  return leaf.replace(/\.html$/, '');
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const normalizedSlug = normalizeSlug(slug);
  const item = await getEventBySlug(locale, normalizedSlug);

  if (!item) return {};

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/support/chuong-trinh-uu-dai/${slug.join('/')}`,
    seo: item?.seo,
    fallback: {
      title: item?.title,
      description: item?.summary
    }
  });
}

export default async function SupportPromotionDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  const normalizedSlug = normalizeSlug(slug);
  const item = await getEventBySlug(locale, normalizedSlug);

  if (!item) notFound();

  const canonicalSlug = item.slug || normalizedSlug;
  if (canonicalSlug !== normalizedSlug) {
    permanentRedirect(`/${locale}/support/chuong-trinh-uu-dai/${canonicalSlug}`);
  }

  return (
    <>
      <PageHero title={item.title} subtitle={item.summary} imageUrl={assetUrl(item.coverImage?.data?.attributes?.url)} contentWidth="narrow" />
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--narrow">
          <Breadcrumbs
            items={[
              { label: locale === 'vi' ? 'Trang chủ' : 'Home', href: `/${locale}` },
              { label: locale === 'vi' ? 'Hỗ trợ khách hàng' : 'Support', href: `/${locale}/support` },
              { label: locale === 'vi' ? 'Chương trình ưu đãi' : 'Promotions', href: `/${locale}/support/chuong-trinh-uu-dai` },
              { label: item.title, href: `/${locale}/support/chuong-trinh-uu-dai/${canonicalSlug}` }
            ]}
          />

          <div className="subpage-glass-card mt-3 p-4 text-sm text-slate-700">
            <p>
              <strong>{locale === 'vi' ? 'Địa điểm:' : 'Location:'}</strong> {item.location}
            </p>
            <p className="mt-1">
              <strong>{locale === 'vi' ? 'Trạng thái:' : 'Status:'}</strong> {item.status}
            </p>
            {item.registrationUrl ? (
              <a href={item.registrationUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-semibold text-[var(--color-primary)]">
                {locale === 'vi' ? 'Tìm hiểu thêm' : 'Learn more'}
              </a>
            ) : null}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {(item.tags?.data || []).map((tag: any) => (
              <TagChip key={tag.attributes.slug} label={tag.attributes.name} />
            ))}
          </div>

          <article className="subpage-glass-card subpage-prose-card">
            <RichText html={item.content} />
          </article>
        </div>
      </div>
    </>
  );
}
