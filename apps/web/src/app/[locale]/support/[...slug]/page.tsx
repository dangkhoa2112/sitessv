import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { getPageBySlug } from '@/lib/cms-api';
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/json-ld';
import { buildPageMetadata } from '@/lib/seo';
import { absoluteUrl, assetUrl } from '@/lib/urls';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

function normalizeSlug(slugParts: string[]) {
  return slugParts.map((part) => part.replace(/\.html$/, '')).filter(Boolean);
}

function isVi(locale: string) {
  return locale === 'vi';
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const normalizedParts = normalizeSlug(slug);
  const canonicalSlug = normalizedParts[normalizedParts.length - 1];
  const page = canonicalSlug ? await getPageBySlug(locale, canonicalSlug) : null;

  if (!page) return {};

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/support/${canonicalSlug}`,
    seo: page.seo,
    fallback: {
      title: page.title || undefined,
      description: page.summary || undefined
    }
  });
}

export default async function SupportSubPage({
  params
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  const normalizedParts = normalizeSlug(slug);
  const canonicalSlug = normalizedParts[normalizedParts.length - 1];
  const page = canonicalSlug ? await getPageBySlug(locale, canonicalSlug) : null;

  if (!page) notFound();
  if (!canonicalSlug) notFound();
  if (slug.join('/') !== canonicalSlug) {
    permanentRedirect(`/${locale}/support/${canonicalSlug}`);
  }

  const vi = isVi(locale);
  const title = page.title || (vi ? 'Hỗ trợ khách hàng' : 'Customer Support');
  const summary = page.summary || '';
  const relatedLinks = buildSupportRelatedLinks(locale, canonicalSlug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: locale === 'vi' ? 'Trang chủ' : 'Home', url: absoluteUrl(`/${locale}`) },
          { name: locale === 'vi' ? 'Hỗ trợ' : 'Support', url: absoluteUrl(`/${locale}/support`) },
          { name: title, url: absoluteUrl(`/${locale}/support/${canonicalSlug}`) }
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          name: title,
          description: summary,
          url: absoluteUrl(`/${locale}/support/${canonicalSlug}`),
          inLanguage: locale === 'vi' ? 'vi-VN' : 'en-US'
        })}
      />
      <PageHero
        kicker={vi ? 'Hỗ trợ' : 'Support'}
        title={title}
        subtitle={summary}
        highlights={vi ? ['Hỗ trợ nhanh', 'Tài liệu sử dụng', 'FAQ'] : ['Fast support', 'How-to docs', 'FAQ']}
        imageUrl={assetUrl(page.coverImage?.data?.attributes?.url) || SHINHAN_VISUALS.support.hero}
      />

      <div className="subpage-shell">
        <div className="subpage-content subpage-content--narrow space-y-6 md:space-y-8">
          <Breadcrumbs
            items={[
              { label: vi ? 'Trang chủ' : 'Home', href: `/${locale}` },
              { label: vi ? 'Hỗ trợ khách hàng' : 'Support', href: `/${locale}/support` },
              { label: title, href: `/${locale}/support/${canonicalSlug}` }
            ]}
          />

          <SectionRenderer sections={page.sections || []} locale={locale as 'vi' | 'en'} />

          {relatedLinks.length ? (
            <section className="subpage-section">
              <h2 className="subpage-section-title">{vi ? 'Liên kết liên quan' : 'Related links'}</h2>
              <div className="grid gap-3 md:grid-cols-3">
                {relatedLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="subpage-soft-card group flex h-full flex-col p-4 transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{item.kicker}</p>
                    <h3 className="mt-2 text-[1.05rem] font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                    <span className="mt-auto pt-4 text-sm font-semibold text-[var(--color-primary)] transition group-hover:translate-x-0.5">
                      {vi ? 'Mở liên kết' : 'Open link'}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
}

function buildSupportRelatedLinks(locale: string, slug: string) {
  const vi = locale === 'vi';
  const supportHub = `/${locale}/support`;
  const faq = `/${locale}/faq`;
  const contact = `/${locale}/contact`;
  const tradingGuide = `/${locale}/support/huong-dan-giao-dich.html`;
  const accountGuide = `/${locale}/support/mo-tai-khoan-truc-tuyen.html`;
  const marginGuide = `/${locale}/support/dang-ky-giao-dich-ky-quy.html`;
  const riskDisclosure = `/${locale}/support/quy-dinh-giao-dich.html`;

  if (/mo-tai-khoan|account/.test(slug)) {
    return [
      { kicker: vi ? 'Support' : 'Support', title: vi ? 'Trung tâm hỗ trợ' : 'Support hub', description: vi ? 'Tổng hợp hướng dẫn và quy định hỗ trợ.' : 'Guides and policies in one place.', href: supportHub },
      { kicker: vi ? 'FAQ' : 'FAQ', title: vi ? 'Câu hỏi thường gặp' : 'Frequently asked questions', description: vi ? 'Giải đáp nhanh cho các thao tác cơ bản.' : 'Quick answers to common workflows.', href: faq },
      { kicker: vi ? 'Contact' : 'Contact', title: vi ? 'Liên hệ hỗ trợ' : 'Contact support', description: vi ? 'Kênh chính thức để được hỗ trợ trực tiếp.' : 'Official channel for direct help.', href: contact }
    ];
  }

  if (/giao-dich|trading/.test(slug)) {
    return [
      { kicker: vi ? 'Trading' : 'Trading', title: vi ? 'Hướng dẫn giao dịch' : 'Trading guide', description: vi ? 'Các bước giao dịch cơ bản và lưu ý vận hành.' : 'Basic trading steps and operational notes.', href: tradingGuide },
      { kicker: vi ? 'Guide' : 'Guide', title: vi ? 'Mở tài khoản' : 'Open an account', description: vi ? 'Quy trình mở tài khoản online.' : 'Online account opening workflow.', href: accountGuide },
      { kicker: vi ? 'FAQ' : 'FAQ', title: vi ? 'Câu hỏi thường gặp' : 'Frequently asked questions', description: vi ? 'Các câu hỏi phổ biến nhất.' : 'Most common questions.', href: faq }
    ];
  }

  if (/ky-quy|margin|tien/.test(slug)) {
    return [
      { kicker: vi ? 'Margin' : 'Margin', title: vi ? 'Đăng ký giao dịch ký quỹ' : 'Register for margin trading', description: vi ? 'Quy trình và lưu ý trước khi đăng ký.' : 'Requirements and pre-registration notes.', href: marginGuide },
      { kicker: vi ? 'Policy' : 'Policy', title: vi ? 'Quy định giao dịch' : 'Trading rules', description: vi ? 'Các quy định vận hành liên quan.' : 'Relevant operational policies.', href: riskDisclosure },
      { kicker: vi ? 'Contact' : 'Contact', title: vi ? 'Liên hệ hỗ trợ' : 'Contact support', description: vi ? 'Nhận trợ giúp từ đội ngũ hỗ trợ.' : 'Get help from the support team.', href: contact }
    ];
  }

  return [
    { kicker: vi ? 'Support' : 'Support', title: vi ? 'Trung tâm hỗ trợ' : 'Support hub', description: vi ? 'Trở về trang hỗ trợ chính.' : 'Back to the main support hub.', href: supportHub },
    { kicker: vi ? 'FAQ' : 'FAQ', title: vi ? 'Câu hỏi thường gặp' : 'Frequently asked questions', description: vi ? 'Nhóm câu hỏi phổ biến cho nhà đầu tư.' : 'Common investor questions and answers.', href: faq },
    { kicker: vi ? 'Contact' : 'Contact', title: vi ? 'Liên hệ hỗ trợ' : 'Contact support', description: vi ? 'Trao đổi trực tiếp với đội ngũ hỗ trợ.' : 'Reach the support team directly.', href: contact }
  ];
}
