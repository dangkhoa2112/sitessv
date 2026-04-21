'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export type OneShinhanPartner = {
  logo: string;
  href: string;
  name: string;
  shortDesc: string;
  alt: string;
};

type ShowcaseHighlight = {
  title: string;
  description: string;
  accentColor?: string;
  accentBackgroundColor?: string;
  accentBorderColor?: string;
};

type OneShinhanShowcaseProps = {
  kicker: string;
  profileLabel: string;
  title: string;
  subtitle: string;
  partners: OneShinhanPartner[];
  visitLabel: string;
  oneShinhanLogoAlt: string;
  carouselLabel: string;
  ecosystemLabel: string;
  officeCountLabel: string;
  officeLocationPrimary: string;
  officeLocationSecondary: string;
  footerTitle: string;
  footerDescription: string;
  highlights: ShowcaseHighlight[];
  autoPlayMs?: number;
};

export function OneShinhanShowcase({
  kicker,
  profileLabel,
  title,
  subtitle,
  partners,
  visitLabel,
  oneShinhanLogoAlt,
  carouselLabel,
  ecosystemLabel,
  officeCountLabel,
  officeLocationPrimary,
  officeLocationSecondary,
  footerTitle,
  footerDescription,
  highlights,
  autoPlayMs = 5200
}: OneShinhanShowcaseProps) {
  const id = useId();
  const [index, setIndex] = useState(0);
  const paused = useRef(false);
  const count = partners.length;
  const safe = count > 0 ? ((index % count) + count) % count : 0;
  const visiblePartners = partners.slice(0, 5);
  const highlightCards = highlights.slice(0, 3);

  const go = useCallback(
    (next: number) => {
      if (count <= 1) return;
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (count <= 2) return;
    const timer = window.setInterval(() => {
      if (!paused.current) {
        setIndex((current) => (current + 1) % count);
      }
    }, autoPlayMs);

    return () => window.clearInterval(timer);
  }, [count, autoPlayMs]);

  if (count === 0) return null;

  const active = partners[safe]!;
  const ctaLabel = visitLabel.trim() || 'Truy cập ngay';
  const officeMeta = [`${count} ${officeCountLabel}`, officeLocationPrimary, officeLocationSecondary].filter(Boolean);

  return (
    <section className="home-section-gap relative overflow-hidden py-2 text-[var(--color-primary)] md:py-3.5" aria-labelledby={`${id}-heading`}>
      <div className="relative z-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#d7e3ef] bg-[linear-gradient(145deg,#ffffff_0%,#f7faff_52%,#eef4fb_100%)] shadow-[0_28px_70px_-52px_rgba(0,57,127,0.34)] lg:min-h-[520px]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[#dce8f4]/70 blur-3xl" />
            <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-[#fff1da]/55 blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d6a857]/45 to-transparent" />
          </div>

          <div className="relative grid h-full gap-0 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
            <div className="flex h-full flex-col px-5 py-6 md:px-7 md:py-7 lg:px-8 lg:py-8">
              <div className="flex flex-wrap items-center gap-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7b5c31] md:text-[12px]">{kicker}</p>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#d9c28e]/70 bg-white/92 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7b5c31] shadow-[0_10px_18px_-16px_rgba(0,57,127,0.2)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#cf9c51]" />
                  {profileLabel}
                </span>
              </div>

              <h2
                id={`${id}-heading`}
                className="mt-4  text-[2rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--color-primary)]  md:text-[2.8rem] lg:text-[3.2rem]"
              >
                {title}
              </h2>

              <p className="mt-4 max-w-[44rem] text-[14px] leading-7 text-[#4b6278] md:text-[15px]">
                {subtitle}
              </p>

              {officeMeta.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {officeMeta.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-[#d7e2ee] bg-white/88 px-3 py-1.5 text-[11px] font-medium text-[#567087] shadow-[0_10px_16px_-16px_rgba(0,57,127,0.18)]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#cf9c51]" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-2.5">
                <Button
                  as="a"
                  href={active.href}
                  target="_blank"
                  rel="noreferrer"
                  size="lg"
                  className="h-12 rounded-full px-5 text-[14px] font-semibold"
                >
                  {ctaLabel}
                  <span aria-hidden className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </Button>
                <Button
                  as="a"
                  href={`#${id}-ecosystem`}
                  size="lg"
                  variant="secondary"
                  className="h-12 rounded-full px-5 text-[14px] font-semibold"
                >
                  {ecosystemLabel}
                </Button>
              </div>

              {highlightCards.length ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {highlightCards.map((item) => (
                    <div
                      key={item.title}
                      className="min-h-[5.4rem] rounded-[1.2rem] border px-4 py-3 shadow-[0_14px_28px_-24px_rgba(0,57,127,0.18)]"
                      style={{
                        borderColor: item.accentBorderColor || '#d9e4ef',
                        backgroundColor: item.accentBackgroundColor || 'rgba(255,255,255,0.9)'
                      }}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: item.accentColor || '#7f95a8' }}>
                        {item.title}
                      </p>
                      <p className="mt-1 text-[12.5px] leading-6 text-[#455c72]">{item.description}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-auto pt-6">
                <div className="rounded-[1.35rem] border border-[#d9e4ef] bg-white/88 px-4 py-3.5 shadow-[0_14px_28px_-24px_rgba(0,57,127,0.18)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7b5c31]">{footerTitle}</p>
                  <p className="mt-1 text-[12.5px] leading-6 text-[#567087] md:text-[13px]">{footerDescription}</p>
                </div>
              </div>
            </div>

            <div
              className="border-t border-[#dbe6f0] bg-[linear-gradient(180deg,rgba(245,248,252,0.98)_0%,rgba(241,245,250,0.95)_100%)] px-4 py-4 md:px-5 md:py-5 lg:border-t-0 lg:border-l"
              role="region"
              aria-roledescription="carousel"
              aria-label={carouselLabel}
              onMouseEnter={() => {
                paused.current = true;
              }}
              onMouseLeave={() => {
                paused.current = false;
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7b5c31] md:text-[11px]">{profileLabel}</p>
                  <p className="mt-1 text-[11px] text-[#60758a] md:text-[12px]">{carouselLabel}</p>
                </div>
                <span className="rounded-full border border-[#d9c28e]/70 bg-[#fff8ec] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]">
                  {count}
                </span>
              </div>

              <div className="relative mt-4 overflow-hidden rounded-[1.5rem] border border-[#d9e4ef] bg-white shadow-[0_18px_40px_-30px_rgba(0,57,127,0.28)]">
                <div key={safe} className="flex min-h-[180px] flex-col p-4 md:min-h-[196px] md:p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#dbe6f0] bg-[#f8fbff]">
                        <Image src={active.logo} alt={active.alt || oneShinhanLogoAlt} width={30} height={30} className="max-h-7 w-auto object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8b9bad]">{profileLabel}</p>
                        <h3 className="mt-1 line-clamp-1 text-[1rem] font-semibold leading-tight tracking-tight text-[var(--color-primary)] md:text-[1.08rem]">
                          {active.name}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-6 text-[#546a7f] md:text-[13px]">{active.shortDesc}</p>
                      </div>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                      <Button
                        as="a"
                        href={active.href}
                        target="_blank"
                        rel="noreferrer"
                        size="sm"
                        className="h-9 rounded-full px-4 text-[12.5px] font-semibold"
                      >
                        {ctaLabel}
                        <span aria-hidden className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                          →
                        </span>
                      </Button>
                      <div className="rounded-full border border-[#d7e2ee] bg-[#f8fbff] px-3 py-1 text-[10px] font-medium text-[#60758a]">
                        {count > 1 ? `${safe + 1}/${count}` : '1/1'}
                      </div>
                      </div>
                </div>
              </div>

              {count > 1 ? (
                <div className="mt-4 flex items-center justify-center gap-2">
                  {partners.map((partner, i) => {
                    const on = i === safe;
                    return (
                      <button
                        key={`${partner.href}-${partner.logo}`}
                        type="button"
                        aria-label={partner.name}
                        aria-current={on ? 'true' : undefined}
                        onClick={() => go(i)}
                        className={`h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cf9c51] ${
                          on ? 'w-8 bg-[var(--color-primary)]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    );
                  })}
                </div>
              ) : null}

              <div id={`${id}-ecosystem`} className="mt-4 space-y-2.5">
                {visiblePartners.map((partner, i) => {
                  const on = i === safe;
                  return (
                    <button
                      key={`${partner.href}-${partner.logo}-list`}
                      type="button"
                      aria-label={partner.name}
                      aria-current={on ? 'true' : undefined}
                      onClick={() => go(i)}
                      className={`group flex w-full items-center gap-3 rounded-[1.15rem] border px-3.5 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6aa9c6] active:translate-y-px ${
                        on
                          ? 'border-[#cfd9e6] bg-white shadow-[0_10px_24px_-22px_rgba(15,23,42,0.22)]'
                          : 'border-[#dbe6f0] bg-white/80 hover:border-[#cfd9e6] hover:bg-white'
                      }`}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#dbe6f0] bg-[#f8fbff]">
                        <Image src={partner.logo} alt="" width={26} height={26} className="max-h-6 w-auto object-contain" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-semibold text-[var(--color-primary)]">{partner.name}</span>
                        <span className="block truncate text-[11px] leading-snug text-[#60758a]">{partner.shortDesc}</span>
                      </span>
                      <span
                        aria-hidden
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          on ? 'bg-[#0fb067] shadow-[0_0_10px_rgba(15,176,103,0.45)]' : 'bg-slate-300 group-hover:bg-slate-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {active.name}
          </p>
        </div>
      </div>
    </section>
  );
}
