'use client';

import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { RichText } from '@/components/ui/RichText';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

type AboutStoryRendererProps = {
  sections?: Array<any>;
  locale: string;
};

type NavItem = {
  id: string;
  label: string;
};

function pickFirst<T>(...values: Array<T | undefined | null>) {
  for (const value of values) {
    if (value !== undefined && value !== null) {
      return value;
    }
  }
  return undefined;
}

const oneShinhanVisualMap: Record<string, { logo: string | StaticImageData; href: string }> = {
  'Ngân hàng': { logo: SHINHAN_VISUALS.services.partnerBank, href: 'https://shinhan.com.vn' },
  Banking: { logo: SHINHAN_VISUALS.services.partnerBank, href: 'https://shinhan.com.vn' },
  'Giải pháp công nghệ': { logo: SHINHAN_VISUALS.services.partnerDs, href: 'https://shinhands.com.vn' },
  'Technology solutions': { logo: SHINHAN_VISUALS.services.partnerDs, href: 'https://shinhands.com.vn' },
  'Chứng khoán': { logo: SHINHAN_VISUALS.services.brokerage.icon, href: '/vi/gioi-thieu' },
  Securities: { logo: SHINHAN_VISUALS.services.brokerage.icon, href: '/en/about' },
  'Bảo hiểm': { logo: SHINHAN_VISUALS.services.partnerLife, href: 'https://shinhanlifevn.com.vn' },
  Insurance: { logo: SHINHAN_VISUALS.services.partnerLife, href: 'https://shinhanlifevn.com.vn' },
  'Tài chính': { logo: SHINHAN_VISUALS.services.partnerFinance, href: 'https://www.shinhanfinance.com.vn' },
  Finance: { logo: SHINHAN_VISUALS.services.partnerFinance, href: 'https://www.shinhanfinance.com.vn' }
};

const richSectionVisualMap: Record<string, string | StaticImageData> = {
  'Chúng tôi là ai': SHINHAN_VISUALS.about.hero,
  'Who we are': SHINHAN_VISUALS.about.hero,
  Leadership: SHINHAN_VISUALS.about.leadership,
  'Shinhan Way': SHINHAN_VISUALS.about.overview,
  'Thông điệp One Shinhan': SHINHAN_VISUALS.about.overview
};

