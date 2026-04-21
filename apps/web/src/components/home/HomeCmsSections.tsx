import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ContentCard } from '@/components/ui/ContentCard';
import { CtaSection } from '@/components/ui/cta';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { JsonLd } from '@/components/ui/JsonLd';
import { InsightRail } from '@/components/ui/InsightRail';
import { Card, CardBody, CardDescription } from '@/components/ui/card';
import { HomeLegacyMarketStrip } from '@/components/home/HomeLegacyMarketStrip';
import { HomeLegacyPriceBoardSection } from '@/components/home/HomeLegacyPriceBoardSection';
import { OneShinhanShowcase } from '@/components/home/OneShinhanShowcase';
import { faqJsonLd } from '@/lib/json-ld';
import { buildLocalePath, switchLocalePath } from '@/lib/localized-routes';
import { assetUrl } from '@/lib/urls';

type CmsNode<T> = {
  id?: string | number;
  attributes?: T;
} | null | undefined;

type HomeCmsSectionsProps = {
  locale: 'vi' | 'en';
  sections?: Array<any>;
  newsItems?: Array<CmsNode<any>>;
  researchItems?: Array<CmsNode<any>>;
  faqCategories?: Array<CmsNode<any>>;
  offices?: Array<CmsNode<any>>;
};

function unwrap<T>(node: CmsNode<T>): T | null {
  if (!node) return null;
  return (node.attributes ?? node) as T;
}

function resolveLink(locale: 'vi' | 'en', href?: string | null) {
  if (!href) return undefined;
  if (href.startsWith('http://') || href.startsWith('https://')) return href;
  if (href.startsWith('/vi/') || href.startsWith('/en/')) return switchLocalePath(href, locale);
  return buildLocalePath(locale, href);
}

function resolveImage(node?: any) {
  return assetUrl(node?.data?.attributes?.url);
}

function resolveRelationLabel(relation?: any) {
  return relation?.data?.attributes?.title || relation?.data?.attributes?.slug || relation?.data?.attributes?.name;
}

function resolveOfficeCardLabel(locale: 'vi' | 'en', office: any) {
  const parts = [office.name, office.city].filter(Boolean);
  return locale === 'vi' ? parts.join(' · ') : parts.join(' · ');
}

function pickFaqCategory(faqCategories: Array<CmsNode<any>> | undefined, categorySlug?: string | null) {
  const categories = (faqCategories || []).map((item) => unwrap(item)).filter(Boolean) as Array<any>;
  if (!categories.length) return null;
  if (categorySlug) {
    const found = categories.find((category) => category.slug === categorySlug);
    if (found) return found;
  }
  return categories[0];
}

function getStatIcon(label: string, index: number) {
  const key = `${label}-${index}`.toLowerCase();
  if (key.includes('khách') || key.includes('client') || key.includes('activity')) {
    return <UsersIcon />;
  }
  if (key.includes('chi nhánh') || key.includes('office') || key.includes('branch')) {
    return <OfficeIcon />;
  }
  if (key.includes('báo cáo') || key.includes('report')) {
    return <ReportIcon />;
  }
  if (key.includes('uptime') || key.includes('thời gian') || key.includes('system')) {
    return <UptimeIcon />;
  }
  return <SparkIcon />;
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M9 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm6 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm3 1.5h-1.1a5.45 5.45 0 0 1 1.6 3.9V20h2v-2.1a3.4 3.4 0 0 0-2.5-3.4Zm-12 0A5.5 5.5 0 0 0 0 19.5V20h2v-.6a3.5 3.5 0 0 1 3.5-3.5H7Zm6 0c-3.2 0-6 1.5-6 4.5V20h12v-2.5c0-3-2.8-4.5-6-4.5Z"
      />
    </svg>
  );
}

function OfficeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M4 20V6a2 2 0 0 1 2-2h6v16H4Zm10 0V4h4a2 2 0 0 1 2 2v14h-6Zm-7-9h2V9H7v2Zm0 4h2v-2H7v2Zm5-4h2V9h-2v2Zm0 4h2v-2h-2v2Z"
      />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5ZM8 11h8v1.5H8V11Zm0 4h8v1.5H8V15Zm0 4h5v1.5H8V19Z"
      />
    </svg>
  );
}

function UptimeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 10.4V6.8h-2v6l4.8 2.9 1-1.7Z"
      />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M13 2 8.5 10H3l6.5 4-2.5 8 6-5 6 5-2.5-8L23 10h-5.5L13 2Z"
      />
    </svg>
  );
}

function getBoardDate(locale: 'vi' | 'en') {
  return new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(new Date());
}

export function HomeCmsSections({
  locale,
  sections,
  newsItems = [],
  researchItems = [],
  faqCategories = [],
  offices = []
}: HomeCmsSectionsProps) {
  if (!sections?.length) return null;

  const normalizedNews = newsItems.map((item) => unwrap(item)).filter(Boolean) as Array<any>;
  const normalizedResearch = researchItems.map((item) => unwrap(item)).filter(Boolean) as Array<any>;
  const normalizedOffices = offices.map((item) => unwrap(item)).filter(Boolean) as Array<any>;
  const boardDate = getBoardDate(locale);

  return (
    <div className="space-y-7">
      {sections.map((section, index) => {
        switch (section.__typename) {
          case 'ComponentSectionsHomeMarketStripSection':
            return <HomeLegacyMarketStrip key={`${section.__typename}-${index}`} locale={locale} boardDate={boardDate} />;

          case 'ComponentSectionsHomePriceBoardSection':
            return <HomeLegacyPriceBoardSection key={`${section.__typename}-${index}`} locale={locale} boardDate={boardDate} />;

          case 'ComponentSectionsHomeOneShinhanSection': {
            const highlights = (section.highlights || [])
              .filter(Boolean)
              .map((item: any) => ({
                title: item.title,
                description: item.description || '',
                accentColor: item.accentColor || undefined,
                accentBackgroundColor: item.accentBackgroundColor || undefined,
                accentBorderColor: item.accentBorderColor || undefined
              }))
              .filter((item: any) => item.title);
            const partners = (section.partners || [])
              .filter((item: any) => item?.active !== false)
              .sort((a: any, b: any) => (a.priority ?? 0) - (b.priority ?? 0))
              .map((item: any) => ({
                logo: resolveImage(item.logo) || '',
                href: item.href,
                name: item.name,
                shortDesc: item.shortDesc || '',
                alt: item.alt || item.name
              }))
              .filter((partner: any) => !!partner.logo);

            if (!partners.length) return null;

            return (
              <section key={`${section.__typename}-${index}`} className="shinhan-container home-section-gap">
                <OneShinhanShowcase
                  kicker={section.kicker || (locale === 'vi' ? 'Hệ sinh thái One Shinhan' : 'One Shinhan ecosystem')}
                  profileLabel={section.profileLabel || (locale === 'vi' ? 'Hồ sơ đối tác' : 'Partner profile')}
                  title={section.title}
                  subtitle={section.subtitle || ''}
                  partners={partners}
                  visitLabel={section.visitLabel || (locale === 'vi' ? 'Truy cập ngay' : 'Visit now')}
                  oneShinhanLogoAlt={section.logoAlt || section.title}
                  carouselLabel={section.carouselLabel || (locale === 'vi' ? 'Hệ sinh thái One Shinhan' : 'One Shinhan ecosystem')}
                  ecosystemLabel={section.ecosystemLabel || (locale === 'vi' ? 'Hệ sinh thái Shinhan' : 'Shinhan ecosystem')}
                  officeCountLabel={section.officeCountLabel || (locale === 'vi' ? 'văn phòng' : 'offices')}
                  officeLocationPrimary={section.officeLocationPrimary || (locale === 'vi' ? 'Hồ Chí Minh' : 'Ho Chi Minh City')}
                  officeLocationSecondary={section.officeLocationSecondary || (locale === 'vi' ? 'Hà Nội' : 'Ha Noi')}
                  footerTitle={section.footerTitle || 'One Shinhan'}
                  footerDescription={
                    section.footerDescription ||
                    (locale === 'vi'
                      ? 'Kết nối đồng bộ giữa ngân hàng, chứng khoán và bảo hiểm để theo dõi tài sản, giao dịch và thông tin đầu tư trong một luồng.'
                      : 'A unified journey across banking, securities, and insurance for seamless tracking of assets, trading, and investment information.')
                  }
                  highlights={highlights}
                />
              </section>
            );
          }

          case 'ComponentSectionsHomeAiStackSection': {
            const cards = (section.cards || []).filter(Boolean);
            if (!cards.length) return null;

            return (
              <section key={`${section.__typename}-${index}`} className="shinhan-container home-section-gap">
                <div className="home-section-head">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6f552f]">
                    {section.eyebrow || (locale === 'vi' ? 'Hạ tầng AI & dữ liệu' : 'AI & data infrastructure')}
                  </p>
                  <h2 className="mt-2 text-[1.65rem] font-medium text-[var(--color-primary)] md:text-[2rem]">{section.title}</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-3 md:gap-5">
                  {cards.map((card: any, cardIndex: number) => (
                    <article key={`${card.title}-${cardIndex}`} className={`ai-stack-card relative pl-7 pr-5 py-6 md:pl-8 md:pr-6 ${cardIndex === 0 ? 'ai-stack-card--featured' : ''}`}>
                      <p className="font-mono text-[12px] font-semibold uppercase tracking-wide text-[#b88435]">{card.value}</p>
                      <h3 className="mt-3 text-lg font-medium text-[var(--color-primary)] md:text-xl">{card.title}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-[#475569] md:text-[15px]">{card.description}</p>
                    </article>
                  ))}
                </div>
              </section>
            );
          }

         

          case 'ComponentSectionsFeatureCardSection':
            return (
              <section key={`${section.__typename}-${index}`} className="shinhan-container home-section-gap">
                <div className="home-section-head">
                  <h2 className="text-[1.65rem] font-medium text-[var(--color-primary)] md:text-[2rem]">
                    {section.featureTitle || section.title}
                  </h2>
                  {section.description ? <p className="mt-2 max-w-3xl text-[15px] leading-7 text-[#4a6178]">{section.description}</p> : null}
                </div>
                <div className="grid gap-5 lg:grid-cols-3">
                  {(section.items || []).map((item: any) => (
                    <Card key={item.title} tone="default" className="home-ultra-card overflow-hidden rounded-3xl">
                      <CardBody className="p-6">
                        <h3 className="text-[1.15rem] font-semibold leading-tight text-[var(--color-primary)]">{item.title}</h3>
                        {item.description ? <CardDescription className="mt-2 text-[15px] leading-6">{item.description}</CardDescription> : null}
                        {item.link?.href ? (
                          <Link
                            href={resolveLink(locale, item.link.href)!}
                            className="mt-4 inline-flex text-[14px] font-semibold text-[var(--color-primary)]"
                          >
                            {item.link.label || (locale === 'vi' ? 'Xem chi tiết' : 'Learn more')} →
                          </Link>
                        ) : null}
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </section>
            );

          case 'ComponentSectionsTradingSystemShowcaseSection':
            return (
              <section key={`${section.__typename}-${index}`} className="shinhan-container home-section-gap">
                <div className="home-section-head home-section-head--left max-w-3xl text-left">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#cf9c51]/30 bg-[#fbf3e7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7a5a2f]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#cf9c51]" />
                    {section.platformName || (locale === 'vi' ? 'Hệ thống giao dịch' : 'Trading system')}
                  </span>
                  <h2 className="mt-4 text-[1.65rem] font-semibold leading-tight tracking-tight text-[var(--color-primary)] md:text-[2.1rem]">
                    {section.tradingTitle || section.title}
                  </h2>
                  {section.description ? <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#435971]">{section.description}</p> : null}
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
                  <div className="rounded-[2rem] border border-[#dbe7f4] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,250,255,0.92))] p-5 shadow-[0_20px_46px_-34px_rgba(0,57,127,0.34)] md:p-6">
                    {section.features?.length ? (
                      <div className="grid gap-3 md:grid-cols-2">
                        {section.features.map((feature: string, featureIndex: number) => (
                          <div
                            key={feature}
                            className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition ${
                              featureIndex === 0
                                ? 'border-[#cfe0f1] bg-white shadow-[0_12px_22px_-20px_rgba(20,35,104,0.45)]'
                                : 'border-[#dbe7f4] bg-white/82'
                            }`}
                          >
                            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[linear-gradient(180deg,#cf9c51,#c48a2f)]" />
                            <span className="text-[15px] font-medium leading-6 text-[var(--color-primary)]">{feature}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-5 grid gap-3 border-t border-[#e3edf6] pt-5 sm:grid-cols-3">
                      {[
                        {
                          label: locale === 'vi' ? 'Khớp lệnh' : 'Execution',
                          value: locale === 'vi' ? 'Nhanh' : 'Fast'
                        },
                        {
                          label: locale === 'vi' ? 'Hạn mức' : 'Risk control',
                          value: locale === 'vi' ? 'Chặt chẽ' : 'Tight'
                        },
                        {
                          label: locale === 'vi' ? 'Cảnh báo' : 'Alerts',
                          value: locale === 'vi' ? 'Tự động' : 'Auto'
                        }
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-2xl bg-white/88 px-4 py-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{stat.label}</p>
                          <p className="mt-1 text-sm font-semibold text-[var(--color-primary)]">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {resolveImage(section.screenshot) ? (
                    <div className="relative min-h-[280px] overflow-hidden rounded-[2rem] border border-[#dbe7f4] bg-[#091d63] shadow-[0_24px_50px_-34px_rgba(0,57,127,0.48)]">
                      <Image
                        src={resolveImage(section.screenshot)!}
                        alt={section.platformName || section.title || 'Trading showcase'}
                        fill
                        className="object-cover opacity-[0.94]"
                        sizes="(max-width: 768px) 100vw, 42vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,24,74,0.08)_0%,rgba(10,24,74,0.22)_100%)]" />
                      <div className="absolute left-4 top-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur">
                        {locale === 'vi' ? 'Nền tảng giao dịch' : 'Trading platform'}
                      </div>
                    </div>
                  ) : null}
                </div>
              </section>
            );

          case 'ComponentSectionsStatsSection':
            return (
              <section key={`${section.__typename}-${index}`} className="shinhan-container home-section-gap">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {(section.items || []).map((item: any) => (
                    <Card key={item.label} tone="default" className="home-vt-stat home-vt-stat--compact">
                      <CardBody className="flex h-full flex-col gap-4 p-0">
                        <div className="flex items-start gap-3">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#d7e4f2] bg-[linear-gradient(145deg,rgba(248,251,255,0.98),rgba(235,244,255,0.92))] text-[#1f4c8f] shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_10px_18px_-16px_rgba(20,35,104,0.38)]">
                            {getStatIcon(item.label || '', index)}
                          </span>
                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6f552f]">{item.label}</p>
                            <h3 className="mt-1 font-mono text-[1.42rem] font-semibold leading-none tracking-tight text-[var(--color-primary)] md:text-[1.6rem]">
                              {item.value}
                            </h3>
                          </div>
                        </div>
                        {item.note ? (
                          <CardDescription className="max-w-[18rem] text-[13px] leading-[1.55] text-[#4b6078]">
                            {item.note}
                          </CardDescription>
                        ) : (
                          <span className="h-1 w-12 rounded-full bg-[linear-gradient(90deg,#cf9c51,#d9b46b)]" />
                        )}
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </section>
            );

          case 'ComponentSectionsNewsListSection': {
            const newsSection = section;
            const selected = (newsSection.featuredOnly ? normalizedNews.filter((item) => item.featured) : normalizedNews)
              .slice(0, newsSection.limit || 4);

            return (
              <section key={`${section.__typename}-${index}`} className="shinhan-container home-section-gap">
                <InsightRail
                  eyebrow={locale === 'vi' ? 'Tin tức' : 'News'}
                  title={newsSection.newsTitle || section.title || (locale === 'vi' ? 'Tin tức mới nhất' : 'Latest news')}
                  description={newsSection.description || (locale === 'vi' ? 'Cập nhật thị trường và hoạt động doanh nghiệp.' : 'Market and corporate updates.')}
                  items={(selected || []).slice(0, 3).map((item) => ({
                    meta: item.category?.data?.attributes?.title || item.publishDate,
                    title: item.title,
                    description: item.summary
                  }))}
                />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {selected.map((item) => (
                    <ContentCard
                      key={item.slug}
                      locale={locale}
                      title={item.title}
                      href={buildLocalePath(locale, `/news/${item.slug}`)}
                      summary={item.summary}
                      imageUrl={resolveImage(item.coverImage)}
                      date={item.publishDate}
                      category={item.category?.data?.attributes?.title}
                    />
                  ))}
                </div>
              </section>
            );
          }

          case 'ComponentSectionsResearchListSection': {
            const researchSection = section;
            const selected = (researchSection.featuredOnly ? normalizedResearch.filter((item) => item.featured) : normalizedResearch)
              .slice(0, researchSection.limit || 4);

            return (
              <section key={`${section.__typename}-${index}`} className="shinhan-container home-section-gap">
                <InsightRail
                  eyebrow={locale === 'vi' ? 'Nghiên cứu' : 'Research'}
                  title={researchSection.researchTitle || section.title || (locale === 'vi' ? 'Điểm nhấn nghiên cứu' : 'Research highlights')}
                  description={researchSection.description || (locale === 'vi' ? 'Truy cập nhanh các báo cáo chiến lược và phân tích doanh nghiệp.' : 'Quick access to strategy and company coverage.')}
                  items={(selected || []).slice(0, 3).map((item) => ({
                    meta: resolveRelationLabel(item.reportType) || item.category?.data?.attributes?.title,
                    title: item.title,
                    description: item.summary
                  }))}
                />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {selected.map((item) => (
                    <ContentCard
                      key={item.slug}
                      locale={locale}
                      title={item.title}
                      href={buildLocalePath(locale, `/research/${item.slug}`)}
                      summary={item.summary}
                      imageUrl={resolveImage(item.coverImage)}
                      date={item.publishDate}
                      category={resolveRelationLabel(item.reportType) || item.category?.data?.attributes?.title}
                    />
                  ))}
                </div>
              </section>
            );
          }

          case 'ComponentSectionsFaqSection': {
            const faqSection = section;
            const category = pickFaqCategory(faqCategories, faqSection.faqCategorySlug);
            const items = (category?.items?.data || []).slice(0, faqSection.limit || 5).map((item: any) => ({
              id: item.id,
              question: item.attributes.question,
              answer: item.attributes.answer
            }));

            if (!items.length) return null;

            return (
              <section key={`${section.__typename}-${index}`} className="shinhan-container home-section-gap">
                <JsonLd data={faqJsonLd(items.map((item) => ({ question: item.question, answer: item.answer })))} />
                <FaqAccordion items={items} />
              </section>
            );
          }

          case 'ComponentSectionsCtaSection':
            return (
              <section key={`${section.__typename}-${index}`} className="shinhan-container home-section-gap">
                <CtaSection
                  eyebrow={section.ctaTitle || section.title || (locale === 'vi' ? 'Kêu gọi hành động' : 'Call to action')}
                  title={section.ctaTitle || section.title}
                  description={section.description}
                  actions={
                    <>
                      {section.primaryButton?.href ? (
                        <Link href={resolveLink(locale, section.primaryButton.href)!} className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white">
                          {section.primaryButton.label}
                        </Link>
                      ) : null}
                      {section.secondaryButton?.href ? (
                        <Link href={resolveLink(locale, section.secondaryButton.href)!} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
                          {section.secondaryButton.label}
                        </Link>
                      ) : null}
                    </>
                  }
                />
              </section>
            );

          case 'ComponentSectionsOfficeListSection': {
            const officeSection = section;
            const selected = normalizedOffices.slice(0, 6);

            return (
              <section key={`${section.__typename}-${index}`} className="shinhan-container home-section-gap">
                <div className="home-section-head">
                  <h2 className="text-[1.65rem] font-medium text-[var(--color-primary)] md:text-[2rem]">
                    {officeSection.officeTitle || section.title || (locale === 'vi' ? 'Mạng lưới văn phòng' : 'Office network')}
                  </h2>
                  {officeSection.description ? <p className="mt-2 max-w-3xl text-[15px] leading-7 text-[#4a6178]">{officeSection.description}</p> : null}
                </div>
                <div className="grid gap-4 lg:grid-cols-3">
                  {selected.map((office) => (
                    <Card key={office.slug} tone="default" className="rounded-3xl">
                      <CardBody className="p-5">
                        <h3 className="text-[1.05rem] font-semibold text-[var(--color-primary)]">{resolveOfficeCardLabel(locale, office)}</h3>
                        <CardDescription className="mt-2 text-[14px] leading-6">{office.address}</CardDescription>
                        {office.phone ? <p className="mt-2 text-[13px] text-slate-600">{office.phone}</p> : null}
                        {office.email ? <p className="mt-1 text-[13px] text-slate-600">{office.email}</p> : null}
                        {office.workingHours ? <p className="mt-1 text-[13px] text-slate-500">{office.workingHours}</p> : null}
                        {office.mapUrl ? (
                          <a href={office.mapUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-[13px] font-semibold text-[var(--color-primary)]">
                            {locale === 'vi' ? 'Xem bản đồ' : 'View map'}
                          </a>
                        ) : null}
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </section>
            );
          }

          case 'ComponentSectionsTrustSignalSection':
            return (
              <section key={`${section.__typename}-${index}`} className="shinhan-container home-section-gap">
                <div className="home-section-head">
                  <h2 className="text-[1.65rem] font-medium text-[var(--color-primary)] md:text-[2rem]">
                    {section.trustTitle || section.title || (locale === 'vi' ? 'Nền tảng niềm tin' : 'Trust signals')}
                  </h2>
                  {section.description ? <p className="mt-2 max-w-3xl text-[15px] leading-7 text-[#4a6178]">{section.description}</p> : null}
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {(section.items || []).map((item: any) => (
                    <Card key={item.title} tone="default" className="rounded-3xl">
                      <CardBody className="p-5">
                        <div className="flex items-start gap-3">
                          {resolveImage(item.logo) ? (
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#dbe7f4] bg-white">
                              <Image src={resolveImage(item.logo)!} alt={item.title} width={34} height={34} className="h-8 w-8 object-contain" />
                            </div>
                          ) : null}
                          <div>
                            <h3 className="text-[1.05rem] font-semibold text-[var(--color-primary)]">{item.title}</h3>
                            {item.description ? <CardDescription className="mt-1.5 text-[14px] leading-6">{item.description}</CardDescription> : null}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </section>
            );
          case 'ComponentSectionsHomeEcosystemSection': {
            const quickLinks = (section.quickLinks || []).filter((item: any) => item?.href && item?.label);
            const shortcutLinks = (section.shortcutLinks || []).filter((item: any) => item?.href && item?.label);
            const supportTags =
              locale === 'vi'
                ? ['Dữ liệu thời gian thực', 'Nền tảng giao dịch số', 'Hỗ trợ chuyên gia']
                : ['Realtime data', 'Digital trading platform', 'Expert advisory'];

            return (
              <section key={`${section.__typename}-${index}`} className="shinhan-container home-section-gap">
                <Card tone="tinted" className="home-vt-ecosystem overflow-hidden rounded-3xl px-5 py-5 md:px-6 md:py-6">
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,0.5fr)] lg:items-start">
                    <div className="max-w-none">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7a5a2f]">
                        {section.eyebrow || (locale === 'vi' ? 'Hệ sinh thái đầu tư' : 'Investment ecosystem')}
                      </p>
                      <h2 className="mt-2 text-[1.7rem] font-semibold leading-[1.1] tracking-tight text-[var(--color-primary)] md:text-[2.3rem]">
                        {section.title}
                      </h2>
                      {section.description ? <p className="mt-2.5 max-w-[40rem] text-[15px] leading-7 text-[#3f576d]">{section.description}</p> : null}

                      <div className="mt-4 flex flex-wrap gap-2">
                        {supportTags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full border border-[#d6e3f1] bg-white/86 px-3 py-1 text-[11px] font-medium text-[#5b7288]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {section.primaryButton?.href ? (
                          <Button
                            as="a"
                            href={resolveLink(locale, section.primaryButton.href)!}
                            target={section.primaryButton.target || undefined}
                            rel={section.primaryButton.target === '_blank' ? 'noreferrer' : undefined}
                            className="h-11 rounded-full px-5"
                          >
                            {section.primaryButton.label || (locale === 'vi' ? 'Khám phá nền tảng' : 'Explore platform')}
                          </Button>
                        ) : null}
                        {section.secondaryButton?.href ? (
                          <Button
                            as="a"
                            href={resolveLink(locale, section.secondaryButton.href)!}
                            target={section.secondaryButton.target || undefined}
                            rel={section.secondaryButton.target === '_blank' ? 'noreferrer' : undefined}
                            variant="secondary"
                            className="h-11 rounded-full px-5"
                          >
                            {section.secondaryButton.label || (locale === 'vi' ? 'Tìm hiểu thêm' : 'Learn more')}
                          </Button>
                        ) : null}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#d8e4f0] bg-white/92 p-3.5 md:p-4">
                      {section.marketLabel ? (
                        <span className="inline-flex w-fit rounded-full border border-[#cf9c51]/40 bg-[#fbf3e7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]">
                          {section.marketLabel}
                        </span>
                      ) : null}

                      <div className="mt-3 grid gap-2">
                        {quickLinks.map((item: any) => (
                          <Link
                            key={item.label}
                            href={resolveLink(locale, item.href)!}
                            className="home-link-card group rounded-xl border border-[#d6e3f1] bg-white px-4 py-2.5 text-[14px] font-semibold text-[var(--color-primary)] hover:border-[#cf9c51]/72"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>

                      {shortcutLinks.length ? (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {shortcutLinks.map((item: any) => (
                            <a
                              key={item.label}
                              href={resolveLink(locale, item.href)!}
                              target={item.target === '_blank' || item.href?.startsWith('http') ? '_blank' : undefined}
                              rel={item.target === '_blank' || item.href?.startsWith('http') ? 'noreferrer' : undefined}
                              className="home-link-card rounded-xl border border-[#dec8a3] bg-[#fff9ef] px-3 py-2 text-center text-[14px] font-semibold text-[var(--color-primary)] hover:border-[#cf9c51] hover:bg-white"
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Card>
              </section>
            );
          }
          
            default:
            return null;
        }
      })}
    </div>
  );
}
