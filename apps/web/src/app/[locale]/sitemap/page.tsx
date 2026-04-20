import type { Metadata } from 'next';
import Link from 'next/link';
import { InsightRail } from '@/components/ui/InsightRail';
import { PageHero } from '@/components/ui/PageHero';
import { getSitemapSource } from '@/lib/cms-api';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/sitemap`,
    fallback: {
      title: locale === 'vi' ? 'Sơ đồ website' : 'HTML Sitemap',
      description:
        locale === 'vi'
          ? 'Danh mục các trang và nội dung quan trọng trên website.'
          : 'HTML index of major sections and content pages on this website.'
    }
  });
}

export default async function SitemapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const source = await getSitemapSource(locale);

  return (
    <>
      <PageHero
        title={locale === 'vi' ? 'Sơ đồ website' : 'Sitemap'}
        subtitle={locale === 'vi' ? 'Danh mục toàn bộ nội dung quan trọng của website.' : 'Index of major website sections and content.'}
        highlights={locale === 'vi' ? ['Trang tĩnh', 'Tin tức', 'Nghiên cứu'] : ['Static pages', 'News', 'Research']}
      />
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide">
          <InsightRail
            eyebrow={locale === 'vi' ? 'Information Architecture' : 'Information Architecture'}
            title={locale === 'vi' ? 'Bản đồ điều hướng cho toàn bộ tài nguyên đầu tư' : 'Navigation map for investment resources'}
            description={
              locale === 'vi'
                ? 'Sắp xếp theo nhóm nội dung để người dùng truy cập nhanh đến dịch vụ, nghiên cứu, tin tức và các trang vận hành.'
                : 'Structured by content families for fast access to services, research, news, and operations pages.'
            }
            items={
              locale === 'vi'
                ? [
                    { meta: 'Core', title: 'Trang nền tảng', description: 'Các trang định danh thương hiệu và hành trình khách hàng chính.' },
                    { meta: 'Content', title: 'Kho nội dung động', description: 'Tổng hợp slug cho news, research, events và cơ hội nghề nghiệp.' },
                    { meta: 'AI SEO', title: 'Khả năng mở rộng', description: 'Sẵn sàng cho semantic crawling và internal linking tự động.' }
                  ]
                : [
                    { meta: 'Core', title: 'Foundational pages', description: 'Brand identity and core client journey pages.' },
                    { meta: 'Content', title: 'Dynamic content inventory', description: 'Slug index across news, research, events, and careers.' },
                    { meta: 'AI SEO', title: 'Scalable structure', description: 'Prepared for semantic crawling and automated internal linking.' }
                  ]
            }
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <SitemapGroup
              title={locale === 'vi' ? 'Trang tĩnh' : 'Static pages'}
              links={[
                { label: locale === 'vi' ? 'Trang chủ' : 'Home', href: `/${locale}` },
                { label: locale === 'vi' ? 'Giới thiệu' : 'About', href: `/${locale}/about` },
                { label: locale === 'vi' ? 'Dịch vụ' : 'Services', href: `/${locale}/services` },
                { label: locale === 'vi' ? 'Tin tức' : 'News', href: `/${locale}/news` },
                { label: locale === 'vi' ? 'Sự kiện' : 'Events', href: `/${locale}/events` },
                { label: locale === 'vi' ? 'Nghiên cứu' : 'Research', href: `/${locale}/research` },
                { label: locale === 'vi' ? 'FAQ' : 'FAQ', href: `/${locale}/faq` },
                { label: locale === 'vi' ? 'Liên hệ' : 'Contact', href: `/${locale}/contact` }
              ]}
            />

            <SitemapGroup
              title={locale === 'vi' ? 'Dịch vụ' : 'Services'}
              links={(source?.services?.data || []).map((item: any) => ({
                label: item.attributes.slug,
                href: `/${locale}/services/${item.attributes.slug}`
              }))}
            />

            <SitemapGroup
              title={locale === 'vi' ? 'Tin tức' : 'News'}
              links={(source?.newsArticles?.data || []).map((item: any) => ({
                label: item.attributes.slug,
                href: `/${locale}/news/${item.attributes.slug}`
              }))}
            />

            <SitemapGroup
              title={locale === 'vi' ? 'Sự kiện' : 'Events'}
              links={(source?.events?.data || []).map((item: any) => ({
                label: item.attributes.slug,
                href: `/${locale}/events/${item.attributes.slug}`
              }))}
            />

            <SitemapGroup
              title={locale === 'vi' ? 'Nghiên cứu' : 'Research'}
              links={(source?.researchReports?.data || []).map((item: any) => ({
                label: item.attributes.slug,
                href: `/${locale}/research/${item.attributes.slug}`
              }))}
            />

            <SitemapGroup
              title={locale === 'vi' ? 'Tuyển dụng' : 'Careers'}
              links={(source?.careerJobs?.data || []).map((item: any) => ({
                label: item.attributes.slug,
                href: `/${locale}/careers/${item.attributes.slug}`
              }))}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function SitemapGroup({
  title,
  links
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <section className="subpage-glass-card p-4">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      <ul className="mt-2.5 space-y-1.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-slate-600 transition hover:text-[var(--color-primary)]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
