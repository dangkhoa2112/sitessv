import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RichText } from '@/components/ui/RichText';
import { assetUrl } from '@/lib/urls';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

type AboutReferenceLayoutProps = {
  locale: string;
  page: {
    title: string;
    summary?: string | null;
    coverImage?: any;
    sections?: Array<Record<string, any>>;
  };
};

type FeatureCard = {
  title?: string;
  description?: string;
  link?: {
    label?: string;
    href?: string;
  };
};

type TimelineItem = {
  year?: string;
  title?: string;
  description?: string;
};

const SECTION_LABELS = {
  vi: {
    who: 'Chúng tôi là ai',
    business: 'Lĩnh vực kinh doanh',
    timeline: 'Lịch sử hình thành',
    leadership: 'Ban lãnh đạo',
    way: 'Shinhan Way',
    one: 'One Shinhan',
    contact: 'Liên hệ'
  },
  en: {
    who: 'Who we are',
    business: 'Business lines',
    timeline: 'Milestones',
    leadership: 'Leadership',
    way: 'Shinhan Way',
    one: 'One Shinhan',
    contact: 'Contact'
  }
} as const;

function normalizeText(value?: string | null) {
  return (value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function matchesTitle(value: string | undefined, needles: string[]) {
  const haystack = normalizeText(value);
  return needles.some((needle) => haystack.includes(normalizeText(needle)));
}

function normalizeType(value?: string) {
  return normalizeText(value).replace(/[^a-z0-9]/g, '');
}

function matchesSectionType(item: Record<string, any>, component: string) {
  const candidates = [item.__typename, item.__component].filter(Boolean).map((value) => normalizeType(value as string));
  const expected = normalizeType(component);
  return candidates.some((candidate) => candidate.includes(expected) || expected.includes(candidate));
}

function findSection<T extends Record<string, any>>(
  sections: Array<Record<string, any>> | undefined,
  component: string,
  titleNeedles: string[]
): T | null {
  const section = sections?.find(
    (item) => matchesSectionType(item, component) && matchesTitle(item.title || item.richTitle || item.featureTitle || item.timelineTitle, titleNeedles)
  );
  return (section || null) as T | null;
}

function getLocaleLabels(locale: string) {
  return locale === 'vi' ? SECTION_LABELS.vi : SECTION_LABELS.en;
}

function isExternalLink(href?: string) {
  return Boolean(href && /^https?:\/\//.test(href));
}

function SmartLink({
  href,
  className,
  children,
  target,
  rel
}: {
  href?: string;
  className: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}) {
  if (!href) return null;

  if (isExternalLink(href)) {
    return (
      <a href={href} className={className} target={target || '_blank'} rel={rel || 'noreferrer'}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} target={target} rel={rel}>
      {children}
    </Link>
  );
}

function sectionAnchor(component: string, index: number) {
  return `${component}-${index}`;
}

function pickHeroImage(hero?: Record<string, any> | null, coverImage?: Record<string, any> | null) {
  return (
    assetUrl(coverImage?.data?.attributes?.url) ||
    assetUrl(hero?.backgroundImage?.data?.attributes?.url) ||
    SHINHAN_VISUALS.about.hero
  );
}

function oneShinhanVisual(title?: string): { logo: string | StaticImageData; alt: string; href: string } {
  const normalized = normalizeText(title);
  if (normalized.includes('ngan hang') || normalized.includes('banking')) {
    return { logo: SHINHAN_VISUALS.services.partnerBank, alt: title || 'Banking', href: 'https://shinhan.com.vn' };
  }
  if (normalized.includes('giai phap cong nghe') || normalized.includes('technology')) {
    return { logo: SHINHAN_VISUALS.services.partnerDs, alt: title || 'Technology solutions', href: 'https://shinhands.com.vn' };
  }
  if (normalized.includes('chung khoan') || normalized.includes('securities')) {
    return { logo: SHINHAN_VISUALS.services.brokerage.icon, alt: title || 'Securities', href: '/vi/about' };
  }
  if (normalized.includes('bao hiem') || normalized.includes('insurance')) {
    return { logo: SHINHAN_VISUALS.services.partnerLife, alt: title || 'Insurance', href: 'https://shinhanlifevn.com.vn' };
  }
  return { logo: SHINHAN_VISUALS.services.partnerFinance, alt: title || 'Finance', href: 'https://www.shinhanfinance.com.vn' };
}

export function AboutReferenceLayout({ locale, page }: AboutReferenceLayoutProps) {
  const labels = getLocaleLabels(locale);
  const sections = page.sections || [];

  const hero = findSection<Record<string, any>>(sections, 'sections.hero-block', [page.title, locale === 'vi' ? 'Về chúng tôi' : 'About us']) || {
    title: page.title,
    subtitle: page.summary
  };
  const who = findSection<Record<string, any>>(sections, 'sections.rich-text-block', [labels.who]);
  const business = findSection<Record<string, any>>(sections, 'sections.feature-card-section', [labels.business]);
  const timeline = findSection<Record<string, any>>(sections, 'sections.timeline-section', [labels.timeline]);
  const quote = findSection<Record<string, any>>(sections, 'sections.quote-section', [labels.leadership]);
  const leadership = sections.find(
    (item) =>
      matchesSectionType(item, 'sections.rich-text-block') &&
      item !== who &&
      matchesTitle(item.title, [labels.leadership])
  ) as Record<string, any> | null;
  const way = findSection<Record<string, any>>(sections, 'sections.rich-text-block', [labels.way]);
  const oneShinhan = findSection<Record<string, any>>(sections, 'sections.feature-card-section', [labels.one]);
  const cta = sections.find((item) => matchesSectionType(item, 'sections.cta-section')) as Record<string, any> | null;
  const heroIntro = hero.subtitle || page.summary;
  const pageSynopsis = page.summary && page.summary !== hero.subtitle ? page.summary : null;

  const navItems = [
    { label: labels.who, href: `#${sectionAnchor('who', 0)}` },
    { label: labels.business, href: `#${sectionAnchor('business', 0)}` },
    { label: labels.timeline, href: `#${sectionAnchor('timeline', 0)}` },
    { label: labels.leadership, href: `#${sectionAnchor('leadership', 0)}` },
    { label: labels.way, href: `#${sectionAnchor('way', 0)}` },
    { label: labels.one, href: `#${sectionAnchor('one', 0)}` },
    { label: labels.contact, href: `#${sectionAnchor('cta', 0)}` }
  ] as Array<{ label: string; href: string }>;

  const businessItems = (business?.items || []) as FeatureCard[];
  const oneItems = (oneShinhan?.items || []) as FeatureCard[];
  const timelineItems = (timeline?.items || []) as TimelineItem[];
  const businessIcons = [
    SHINHAN_VISUALS.services.brokerage.icon,
    SHINHAN_VISUALS.services.investmentBanking.icon,
    SHINHAN_VISUALS.services.research.icon
  ];

  return (
    <div className="about-reference-wrap">
      <div className="about-reference-top">
        <Breadcrumbs
          items={[
            { label: locale === 'vi' ? 'Trang chủ' : 'Home', href: `/${locale}` },
            { label: locale === 'vi' ? 'Giới thiệu' : 'About', href: `/${locale}/about` }
          ]}
        />

        <section className="about-reference-masthead">
          <div className="about-reference-masthead-copy">
            <p className="about-reference-eyebrow">{hero.kicker || (locale === 'vi' ? 'Về chúng tôi' : 'About us')}</p>
            <h1 className="about-reference-title">{page.title}</h1>
            {heroIntro ? <p className="about-reference-summary">{heroIntro}</p> : null}
            {pageSynopsis ? <p className="about-reference-summary about-reference-summary--compact">{pageSynopsis}</p> : null}
            <div className="about-reference-chip-row">
              {[
                locale === 'vi' ? 'Môi giới chứng khoán' : 'Securities brokerage',
                locale === 'vi' ? 'Ngân hàng đầu tư' : 'Investment banking',
                'One Shinhan',
                'Vietnam market'
              ].map((item) => (
                <span key={item} className="about-reference-chip">
                  {item}
                </span>
              ))}
            </div>
            <div className="about-reference-action-row">
              {hero.primaryButton?.href ? (
                <SmartLink href={hero.primaryButton.href} className="about-reference-primary-btn">
                  {hero.primaryButton.label}
                </SmartLink>
              ) : null}
              {hero.secondaryButton?.href ? (
                <SmartLink href={hero.secondaryButton.href} className="about-reference-secondary-btn">
                  {hero.secondaryButton.label}
                </SmartLink>
              ) : null}
            </div>
          </div>

          <div className="about-reference-masthead-visual">
            <Image
              src={pickHeroImage(hero, page.coverImage)}
              alt={hero.title || page.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 36vw"
              className="about-reference-hero-image"
            />
            <div className="about-reference-visual-overlay">
              <p className="about-reference-visual-kicker">{locale === 'vi' ? 'Tổng quan doanh nghiệp' : 'Corporate Overview'}</p>
              <p className="about-reference-visual-copy">
                {locale === 'vi'
                  ? 'Bố cục này tóm lược lịch sử, năng lực dịch vụ và hệ sinh thái One Shinhan theo cách dễ đọc hơn cho nhà đầu tư.'
                  : 'This layout summarizes the company history, service capabilities, and One Shinhan ecosystem in an easier-to-scan format.'}
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="about-reference-grid">
        <aside className="about-reference-sidebar">
          <div className="about-reference-sidebar-card">
            <p className="about-reference-sidebar-title">{locale === 'vi' ? 'Mục lục' : 'Contents'}</p>
            <nav className="about-reference-nav" aria-label={locale === 'vi' ? 'Điều hướng trang giới thiệu' : 'About page navigation'}>
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="about-reference-nav-link">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="about-reference-sidebar-card about-reference-sidebar-card--soft">
            <p className="about-reference-sidebar-title">{locale === 'vi' ? 'Điểm nhấn' : 'Highlights'}</p>
            <ul className="about-reference-list">
              <li>{locale === 'vi' ? '100% vốn từ Shinhan Financial Group' : '100% owned by Shinhan Financial Group'}</li>
              <li>{locale === 'vi' ? 'Kết nối One Shinhan tại Việt Nam' : 'Connected to the One Shinhan ecosystem'}</li>
              <li>{locale === 'vi' ? 'Tập trung môi giới và IB' : 'Focused on brokerage and investment banking'}</li>
            </ul>
          </div>
        </aside>

        <main className="about-reference-main">
          {who ? (
            <section id={sectionAnchor('who', 0)} className="about-reference-section about-reference-section--split">
              <div className="about-reference-section-head">
                <p className="about-reference-section-kicker">{labels.who}</p>
                <h2 className="about-reference-section-title">{who.title}</h2>
              </div>
              <div className="about-reference-split">
                <div className="about-reference-copy">
                  <RichText html={who.content} />
                </div>
                <div className="about-reference-media">
                  <Image
                    src={SHINHAN_VISUALS.about.overview}
                    alt={who.title || labels.who}
                    fill
                    sizes="(max-width: 768px) 100vw, 34vw"
                    className="about-reference-media-image"
                  />
                </div>
              </div>
            </section>
          ) : null}

          {businessItems.length ? (
            <section id={sectionAnchor('business', 0)} className="about-reference-section">
              <div className="about-reference-section-head">
                <p className="about-reference-section-kicker">{labels.business}</p>
                <h2 className="about-reference-section-title">{business?.title || labels.business}</h2>
                {business?.description ? <p className="about-reference-section-desc">{business.description}</p> : null}
              </div>
              <div className="about-reference-feature-grid">
                {businessItems.map((item, index) => (
                  <article key={`${item.title}-${index}`} className="about-reference-feature-card">
                    <div className="about-reference-feature-icon">
                      <Image
                        src={businessIcons[index % businessIcons.length]}
                        alt=""
                        width={40}
                        height={40}
                      />
                    </div>
                    <h3 className="about-reference-feature-title">{item.title}</h3>
                    {item.description ? <p className="about-reference-feature-desc">{item.description}</p> : null}
                    {item.link?.href ? (
                      <SmartLink href={item.link.href} className="about-reference-feature-link">
                        {item.link.label || (locale === 'vi' ? 'Xem thêm' : 'Learn more')}
                      </SmartLink>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {timelineItems.length ? (
            <section id={sectionAnchor('timeline', 0)} className="about-reference-section">
              <div className="about-reference-section-head">
                <p className="about-reference-section-kicker">{labels.timeline}</p>
                <h2 className="about-reference-section-title">{timeline?.title || labels.timeline}</h2>
              </div>
              <ol className="about-reference-timeline">
                {timelineItems.map((item, index) => (
                  <li key={`${item.year}-${index}`} className="about-reference-timeline-item">
                    <div className="about-reference-timeline-year">{item.year}</div>
                    <div className="about-reference-timeline-card">
                      <h3 className="about-reference-timeline-title">{item.title}</h3>
                      {item.description ? <p className="about-reference-timeline-desc">{item.description}</p> : null}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <section id={sectionAnchor('leadership', 0)} className="about-reference-section about-reference-section--leadership">
            <div className="about-reference-section-head">
              <p className="about-reference-section-kicker">{labels.leadership}</p>
              <h2 className="about-reference-section-title">{locale === 'vi' ? 'Ban lãnh đạo' : 'Leadership'}</h2>
            </div>
              <div className="about-reference-leadership-grid">
              <div className="about-reference-leadership-card">
                <Image
                  src={SHINHAN_VISUALS.about.leadership}
                  alt={locale === 'vi' ? 'Ban lãnh đạo' : 'Leadership'}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="about-reference-leadership-image"
                />
              </div>
              <div className="about-reference-quote-panel">
                {quote?.quote ? <blockquote className="about-reference-quote">“{quote.quote}”</blockquote> : null}
                {(quote?.author || quote?.role) ? (
                  <p className="about-reference-quote-meta">
                    {quote?.author}
                    {quote?.role ? ` · ${quote.role}` : ''}
                  </p>
                ) : null}
                {leadership?.content ? (
                  <RichText html={leadership.content} />
                ) : (
                  <p className="about-reference-section-desc">
                    {locale === 'vi'
                      ? 'Thông tin ban lãnh đạo đang được cập nhật.'
                      : 'Leadership information is being updated.'}
                  </p>
                )}
              </div>
            </div>
          </section>

          {way ? (
            <section id={sectionAnchor('way', 0)} className="about-reference-section">
              <div className="about-reference-section-head">
                <p className="about-reference-section-kicker">{labels.way}</p>
                <h2 className="about-reference-section-title">{way.title || labels.way}</h2>
                {way.content ? <p className="about-reference-section-desc">{locale === 'vi' ? 'Tuyên bố sứ mệnh, giá trị cốt lõi và tầm nhìn.' : 'Mission, core values, and vision.'}</p> : null}
              </div>
              <div className="about-reference-way-grid">
                <div className="about-reference-way-copy">
                  <RichText html={way.content} />
                </div>
                <div className="about-reference-way-cards">
                  <article className="about-reference-mini-card">
                    <p className="about-reference-mini-label">{locale === 'vi' ? 'Sứ mệnh' : 'Mission'}</p>
                    <p className="about-reference-mini-text">
                      {locale === 'vi' ? 'Một thế giới tốt hơn thông qua Tài chính Shinhan.' : 'A better world through Shinhan finance.'}
                    </p>
                  </article>
                  <article className="about-reference-mini-card">
                    <p className="about-reference-mini-label">{locale === 'vi' ? 'Giá trị cốt lõi' : 'Core values'}</p>
                    <div className="about-reference-pill-list">
                      {(
                        locale === 'vi'
                          ? ['Khách hàng', 'Tôn trọng', 'Thay đổi', 'Xuất sắc', 'Sở hữu']
                          : ['Customer', 'Mutual Respect', 'Change', 'Excellence', 'Ownership']
                      ).map((value) => (
                        <span key={value} className="about-reference-pill">
                          {value}
                        </span>
                      ))}
                    </div>
                  </article>
                  <article className="about-reference-mini-card">
                    <p className="about-reference-mini-label">{locale === 'vi' ? 'Tầm nhìn' : 'Vision'}</p>
                    <p className="about-reference-mini-text">
                      {locale === 'vi' ? 'Tập đoàn tài chính đẳng cấp thế giới.' : 'A world-class financial group.'}
                    </p>
                  </article>
                </div>
              </div>
            </section>
          ) : null}

          {oneItems.length ? (
            <section id={sectionAnchor('one', 0)} className="about-reference-section">
              <div className="about-reference-section-head">
                <p className="about-reference-section-kicker">{labels.one}</p>
                <h2 className="about-reference-section-title">{oneShinhan?.title || labels.one}</h2>
                {oneShinhan?.description ? <p className="about-reference-section-desc">{oneShinhan.description}</p> : null}
              </div>
              <div className="about-reference-partner-grid">
                {oneItems.map((item, index) => {
                  const visual = oneShinhanVisual(item.title);
                  return (
                    <article key={`${item.title}-${index}`} className="about-reference-partner-card">
                      <div className="about-reference-partner-brand">
                        <Image src={visual.logo} alt={visual.alt} width={52} height={52} />
                        <div>
                          <h3 className="about-reference-partner-title">{item.title}</h3>
                          {item.description ? <p className="about-reference-partner-desc">{item.description}</p> : null}
                        </div>
                      </div>
                      {item.link?.href ? (
                        <SmartLink href={item.link.href} className="about-reference-partner-link" target={isExternalLink(item.link.href) ? '_blank' : undefined}>
                          {item.link.label || (locale === 'vi' ? 'Xem thêm' : 'Learn more')}
                        </SmartLink>
                      ) : null}
                    </article>
                  );
                })}
              </div>
              <div className="about-reference-brand-panel">
                <div className="about-reference-brand-visual">
                  <Image
                    src={SHINHAN_VISUALS.about.overview}
                    alt={locale === 'vi' ? 'One Shinhan' : 'One Shinhan'}
                    fill
                    sizes="(max-width: 768px) 100vw, 26vw"
                    className="about-reference-brand-visual-image"
                  />
                  <div className="about-reference-brand-visual-overlay">
                    <Image src={SHINHAN_VISUALS.brand.footerLogo} alt="Shinhan Securities Vietnam" width={240} height={44} />
                  </div>
                </div>
                <p>
                  {locale === 'vi'
                    ? 'Bằng góc độ của khách hàng, chúng tôi luôn cố gắng hết sức để đáp ứng những trải nghiệm và nhu cầu đa dạng với các sản phẩm và dịch vụ tốt nhất tập hợp bởi Tập đoàn Shinhan.'
                    : 'From a customer perspective, we aim to meet diverse needs with the best products and services assembled by Shinhan Group.'}
                </p>
              </div>
            </section>
          ) : null}

          {cta ? (
            <section id={sectionAnchor('cta', 0)} className="about-reference-section">
              <div className="about-reference-cta">
                <div>
                  <p className="about-reference-section-kicker">{labels.contact}</p>
                  <h2 className="about-reference-section-title">{cta.title}</h2>
                  {cta.description ? <p className="about-reference-section-desc about-reference-section-desc--light">{cta.description}</p> : null}
                </div>
                <div className="about-reference-cta-actions">
                  {cta.primaryButton?.href ? (
                    <SmartLink href={cta.primaryButton.href} className="about-reference-primary-btn">
                      {cta.primaryButton.label}
                    </SmartLink>
                  ) : null}
                  {cta.secondaryButton?.href ? (
                    <SmartLink href={cta.secondaryButton.href} className="about-reference-secondary-btn about-reference-secondary-btn--ghost">
                      {cta.secondaryButton.label}
                    </SmartLink>
                  ) : null}
                </div>
              </div>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}
