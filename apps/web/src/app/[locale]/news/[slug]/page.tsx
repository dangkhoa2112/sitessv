import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContentCard } from '@/components/ui/ContentCard';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { RichText } from '@/components/ui/RichText';
import { TagChip } from '@/components/ui/TagChip';
import { getNewsBySlug, getRelatedContent } from '@/lib/cms-api';
import { articleJsonLd } from '@/lib/json-ld';
import { resolveLocalizedSlug } from '@/lib/localized-slug';
import { buildPageMetadata } from '@/lib/seo';
import { absoluteUrl, assetUrl } from '@/lib/urls';
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
  const article = await getNewsBySlug(locale, slug);
  const canonicalSlug = article?.slug || slug;

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/news/${canonicalSlug}`,
    seo: article?.seo,
    fallback: {
      title: article?.title,
      description: article?.summary
    }
  });
}

export default async function NewsDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const resolved = await resolveLocalizedSlug({ locale, slug, getBySlug: getNewsBySlug });
  if (resolved.redirectSlug) {
    permanentRedirect(`/${locale}/news/${resolved.redirectSlug}`);
  }

  const article = resolved.item;

  if (!article) notFound();
  const canonicalSlug = article.slug || slug;

  const related = await getRelatedContent(locale, 3);

  return (
    <>
      <JsonLd
        data={
          articleJsonLd({
            headline: article.title,
            description: article.summary,
            datePublished: article.publishDate,
            dateModified: article.updatedAt,
            authorName: article.author?.data?.attributes?.name,
            imageUrl: assetUrl(article.coverImage?.data?.attributes?.url),
            url: absoluteUrl(`/${locale}/news/${canonicalSlug}`)
          })
        }
      />
      <PageHero
        title={article.title}
        subtitle={article.summary}
        imageUrl={assetUrl(article.coverImage?.data?.attributes?.url) || SHINHAN_VISUALS.services.research.hero}
        contentWidth="narrow"
      />
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--narrow">
          <Breadcrumbs
            items={[
              { label: locale === 'vi' ? 'Trang chủ' : 'Home', href: `/${locale}` },
              { label: locale === 'vi' ? 'Tin tức' : 'News', href: `/${locale}/news` },
              { label: article.title, href: `/${locale}/news/${canonicalSlug}` }
            ]}
          />
          <div className="mt-3 grid gap-3 rounded-[1.25rem] border border-[rgba(36,69,140,0.12)] bg-white/85 p-4 text-sm text-slate-700 md:grid-cols-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{locale === 'vi' ? 'Ngày đăng' : 'Published'}</p>
              <p className="mt-1 font-medium text-slate-900">{formatDate(locale, article.publishDate)}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{locale === 'vi' ? 'Tác giả' : 'Author'}</p>
              <p className="mt-1 font-medium text-slate-900">{article.author?.data?.attributes?.name || 'Shinhan Securities'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{locale === 'vi' ? 'Cập nhật' : 'Updated'}</p>
              <p className="mt-1 font-medium text-slate-900">{formatDate(locale, article.updatedAt || article.publishDate)}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(article.tags?.data || []).map((tag: any) => (
              <TagChip key={tag.attributes.slug} label={tag.attributes.name} />
            ))}
          </div>
          <article className="subpage-glass-card subpage-prose-card">
            <RichText html={article.content} />
          </article>

          <section className="subpage-section">
            <h2 className="subpage-section-title">{locale === 'vi' ? 'Nội dung liên quan' : 'Related content'}</h2>
            <div className="grid gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{locale === 'vi' ? 'Tin tức thị trường' : 'Market news'}</p>
                <div className="mt-3 grid gap-4 md:grid-cols-3">
                  {(related.news || []).map((item: any) => (
                    <ContentCard
                      key={item.attributes.slug}
                      title={item.attributes.title}
                      summary={item.attributes.summary}
                      href={`/${locale}/news/${item.attributes.slug}`}
                      date={item.attributes.publishDate}
                      locale={locale}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{locale === 'vi' ? 'Báo cáo & phân tích' : 'Research & analysis'}</p>
                <div className="mt-3 grid gap-4 md:grid-cols-3">
                  {(related.research || []).map((item: any) => (
                    <ContentCard
                      key={item.attributes.slug}
                      title={item.attributes.title}
                      summary={item.attributes.summary}
                      href={`/${locale}/research/${item.attributes.slug}`}
                      date={item.attributes.publishDate}
                      locale={locale}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