function stripHtmlTags(value: string) {
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function parseParagraphs(html: string) {
  const found = Array.from(html.matchAll(/<p>(.*?)<\/p>/gi)).map((m) => stripHtmlTags(m[1] || ''));
  if (found.length) return found;
  const fallback = stripHtmlTags(html);
  return fallback ? [fallback] : [];
}

function shorten(value: string, max = 132) {
  if (value.length <= max) return value;
  return `${value.slice(0, max).trimEnd()}...`;
}

function sectionTitleOf(section: any) {
  switch (section.__typename) {
    case 'ComponentSectionsHeroBlock':
      return pickFirst(section.heroTitle, section.title);
    case 'ComponentSectionsRichTextBlock':
      return pickFirst(section.richTitle, section.title);
    case 'ComponentSectionsFeatureCardSection':
      return pickFirst(section.featureTitle, section.title);
    case 'ComponentSectionsTimelineSection':
      return pickFirst(section.timelineTitle, section.title);
    case 'ComponentSectionsQuoteSection':
      return section.role || 'Leadership';
    case 'ComponentSectionsCtaSection':
      return pickFirst(section.ctaTitle, section.title);
    default:
      return undefined;
  }
}

function shouldAppearInNav(section: any) {
  return [
    'ComponentSectionsRichTextBlock',
    'ComponentSectionsFeatureCardSection',
    'ComponentSectionsTimelineSection',
    'ComponentSectionsQuoteSection'
  ].includes(section.__typename);
}

function sectionId(section: any, index: number) {
  switch (section.__typename) {
    case 'ComponentSectionsRichTextBlock':
      return `about-rich-${index}`;
    case 'ComponentSectionsFeatureCardSection':
      return `about-feature-${index}`;
    case 'ComponentSectionsTimelineSection':
      return `about-timeline-${index}`;
    case 'ComponentSectionsQuoteSection':
      return `about-leadership-${index}`;
    default:
      return `about-section-${index}`;
  }
}

export function AboutStoryRenderer({ sections, locale }: AboutStoryRendererProps) {
  const reducedMotion = useReducedMotion();
  if (!sections?.length) return null;
  const layoutVariant: 'clean-minimal' | 'ultra-clean' = 'ultra-clean';

  const navItems: NavItem[] = sections
    .map((section, idx) => ({
      id: sectionId(section, idx),
      label: sectionTitleOf(section)
    }))
    .filter((item, idx) => {
      const sec = sections[idx];
      return shouldAppearInNav(sec) && !!item.label;
    })
    .map((item) => ({ id: item.id, label: item.label as string }));

  const handleNavJump = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 }
  };
  const rootClassName = `about-story-wrap about-story-wrap--clean ${layoutVariant === 'ultra-clean' ? 'about-story-wrap--ultra' : ''}`;

  return (
    <div className={rootClassName}>
      {navItems.length ? (
        <div className="about-sticky-nav-wrap">
          <nav className="about-sticky-nav" aria-label={locale === 'vi' ? 'Điều hướng nội dung trang giới thiệu' : 'About page section navigation'}>
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="about-sticky-nav-link"
                onClick={() => handleNavJump(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      ) : null}

      {sections.map((section, sectionIndex) => {
        const id = sectionId(section, sectionIndex);
        switch (section.__typename) {
          case 'ComponentSectionsHeroBlock':
            return (
              <motion.section
                key={`${section.__typename}-${sectionIndex}`}
                id={id}
                className="about-hero-surface"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="about-hero-grid">
                  <div>
                    {section.kicker ? <p className="about-kicker">{section.kicker}</p> : null}
                    <h2 className="about-hero-title">{pickFirst(section.heroTitle, section.title)}</h2>
                    {section.subtitle ? <p className="about-hero-subtitle">{section.subtitle}</p> : null}
                  </div>
                  <div className="about-hero-visual fx-float">
                    <Image
                      src={SHINHAN_VISUALS.about.storyHero}
                      alt={locale === 'vi' ? 'Đội ngũ chuyên gia tài chính' : 'Financial advisory team'}
                      width={920}
                      height={560}
                      className="about-hero-image"
                    />
                  </div>
                </div>
              </motion.section>
            );

          case 'ComponentSectionsRichTextBlock':
            return (
              <motion.section
                key={`${section.__typename}-${sectionIndex}`}
                id={id}
                className="about-rich-card"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: Math.min(sectionIndex * 0.02, 0.2), ease: [0.22, 1, 0.36, 1] }}
              >
                {pickFirst(section.richTitle, section.title) ? <h3 className="about-block-title">{pickFirst(section.richTitle, section.title)}</h3> : null}
                {(() => {
                  const title = pickFirst(section.richTitle, section.title) || '';
                  const paragraphs = parseParagraphs(section.content || '');
                  const lead = paragraphs[0];
                  const extra = paragraphs.slice(1);
                  const visual = layoutVariant === 'ultra-clean' ? undefined : richSectionVisualMap[title];

                  return (
                    <div className={`about-rich-grid ${visual ? 'about-rich-grid--with-visual' : ''}`}>
                      <div>
                        {lead ? <p className="about-rich-lead">{lead}</p> : null}
                        {extra.length ? (
                          <details className="about-rich-details">
                            <summary className="about-rich-summary">{locale === 'vi' ? 'Xem chi tiết' : 'View details'}</summary>
                            <div className="about-rich-detail-body">
                              <RichText html={extra.map((p) => `<p>${p}</p>`).join('')} />
                            </div>
                          </details>
                        ) : null}
                      </div>
                      {visual ? (
                        <div className="about-rich-visual">
                          <Image
                            src={visual}
                            alt={title}
                            width={640}
                            height={400}
                            className="about-rich-visual-img"
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                })()}
              </motion.section>
            );

          case 'ComponentSectionsFeatureCardSection': {
            const title = pickFirst(section.featureTitle, section.title) || '';
            const isOneShinhan = title.toLowerCase().includes('one shinhan');

            return (
              <motion.section
                key={`${section.__typename}-${sectionIndex}`}
                id={id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={`about-feature-head ${isOneShinhan ? 'about-feature-head--one' : ''}`}>
                  {title ? <h3 className="about-block-title">{title}</h3> : null}
                  {section.description ? <p className="about-block-subtitle">{section.description}</p> : null}
                </div>

                <div className={`about-feature-grid ${isOneShinhan ? 'about-feature-grid--five' : ''}`}>
                  {(section.items || []).map((item: any, itemIndex: number) => {
                    const visual = layoutVariant === 'ultra-clean' ? undefined : oneShinhanVisualMap[item.title];
                    const href = item.link?.href || visual?.href || '#';

                    return (
                      <motion.article
                        key={`${item.title}-${itemIndex}`}
                        className={`about-feature-card ${isOneShinhan ? 'about-feature-card--one' : ''}`}
                        initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.42, delay: itemIndex * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {visual ? (
                          <div className="about-feature-icon">
                            <Image src={visual.logo} alt={item.title} width={60} height={60} className="h-10 w-10 object-contain" />
                          </div>
                        ) : null}
                        <h4 className="about-feature-title">{item.title}</h4>
                        {item.description ? <p className="about-feature-desc">{shorten(item.description, isOneShinhan ? 96 : 118)}</p> : null}
                        {item.description && item.description.length > (isOneShinhan ? 96 : 118) ? (
                          <details className="about-feature-details">
                            <summary>{locale === 'vi' ? 'Đọc thêm' : 'Read more'}</summary>
                            <p>{item.description}</p>
                          </details>
                        ) : null}
                        {href ? (
                          <Link href={href} className="about-feature-link" target={href.startsWith('http') ? '_blank' : '_self'} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
                            {item.link?.label || (locale === 'vi' ? 'Xem thêm' : 'Learn more')}
                          </Link>
                        ) : null}
                      </motion.article>
                    );
                  })}
                </div>
              </motion.section>
            );
          }

          case 'ComponentSectionsTimelineSection':
            return (
              <motion.section
                key={`${section.__typename}-${sectionIndex}`}
                id={id}
                className="about-timeline-shell"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {pickFirst(section.timelineTitle, section.title) ? <h3 className="about-block-title">{pickFirst(section.timelineTitle, section.title)}</h3> : null}
                <ol className="about-timeline-list about-timeline-list--desktop">
                  {(section.items || []).map((item: any, itemIndex: number) => (
                    <motion.li
                      key={`${item.year}-${itemIndex}`}
                      className="about-timeline-item"
                      initial={{ opacity: 0, x: reducedMotion ? 0 : -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.38, delay: itemIndex * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="about-timeline-year">{item.year}</p>
                      <div className="about-timeline-content">
                        <h4 className="about-timeline-title">{item.title}</h4>
                        {item.description ? <p className="about-timeline-desc">{item.description}</p> : null}
                      </div>
                    </motion.li>
                  ))}
                </ol>

                <div className="about-timeline-accordion">
                  {(section.items || []).map((item: any, itemIndex: number) => (
                    <details key={`${item.year}-accordion-${itemIndex}`} className="about-timeline-accordion-item" open={itemIndex === 0}>
                      <summary className="about-timeline-accordion-summary">
                        <span className="about-timeline-year">{item.year}</span>
                        <span className="about-timeline-accordion-title">{item.title}</span>
                      </summary>
                      {item.description ? <p className="about-timeline-accordion-desc">{item.description}</p> : null}
                    </details>
                  ))}
                </div>
              </motion.section>
            );

          case 'ComponentSectionsQuoteSection':
            return (
              <motion.section
                key={`${section.__typename}-${sectionIndex}`}
                id={id}
                className="about-quote-wrap"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="about-quote-mark">“</div>
                <blockquote className="about-quote-text">{section.quote}</blockquote>
                {(section.author || section.role) ? (
                  <p className="about-quote-meta">
                    {section.author}
                    {section.role ? ` · ${section.role}` : ''}
                  </p>
                ) : null}
              </motion.section>
            );

          case 'ComponentSectionsCtaSection':
            return (
              <motion.section
                key={`${section.__typename}-${sectionIndex}`}
                id={id}
                className="about-cta-panel fx-shine"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {pickFirst(section.ctaTitle, section.title) ? <h3 className="about-block-title about-block-title--light">{pickFirst(section.ctaTitle, section.title)}</h3> : null}
                {section.description ? <p className="about-cta-desc">{section.description}</p> : null}
                <div className="about-cta-actions">
                  {section.primaryButton?.href ? (
                    <Link href={section.primaryButton.href} className="about-cta-btn about-cta-btn--primary">
                      {section.primaryButton.label}
                    </Link>
                  ) : null}
                  {section.secondaryButton?.href ? (
                    <Link href={section.secondaryButton.href} className="about-cta-btn about-cta-btn--ghost">
                      {section.secondaryButton.label}
                    </Link>
                  ) : null}
                </div>
              </motion.section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
