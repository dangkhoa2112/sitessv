import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DownloadCard } from '@/components/ui/DownloadCard';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { RichText } from '@/components/ui/RichText';
import { TagChip } from '@/components/ui/TagChip';
import { BrokerageLandingPage } from '@/components/services/BrokerageLandingPage';
import {
  BrokerageAdvisoryPage,
  BrokerageFinancialPage,
  BrokerageTradingPage,
  SanXinHaPage
} from '@/components/services/BrokerageProductPages';
import { InvestmentBankingLandingPage, EquityMarketPage, DebtMarketPage } from '@/components/services/InvestmentBankingPages';
import { getLayout, getServiceBySlug } from '@/lib/cms-api';
import { serviceJsonLd } from '@/lib/json-ld';
import { resolveLocalizedSlug } from '@/lib/localized-slug';
import { buildPageMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/urls';
import { assetUrl } from '@/lib/urls';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

function serviceFallbackImage(slug: string) {
  if (slug === 'ngan-hang-dau-tu' || slug === 'investment-banking' || slug === 'thi-truong-von' || slug === 'thi-truong-no') {
    return SHINHAN_VISUALS.services.investmentBanking.hero;
  }
  if (slug === 'moi-gioi-chung-khoan' || slug === 'giao-dich-truc-tuyen' || slug === 'tu-van-dau-tu' || slug === 'investment-advisory' || slug === 'dich-vu-tai-chinh' || slug === 'he-thong-giao-dich' || slug === 'san-xin-ha') {
    return SHINHAN_VISUALS.services.brokerage.hero;
  }
  return SHINHAN_VISUALS.services.research.hero;
}

function advisoryServiceSlug(locale: string) {
  return locale === 'vi' ? 'tu-van-dau-tu' : 'investment-advisory';
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const layout = await getLayout(locale);
  const seoDefault = layout.seoDefault?.meta;
  if (slug === 'tu-van-dau-tu' || slug === 'investment-advisory') {
    const serviceSlug = advisoryServiceSlug(locale);
    const item = await getServiceBySlug(locale, serviceSlug);
    return buildPageMetadata({
      locale,
      pathname: `/${locale}/services/${slug}`,
      seo: item?.seo || seoDefault,
      kind: 'service',
      fallback: {
        title: item?.title || (locale === 'vi' ? 'Tư vấn đầu tư chứng khoán' : 'Investment advisory'),
        description:
          item?.summary ||
          (locale === 'vi'
            ? 'Đăng ký tư vấn và gặp chuyên viên đồng hành đầu tư.'
            : 'Register for advisory support and meet an advisor.')
      }
    });
  }
  if (slug === 'ngan-hang-dau-tu' || slug === 'investment-banking') {
    return buildPageMetadata({
      locale,
      pathname: `/${locale}/services/${slug}`,
      seo: seoDefault,
      kind: 'service',
      fallback: {
        title: locale === 'vi' ? 'Ngân hàng đầu tư' : 'Investment banking',
        description:
          locale === 'vi'
            ? 'Thị trường vốn và thị trường nợ cho doanh nghiệp.'
            : 'Equity and debt capital markets for businesses.'
      }
    });
  }
  if (slug === 'thi-truong-von') {
    return buildPageMetadata({
      locale,
      pathname: `/${locale}/services/${locale === 'vi' ? 'ngan-hang-dau-tu' : 'investment-banking'}/thi-truong-von.html`,
      seo: seoDefault,
      kind: 'service',
      fallback: {
        title: locale === 'vi' ? 'Thị trường vốn' : 'Equity capital markets',
        description:
          locale === 'vi'
            ? 'Tư vấn giao dịch, M&A và chào bán phân phối cổ phần.'
            : 'Transaction advisory, M&A, and share distribution.'
      }
    });
  }
  if (slug === 'thi-truong-no') {
    return buildPageMetadata({
      locale,
      pathname: `/${locale}/services/${locale === 'vi' ? 'ngan-hang-dau-tu' : 'investment-banking'}/thi-truong-no.html`,
      seo: seoDefault,
      kind: 'service',
      fallback: {
        title: locale === 'vi' ? 'Thị trường nợ' : 'Debt capital markets',
        description:
          locale === 'vi'
            ? 'Tư vấn và thu xếp vốn trung - dài hạn.'
            : 'Advisory and funding for medium- and long-term capital needs.'
      }
    });
  }
  if (slug === 'giao-dich-truc-tuyen') {
    return buildPageMetadata({
      locale,
      pathname: `/${locale}/services/giao-dich-truc-tuyen`,
      seo: seoDefault,
      kind: 'service',
      fallback: {
        title: locale === 'vi' ? 'Giao dịch trực tuyến' : 'Online trading',
        description:
          locale === 'vi'
            ? 'Nền tảng giao dịch trực tuyến, web trading và desktop trading.'
            : 'Online trading platforms, web trading, and desktop trading.'
      }
    });
  }
  if (slug === 'tu-van-dau-tu' || slug === 'investment-advisory') {
    const service = await getServiceBySlug(locale, advisoryServiceSlug(locale));
    return buildPageMetadata({
      locale,
      pathname: `/${locale}/services/${slug}`,
      seo: service?.seo || seoDefault,
      kind: 'service',
      fallback: {
        title: service?.title || (locale === 'vi' ? 'Tư vấn đầu tư chứng khoán' : 'Investment advisory'),
        description:
          service?.summary ||
          (locale === 'vi'
            ? 'Đăng ký tư vấn và gặp chuyên viên đồng hành đầu tư.'
            : 'Register for advisory support and meet an advisor.')
      }
    });
  }
  if (slug === 'dich-vu-tai-chinh') {
    return buildPageMetadata({
      locale,
      pathname: `/${locale}/services/dich-vu-tai-chinh`,
      seo: seoDefault,
      kind: 'service',
      fallback: {
        title: locale === 'vi' ? 'Dịch vụ tài chính' : 'Financial services',
        description:
          locale === 'vi'
            ? 'Giao dịch ký quỹ và ứng trước tiền bán cho nhà đầu tư.'
            : 'Margin and cash-advance products for investors.'
      }
    });
  }
  if (slug === 'san-xin-ha') {
    return buildPageMetadata({
      locale,
      pathname: `/${locale}/services/san-xin-ha`,
      seo: seoDefault,
      kind: 'service',
      fallback: {
        title: locale === 'vi' ? 'San Xin Ha' : 'San Xin Ha',
        description:
          locale === 'vi'
            ? 'Ứng dụng đầu tư chứng khoán với ưu đãi và AI signal.'
            : 'An investing app with perks and AI signal.'
      }
    });
  }
  if (slug === 'moi-gioi-chung-khoan') {
    return buildPageMetadata({
      locale,
      pathname: `/${locale}/services/moi-gioi-chung-khoan`,
      seo: seoDefault,
      kind: 'service',
      fallback: {
        title: locale === 'vi' ? 'Môi giới chứng khoán' : 'Securities brokerage',
        description:
          locale === 'vi'
            ? 'Trang giới thiệu môi giới chứng khoán, giao dịch trực tuyến, tư vấn đầu tư và tài chính.'
            : 'Brokerage overview with trading, advisory, and financing.'
      }
    });
  }
  if (slug === 'he-thong-giao-dich') {
    return buildPageMetadata({
      locale,
      pathname: `/${locale}/services/moi-gioi-chung-khoan/he-thong-giao-dich.html`,
      seo: seoDefault,
      kind: 'service',
      fallback: {
        title: locale === 'vi' ? 'Hệ thống giao dịch' : 'Trading system',
        description:
          locale === 'vi'
            ? 'Giao dịch qua ứng dụng mobile, web trading và phần mềm desktop.'
            : 'Mobile, web, and desktop trading experiences.'
      }
    });
  }

  const item = await getServiceBySlug(locale, slug);
  const canonicalSlug = item?.slug || slug;

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/services/${canonicalSlug}`,
    seo: item?.seo || seoDefault,
    kind: 'service',
    fallback: {
      title: item?.title,
      description: item?.summary
    }
  });
}

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (slug === 'ngan-hang-dau-tu' || slug === 'investment-banking') {
    return <InvestmentBankingLandingPage locale={locale} schemaUrl={`/${locale}/services/${slug}`} />;
  }
  if (slug === 'thi-truong-von') {
    return <EquityMarketPage locale={locale} schemaUrl={`/${locale}/services/${locale === 'vi' ? 'ngan-hang-dau-tu' : 'investment-banking'}/thi-truong-von.html`} />;
  }
  if (slug === 'thi-truong-no') {
    return <DebtMarketPage locale={locale} schemaUrl={`/${locale}/services/${locale === 'vi' ? 'ngan-hang-dau-tu' : 'investment-banking'}/thi-truong-no.html`} />;
  }

  if (slug === 'giao-dich-truc-tuyen') {
    return <BrokerageTradingPage locale={locale} schemaUrl={`/${locale}/services/giao-dich-truc-tuyen`} />;
  }
  if (slug === 'tu-van-dau-tu' || slug === 'investment-advisory') {
    const service = await getServiceBySlug(locale, advisoryServiceSlug(locale));
    return <BrokerageAdvisoryPage locale={locale} service={service} schemaUrl={`/${locale}/services/${slug}`} />;
  }
  if (slug === 'dich-vu-tai-chinh') {
    return <BrokerageFinancialPage locale={locale} schemaUrl={`/${locale}/services/dich-vu-tai-chinh`} />;
  }
  if (slug === 'san-xin-ha') {
    return <SanXinHaPage locale={locale} schemaUrl={`/${locale}/services/san-xin-ha`} />;
  }
  if (slug === 'he-thong-giao-dich') {
    return <BrokerageTradingPage locale={locale} schemaUrl={`/${locale}/services/moi-gioi-chung-khoan/he-thong-giao-dich.html`} />;
  }

  if (slug === 'moi-gioi-chung-khoan') {
    return <BrokerageLandingPage locale={locale} schemaUrl={`/${locale}/services/moi-gioi-chung-khoan`} />;
  }

  const resolved = await resolveLocalizedSlug({ locale, slug, getBySlug: getServiceBySlug });
  if (resolved.redirectSlug) {
    permanentRedirect(`/${locale}/services/${resolved.redirectSlug}`);
  }

  const item = resolved.item;

  if (!item) notFound();

  const canonicalSlug = item.slug || slug;

  return (
    <>
      <JsonLd
        data={
          serviceJsonLd({
            name: item.title,
            description: item.summary,
            url: absoluteUrl(`/${locale}/services/${canonicalSlug}`),
            providerName: 'Shinhan Securities Vietnam',
            imageUrl: assetUrl(item.coverImage?.data?.attributes?.url) || serviceFallbackImage(canonicalSlug)
          })
        }
      />
      <PageHero
        title={item.title}
        subtitle={item.summary}
        imageUrl={assetUrl(item.coverImage?.data?.attributes?.url) || serviceFallbackImage(canonicalSlug)}
        contentWidth="narrow"
      />
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--narrow">
          <Breadcrumbs
            items={[
              { label: locale === 'vi' ? 'Trang chủ' : 'Home', href: `/${locale}` },
              { label: locale === 'vi' ? 'Dịch vụ' : 'Services', href: `/${locale}/services` },
              { label: item.title, href: `/${locale}/services/${canonicalSlug}` }
            ]}
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {(item.tags?.data || []).map((tag: any) => (
              <TagChip key={tag.attributes.slug} label={tag.attributes.name} />
            ))}
          </div>

          <article className="subpage-glass-card subpage-prose-card">
            <RichText html={item.description} />
          </article>

          {item.documents?.data?.length ? (
            <section className="subpage-section">
              <h2 className="subpage-section-title">{locale === 'vi' ? 'Tài liệu liên quan' : 'Related documents'}</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {item.documents.data.map((doc: any) => (
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
