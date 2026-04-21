import type { Metadata } from 'next';
import { EditorialIntro } from '@/components/layout/EditorialIntro';
import { ContentCard } from '@/components/ui/ContentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { InsightRail } from '@/components/ui/InsightRail';
import { Pagination } from '@/components/ui/Pagination';
import { SearchBar } from '@/components/ui/SearchBar';
import { getPageBySlug, listCareers } from '@/lib/cms-api';
import { buildListingPageMetadata } from '@/lib/seo';
import { assetUrl } from '@/lib/urls';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

export async function generateMetadata({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { page, q } = await searchParams;
  const pageNumber = Number(page || 1);
  const hasSearchQuery = Boolean(q?.trim());

  return buildListingPageMetadata({
    locale,
    basePath: `/${locale}/careers`,
    page: pageNumber,
    hasSearchQuery,
    title: locale === 'vi' ? 'Tuyển dụng Shinhan Securities Vietnam' : 'Shinhan Securities Vietnam Careers',
    description:
      locale === 'vi'
        ? 'Cơ hội nghề nghiệp trong lĩnh vực chứng khoán, tư vấn, vận hành và công nghệ tại Shinhan Securities Vietnam.'
        : 'Career opportunities in securities, advisory, operations, and technology at Shinhan Securities Vietnam.'
  });
}

export default async function CareersPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { locale } = await params;
  const { page, q } = await searchParams;
  const currentPage = Number(page || 1);

  const data = await listCareers({ locale, page: currentPage, pageSize: 9, search: q || '' });
  const cmsPage = await getPageBySlug(locale, 'careers');
  const resolveEmploymentTypeLabel = (employmentType?: any) =>
    employmentType?.data?.attributes?.title || employmentType?.data?.attributes?.slug || employmentType || '-';

  return (
    <>
      <EditorialIntro
        breadcrumbs={[
          { label: locale === 'vi' ? 'Trang chủ' : 'Home', href: `/${locale}` },
          { label: locale === 'vi' ? 'Tuyển dụng' : 'Careers', href: `/${locale}/careers` }
        ]}
        kicker={locale === 'vi' ? 'Tuyển dụng' : 'Careers'}
        title={locale === 'vi' ? 'Tuyển dụng' : 'Careers'}
        subtitle={
          locale === 'vi'
            ? 'Gia nhập đội ngũ chuyên gia tài chính, vận hành và công nghệ của Shinhan Securities Vietnam.'
            : 'Join Shinhan Securities Vietnam across advisory, operations, and technology roles.'
        }
        highlights={locale === 'vi' ? ['Research', 'Treasury', 'Business Analyst'] : ['Research', 'Treasury', 'Business Analyst']}
        imageUrl={assetUrl(cmsPage?.coverImage?.data?.attributes?.url) || SHINHAN_VISUALS.services.research.hero}
        visualLabel={locale === 'vi' ? 'Talent strategy' : 'Talent strategy'}
        visualCopy={
          locale === 'vi'
            ? 'Khung tuyển dụng định vị vai trò rõ ràng giữa phân tích, vận hành và phát triển sản phẩm số.'
            : 'A hiring framework that separates analysis, operations, and digital product execution clearly.'
        }
      />
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide">
          <InsightRail
            eyebrow={locale === 'vi' ? 'Talent Strategy' : 'Talent Strategy'}
            title={locale === 'vi' ? 'Tuyển dụng cho tổ chức tài chính định hướng công nghệ' : 'Hiring for a technology-driven financial institution'}
            description={
              locale === 'vi'
                ? 'Khung tuyển dụng nhấn mạnh năng lực nghiên cứu, vận hành rủi ro và phát triển sản phẩm số theo chuẩn thị trường vốn.'
                : 'Recruitment framework prioritizing research depth, risk operations, and digital product execution in capital markets.'
            }
            items={
              locale === 'vi'
                ? [
                    { meta: 'Research', title: 'Năng lực phân tích', description: 'Tìm kiếm nhân sự có tư duy dữ liệu và khả năng xây dựng luận điểm đầu tư rõ ràng.' },
                    { meta: 'Execution', title: 'Vận hành giao dịch', description: 'Ưu tiên kinh nghiệm xử lý quy trình thực thi, kiểm soát rủi ro và dịch vụ khách hàng.' },
                    { meta: 'AI Readiness', title: 'Phối hợp cùng AI', description: 'Khả năng sử dụng công cụ AI trong phân tích, tự động hóa và ra quyết định nhanh.' }
                  ]
                : [
                    { meta: 'Research', title: 'Analytical depth', description: 'Looking for data-driven thinkers with clear investment argumentation.' },
                    { meta: 'Execution', title: 'Trading operations', description: 'Operational rigor in execution flow, risk control, and client servicing.' },
                    { meta: 'AI Readiness', title: 'Human + AI workflows', description: 'Ability to use AI tools for analysis, automation, and faster decisions.' }
                  ]
            }
          />
          <SearchBar
            action={`/${locale}/careers`}
            search={q}
            placeholder={locale === 'vi' ? 'Tìm vị trí...' : 'Search jobs...'}
            label={locale === 'vi' ? 'Tìm vị trí' : 'Search jobs'}
            buttonLabel={locale === 'vi' ? 'Tìm' : 'Search'}
          />
          {data.items.length === 0 ? (
            <EmptyState
              title={locale === 'vi' ? 'Chưa có vị trí phù hợp' : 'No matching roles'}
              description={locale === 'vi' ? 'Vui lòng quay lại sau.' : 'Please check back later.'}
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.items.map((item: any) => (
                <ContentCard
                  key={item.id}
                  title={item.attributes.title}
                  summary={`${item.attributes.department || ''} • ${item.attributes.location || ''}`}
                  href={`/${locale}/careers/${item.attributes.slug}`}
                  date={item.attributes.publishDate}
                  category={resolveEmploymentTypeLabel(item.attributes.employmentType)}
                  locale={locale}
                />
              ))}
            </div>
          )}
          <Pagination
            page={currentPage}
            pageCount={data.pagination?.pageCount || 1}
            basePath={`/${locale}/careers`}
            query={q || ''}
            previousLabel={locale === 'vi' ? 'Trước' : 'Prev'}
            nextLabel={locale === 'vi' ? 'Sau' : 'Next'}
          />
        </div>
      </div>
    </>
  );
}
