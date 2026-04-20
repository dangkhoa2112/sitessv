import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getEcosystemCopy, getHeroCtas, getQuickLinks, getShortcutLinks, type HomeLocale } from './home-legacy-content';

type HomeLegacyEcosystemSectionProps = {
  locale: HomeLocale;
};

export function HomeLegacyEcosystemSection({ locale }: HomeLegacyEcosystemSectionProps) {
  const copy = getEcosystemCopy(locale);
  const heroCtas = getHeroCtas(locale);
  const quickLinks = getQuickLinks(locale);
  const shortcutLinks = getShortcutLinks(locale);
  const sectionEyebrow = locale === 'vi' ? 'Hệ sinh thái đầu tư' : 'Investment ecosystem';
  const quickAccessLabel = locale === 'vi' ? 'Truy cập nhanh' : 'Quick access';
  const shortcutLabel = locale === 'vi' ? 'Giao dịch nhanh' : 'Trading shortcuts';
  const supportTags =
    locale === 'vi'
      ? ['Dữ liệu thời gian thực', 'Nền tảng giao dịch số', 'Hỗ trợ chuyên gia']
      : ['Realtime data', 'Digital trading', 'Expert support'];

  return (
    <section className="shinhan-container home-section-gap">
      <Card tone="default" className="home-vt-ecosystem relative overflow-hidden rounded-[2.25rem] border-[#d7e2ee] bg-[linear-gradient(145deg,#ffffff_0%,#f4f8fc_58%,#edf4fb_100%)] px-5 py-5 shadow-[0_24px_60px_-42px_rgba(0,57,127,0.35)] md:px-7 md:py-7 lg:px-8 lg:py-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4a65d]/55 to-transparent" />
        <div className="pointer-events-none absolute -left-10 top-10 h-28 w-28 rounded-full bg-[#dce8f4]/75 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-0 h-44 w-44 rounded-full bg-[#fff1da]/55 blur-3xl" />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:items-start">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7b5c31]">{sectionEyebrow}</p>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d9c28e]/70 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7b5c31] shadow-[0_10px_18px_-16px_rgba(0,57,127,0.25)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#cf9c51]" />
                {copy.marketLabel}
              </span>
            </div>

            <h2 className="mt-3 max-w-[14ch] text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--color-primary)] md:max-w-[16ch] md:text-[2.45rem] lg:max-w-none">
              {copy.title}
            </h2>
            <p className="mt-3 max-w-[41rem] text-[14px] leading-relaxed text-[#425a72] md:text-[15px]">{copy.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {supportTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-[#d7e2ee] bg-white/85 px-3 py-1 text-[11px] font-medium text-[#567087] shadow-[0_10px_16px_-16px_rgba(0,57,127,0.25)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <Button as="a" href={heroCtas.secondary.href} target="_blank" rel="noreferrer" size="lg" className="h-11 rounded-full px-5">
                {copy.buttonLabel}
              </Button>
              <Button
                as="a"
                href={heroCtas.primary.href}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                size="lg"
                className="h-11 rounded-full px-5"
              >
                {heroCtas.primary.label}
              </Button>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-[#d9e4ef] bg-white/92 p-4 shadow-[0_18px_42px_-30px_rgba(0,57,127,0.34)] backdrop-blur-[2px] md:p-5">
            <div className="flex items-center justify-between gap-3 border-b border-[#eef3f8] pb-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7b5c31]">{quickAccessLabel}</p>
                <p className="mt-1 text-[12px] text-[#60758a]">{copy.marketLabel}</p>
              </div>
              <span className="rounded-full border border-[#d7b56f]/60 bg-[#fff8ec] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]">
                {copy.marketLabel}
              </span>
            </div>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {quickLinks.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="home-link-card group flex min-h-[4.25rem] items-start justify-between rounded-[1.15rem] border border-[#dce6f0] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.96)_100%)] px-3.5 py-3 text-[14px] font-semibold leading-snug text-[var(--color-primary)] transition hover:-translate-y-0.5 hover:border-[#cfa25a]/70 hover:bg-white hover:shadow-[0_14px_24px_-20px_rgba(0,57,127,0.34)]"
                >
                  <span className="flex min-w-0 flex-1 flex-col gap-1 pr-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8b9bad]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[14px] leading-snug">{item.label}</span>
                  </span>
                  <span aria-hidden className="mt-0.5 text-[13px] text-[#9caebe] transition group-hover:translate-x-0.5 group-hover:text-[#cfa25a]">
                    →
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7b5c31]">{shortcutLabel}</p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {shortcutLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="home-link-card rounded-[1.15rem] border border-[#dcc79d] bg-[linear-gradient(180deg,#fffaf0_0%,#fff7ea_100%)] px-3 py-3 text-center text-[13px] font-semibold text-[var(--color-primary)] transition hover:border-[#cfa25a] hover:bg-white hover:shadow-[0_12px_22px_-20px_rgba(0,57,127,0.3)]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
