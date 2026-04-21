import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { EditorialIntro } from '@/components/layout/EditorialIntro';
import { JsonLd } from '@/components/ui/JsonLd';
import { RichText } from '@/components/ui/RichText';
import { getCareerBySlug, getPageBySlug } from '@/lib/cms-api';
import { jobPostingJsonLd } from '@/lib/json-ld';
import { resolveLocalizedSlug } from '@/lib/localized-slug';
import { buildPageMetadata } from '@/lib/seo';
import { absoluteUrl, assetUrl } from '@/lib/urls';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const job = await getCareerBySlug(locale, slug);
  const canonicalSlug = job?.slug || slug;

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/careers/${canonicalSlug}`,
    seo: job?.seo,
    kind: 'job',
    fallback: {
      title: job?.title,
      description: job?.summary
    }
  });
}

export default async function CareerDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const resolved = await resolveLocalizedSlug({ locale, slug, getBySlug: getCareerBySlug });
  if (resolved.redirectSlug) {
    permanentRedirect(`/${locale}/careers/${resolved.redirectSlug}`);
  }

  const job = resolved.item;

  if (!job) notFound();
  const canonicalSlug = job.slug || slug;
  const careersPage = await getPageBySlug(locale, 'careers');
  const employmentTypeLabel =
    job.employmentType?.data?.attributes?.title || job.employmentType?.data?.attributes?.slug || job.employmentType || '-';

  return (
    <>
      <JsonLd
        data={
          jobPostingJsonLd({
            title: job.title,
            description: job.summary || job.description,
            url: absoluteUrl(`/${locale}/careers/${canonicalSlug}`),
            datePosted: job.publishDate,
            validThrough: job.applicationDeadline,
            employmentType: employmentTypeLabel,
            hiringOrganizationName: 'Shinhan Securities Vietnam',
            jobLocation: job.location
          })
        }
      />
      <EditorialIntro
        breadcrumbs={[
          { label: locale === 'vi' ? 'Trang chủ' : 'Home', href: `/${locale}` },
          { label: locale === 'vi' ? 'Tuyển dụng' : 'Careers', href: `/${locale}/careers` },
          { label: job.title, href: `/${locale}/careers/${canonicalSlug}` }
        ]}
        kicker={locale === 'vi' ? 'Tuyển dụng' : 'Careers'}
        title={job.title}
        subtitle={job.summary}
        imageUrl={assetUrl(careersPage?.coverImage?.data?.attributes?.url) || SHINHAN_VISUALS.services.investmentBanking.hero}
        visualLabel={locale === 'vi' ? 'Career opportunity' : 'Career opportunity'}
        visualCopy={
          locale === 'vi'
            ? 'Cơ hội nghề nghiệp được trình bày theo vị trí, địa điểm và phạm vi trách nhiệm rõ ràng.'
            : 'Career opportunities presented with clear role, location, and responsibility context.'
        }
      />
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--narrow">
          <div className="subpage-glass-card mt-3 p-4 text-sm text-slate-700">
            <p>
              <strong>{locale === 'vi' ? 'Bộ phận:' : 'Department:'}</strong> {job.department}
            </p>
            <p>
              <strong>{locale === 'vi' ? 'Địa điểm:' : 'Location:'}</strong> {job.location}
            </p>
            <p>
              <strong>{locale === 'vi' ? 'Loại hình:' : 'Type:'}</strong> {employmentTypeLabel}
            </p>
            <p>
              <strong>{locale === 'vi' ? 'Hạn nộp:' : 'Deadline:'}</strong> {job.applicationDeadline}
            </p>
          </div>

          <article className="subpage-glass-card subpage-prose-card">
            <RichText html={job.description} />
          </article>

          {job.applyUrl ? (
            <Link href={job.applyUrl} className="mt-4 inline-flex h-10 items-center rounded-full bg-[var(--color-primary)] px-5 text-sm font-semibold text-white">
              {locale === 'vi' ? 'Ứng tuyển ngay' : 'Apply now'}
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
}
