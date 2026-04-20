import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContentCard } from '@/components/ui/ContentCard';
import { PageHero } from '@/components/ui/PageHero';
import { RichText } from '@/components/ui/RichText';
import { TagChip } from '@/components/ui/TagChip';
import { getEventBySlug, listEvents } from '@/lib/cms-api';
import { resolveLocalizedSlug } from '@/lib/localized-slug';
import { buildPageMetadata } from '@/lib/seo';
import { assetUrl } from '@/lib/urls';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

function formatDate(locale: string, value?: string) {
  if (!value) return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getEventBySlug(locale, slug);
  const canonicalSlug = item?.slug || slug;

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/events/${canonicalSlug}`,
    seo: item?.seo,
    fallback: {
      title: item?.title,
      description: item?.summary
    }
  });
}

export default async function EventDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const resolved = await resolveLocalizedSlug({ locale, slug, getBySlug: getEventBySlug });
  if (resolved.redirectSlug) {
    permanentRedirect(`/${locale}/events/${resolved.redirectSlug}`);
  }

  const item = resolved.item;

  if (!item) notFound();
  const canonicalSlug = item.slug || slug;
  const relatedEvents = await listEvents({ locale, page: 1, pageSize: 4 });

  return (
    <>
      <PageHero
        title={item.title}
        subtitle={item.summary}
        imageUrl={assetUrl(item.coverImage?.data?.attributes?.url) || SHINHAN_VISUALS.services.research.hero}
        contentWidth="narrow"
      />
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--narrow">
          <Breadcrumbs
            items={[
              { label: locale === 'vi' ? 'Trang chủ' : 'Home', href: `/${locale}` },
              { label: locale === 'vi' ? 'Sự kiện' : 'Events', href: `/${locale}/events` },
              { label: item.title, href: `/${locale}/events/${canonicalSlug}` }
            ]}
          />

          <div className="mt-3 grid gap-3 rounded-[1.25rem] border border-[rgba(36,69,140,0.12)] bg-white/85 p-4 text-sm text-slate-700 md:grid-cols-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{locale === 'vi' ? 'Thời gian' : 'Date'}</p>
              <p className="mt-1 font-medium text-slate-900">{formatDate(locale, item.startDate || item.publishDate)}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{locale === 'vi' ? 'Địa điểm' : 'Location'}</p>
              <p className="mt-1 font-medium text-slate-900">{item.location || '-'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{locale === 'vi' ? 'Trạng thái' : 'Status'}</p>
              <p className="mt-1 font-medium text-slate-900">{item.status || '-'}</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {(item.tags?.data || []).map((tag: any) => (
              <TagChip key={tag.attributes.slug} label={tag.attributes.name} />
            ))}
          </div>

          <article className="subpage-glass-card subpage-prose-card">
            <RichText html={item.content} />
          </article>

          <section className="subpage-section">
            <h2 className="subpage-section-title">{locale === 'vi' ? 'Sự kiện khác' : 'More events'}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {(relatedEvents.items || [])
                .filter((relatedItem: any) => relatedItem.attributes.slug !== canonicalSlug)
                .slice(0, 3)
                .map((relatedItem: any) => (
                  <ContentCard
                    key={relatedItem.id}
                    title={relatedItem.attributes.title}
                    summary={relatedItem.attributes.summary}
                    href={`/${locale}/events/${relatedItem.attributes.slug}`}
                    date={relatedItem.attributes.startDate || relatedItem.attributes.publishDate}
                    locale={locale}
                  />
                ))}
            </div>
          </section>

          {item.registrationUrl ? (
            <section className="subpage-section">
              <div className="subpage-glass-card flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{locale === 'vi' ? 'Đăng ký tham dự' : 'Registration'}</p>
                  <p className="mt-1 text-sm text-slate-700">
                    {locale === 'vi'
                      ? 'Nếu sự kiện còn mở đăng ký, bạn có thể chuyển sang trang đăng ký ngay.'
                      : 'If registration is open, you can jump to the registration page now.'}
                  </p>
                </div>
                <Link href={item.registrationUrl} target="_blank" className="inline-flex rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white">
                  {locale === 'vi' ? 'Đăng ký tham dự' : 'Register'}
                </Link>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
}
