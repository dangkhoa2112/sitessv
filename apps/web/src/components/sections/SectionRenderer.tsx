import Image from 'next/image';
import Link from 'next/link';
import { RichText } from '@/components/ui/RichText';
import { assetUrl } from '@/lib/urls';

function pickFirst<T>(...values: Array<T | undefined | null>) {
  for (const value of values) {
    if (value !== undefined && value !== null) {
      return value;
    }
  }
  return undefined;
}

export function SectionRenderer({ sections, locale }: { sections?: Array<any>; locale?: 'vi' | 'en' }) {
  if (!sections?.length) return null;

  return (
    <div className="space-y-6">
      {sections.map((section, index) => {
        switch (section.__typename) {
          case 'ComponentSectionsHeroBlock': {
            const heroImage = assetUrl(section.backgroundImage?.data?.attributes?.url);
            return (
              <section key={`${section.__typename}-${index}`} className="subpage-glass-card overflow-hidden p-0">
                <div className={`grid gap-0 ${heroImage ? 'md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]' : ''}`}>
                  <div className="p-5">
                    {pickFirst(section.heroTitle, section.title) ? (
                      <h2 className="mb-2 text-[1.5rem] font-semibold tracking-tight text-slate-900">{pickFirst(section.heroTitle, section.title)}</h2>
                    ) : null}
                    {section.subtitle ? <p className="text-slate-600">{section.subtitle}</p> : null}
                  </div>
                  {heroImage ? (
                    <div className="relative min-h-44 md:min-h-56">
                      <Image
                        src={heroImage}
                        alt={pickFirst(section.heroTitle, section.title) || 'Hero'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 36vw"
                      />
                    </div>
                  ) : null}
                </div>
              </section>
            );
          }

          case 'ComponentSectionsRichTextBlock':
            return (
              <section key={`${section.__typename}-${index}`} className="subpage-glass-card p-5">
                {pickFirst(section.richTitle, section.title) ? (
                  <h2 className="mb-3 text-[1.5rem] font-semibold tracking-tight text-slate-900">{pickFirst(section.richTitle, section.title)}</h2>
                ) : null}
                <RichText html={section.content} />
              </section>
            );

          case 'ComponentSectionsFeatureCardSection':
            return (
              <section key={`${section.__typename}-${index}`}>
                {pickFirst(section.featureTitle, section.title) ? (
                  <h2 className="text-[1.5rem] font-semibold tracking-tight text-slate-900">{pickFirst(section.featureTitle, section.title)}</h2>
                ) : null}
                {section.description ? <p className="mt-2 text-slate-600">{section.description}</p> : null}
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {(section.items || []).map((item: any, itemIndex: number) => (
                    <article key={`${item.title}-${itemIndex}`} className="subpage-soft-card">
                      <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                      {item.description ? <p className="mt-1.5 text-sm text-slate-600">{item.description}</p> : null}
                      {item.link?.href ? (
                        <Link href={item.link.href} className="mt-2 inline-flex text-sm font-semibold text-[var(--color-primary)]">
                          {item.link.label || 'Learn more'}
                        </Link>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            );

          case 'ComponentSectionsStatsSection':
            return (
              <section key={`${section.__typename}-${index}`} className="rounded-2xl border border-white/20 bg-slate-900/90 p-5 text-white">
                {pickFirst(section.statsTitle, section.title) ? (
                  <h2 className="text-[1.5rem] font-semibold tracking-tight">{pickFirst(section.statsTitle, section.title)}</h2>
                ) : null}
                <div className="mt-3 grid gap-3 md:grid-cols-4">
                  {(section.items || []).map((item: any, itemIndex: number) => (
                    <div key={`${item.label}-${itemIndex}`}>
                      <p className="text-2xl font-bold">{item.value}</p>
                      <p className="text-sm text-slate-300">{item.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'ComponentSectionsTimelineSection':
            return (
              <section key={`${section.__typename}-${index}`}>
                {pickFirst(section.timelineTitle, section.title) ? (
                  <h2 className="text-[1.5rem] font-semibold tracking-tight text-slate-900">{pickFirst(section.timelineTitle, section.title)}</h2>
                ) : null}
                <ol className="mt-3 space-y-3">
                  {(section.items || []).map((item: any, itemIndex: number) => (
                    <li key={`${item.year}-${itemIndex}`} className="subpage-soft-card">
                      <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-primary)]">{item.year}</p>
                      <h3 className="mt-1 font-semibold text-slate-900">{item.title}</h3>
                      {item.description ? <p className="mt-1 text-sm text-slate-600">{item.description}</p> : null}
                    </li>
                  ))}
                </ol>
              </section>
            );

          case 'ComponentSectionsCtaSection':
            return (
              <section key={`${section.__typename}-${index}`} className="subpage-glass-card bg-[var(--color-primary)]/[0.08] p-5">
                {pickFirst(section.ctaTitle, section.title) ? (
                  <h2 className="text-[1.5rem] font-semibold tracking-tight text-slate-900">{pickFirst(section.ctaTitle, section.title)}</h2>
                ) : null}
                {section.description ? <p className="mt-1.5 text-slate-700">{section.description}</p> : null}
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {section.primaryButton?.href ? (
                    <Link href={section.primaryButton.href} className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white">
                      {section.primaryButton.label}
                    </Link>
                  ) : null}
                  {section.secondaryButton?.href ? (
                    <Link href={section.secondaryButton.href} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
                      {section.secondaryButton.label}
                    </Link>
                  ) : null}
                </div>
              </section>
            );

          case 'ComponentSectionsTableBlock':
            return (
              <section key={`${section.__typename}-${index}`} className="subpage-glass-card overflow-hidden p-0">
                {pickFirst(section.tableTitle, section.title) ? (
                  <h2 className="border-b border-slate-200/80 px-5 py-3 text-lg font-semibold text-slate-900">{pickFirst(section.tableTitle, section.title)}</h2>
                ) : null}
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-5 py-2.5">{section.column1Label}</th>
                      <th className="px-5 py-2.5">{section.column2Label}</th>
                      {section.column3Label ? <th className="px-5 py-2.5">{section.column3Label}</th> : null}
                      {section.column4Label ? <th className="px-5 py-2.5">{section.column4Label}</th> : null}
                    </tr>
                  </thead>
                  <tbody>
                    {(section.rows || []).map((row: any, rowIndex: number) => (
                      <tr key={`${row.col1}-${rowIndex}`} className="border-t border-slate-100">
                        <td className="px-5 py-2.5">{row.col1}</td>
                        <td className="px-5 py-2.5">{row.col2}</td>
                        {section.column3Label ? <td className="px-5 py-2.5">{row.col3}</td> : null}
                        {section.column4Label ? <td className="px-5 py-2.5">{row.col4}</td> : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            );

          case 'ComponentSectionsRelatedContentSection': {
            const relatedType = section.contentType?.data?.attributes?.title || section.contentType?.data?.attributes?.slug;
            const relatedSlug = section.contentType?.data?.attributes?.slug;
            const localePrefix = locale ? `/${locale}` : '';
            const relatedHref =
              relatedSlug === 'news'
                ? `${localePrefix}/news`
                : relatedSlug === 'research'
                  ? `${localePrefix}/research`
                  : relatedSlug === 'events'
                    ? `${localePrefix}/events`
                    : relatedSlug === 'services'
                      ? `${localePrefix}/services`
                      : undefined;
            return (
              <section key={`${section.__typename}-${index}`} className="subpage-glass-card p-5">
                {pickFirst(section.relatedTitle, section.title) ? (
                  <h2 className="mb-2 text-[1.5rem] font-semibold tracking-tight text-slate-900">{pickFirst(section.relatedTitle, section.title)}</h2>
                ) : null}
                {relatedType ? <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">{relatedType}</p> : null}
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This related-content section can surface the closest hub page so readers can move from detail content back to the broader topic family.
                </p>
                {relatedHref ? (
                  <Link href={relatedHref} className="mt-3 inline-flex text-sm font-semibold text-[var(--color-primary)]">
                    View {relatedType || 'related hub'}
                  </Link>
                ) : null}
              </section>
            );
          }

          case 'ComponentSectionsQuoteSection':
            return (
              <section key={`${section.__typename}-${index}`} className="subpage-glass-card p-5">
                <blockquote className="text-lg font-semibold leading-8 text-slate-900">“{section.quote}”</blockquote>
                {(section.author || section.role) ? (
                  <p className="mt-2 text-sm text-slate-600">
                    {section.author}
                    {section.role ? `, ${section.role}` : ''}
                  </p>
                ) : null}
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
