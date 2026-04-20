import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DownloadCard } from '@/components/ui/DownloadCard';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { RichText } from '@/components/ui/RichText';
import { TagChip } from '@/components/ui/TagChip';
import { getResearchBySlug } from '@/lib/cms-api';
import { articleJsonLd } from '@/lib/json-ld';
import { resolveLocalizedSlug } from '@/lib/localized-slug';
import { buildPageMetadata } from '@/lib/seo';
import { absoluteUrl, assetUrl } from '@/lib/urls';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const report = await getResearchBySlug(locale, slug);
  const canonicalSlug = report?.slug || slug;

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/research/${canonicalSlug}`,
    seo: report?.seo,
    fallback: {
      title: report?.title,
      description: report?.summary
    }
  });
}

export default async function ResearchDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const resolved = await resolveLocalizedSlug({ locale, slug, getBySlug: getResearchBySlug });
  if (resolved.redirectSlug) {
    permanentRedirect(`/${locale}/research/${resolved.redirectSlug}`);
  }

  const report = resolved.item;

  if (!report) notFound();
  const canonicalSlug = report.slug || slug;

  return (
    <>
      <JsonLd
        data={
          articleJsonLd({
            headline: report.title,
            description: report.summary,
            datePublished: report.publishDate,
            dateModified: report.updatedAt,
            authorName: report.author?.data?.attributes?.name,
            imageUrl: assetUrl(report.coverImage?.data?.attributes?.url),
            url: absoluteUrl(`/${locale}/research/${canonicalSlug}`)
          })
        }
      />
      <PageHero title={report.title} subtitle={report.summary} imageUrl={assetUrl(report.coverImage?.data?.attributes?.url)} contentWidth="narrow" />
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--narrow">
          <Breadcrumbs
            items={[
              { label: locale === 'vi' ? 'Trang chủ' : 'Home', href: `/${locale}` },
              { label: locale === 'vi' ? 'Nghiên cứu' : 'Research', href: `/${locale}/research` },
              { label: report.title, href: `/${locale}/research/${canonicalSlug}` }
            ]}
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {(report.tags?.data || []).map((tag: any) => (
              <TagChip key={tag.attributes.slug} label={tag.attributes.name} />
            ))}
          </div>

          <article className="subpage-glass-card subpage-prose-card">
            <RichText html={report.content} />
          </article>

          {report.documents?.data?.length ? (
            <section className="subpage-section">
              <h2 className="subpage-section-title">{locale === 'vi' ? 'Tài liệu tải về' : 'Downloads'}</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {report.documents.data.map((doc: any) => (
                  <DownloadCard
                    key={doc.id}
                    title={doc.attributes.title}
                    summary={doc.attributes.summary}
                    href={doc.attributes.document?.data?.attributes?.url}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
}
