import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

type HomeOpenAccountProps = {
  badge: string;
  title: string;
  body: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaSubLabel?: string;
  ctaSubHref?: string;
  trustItems?: string[];
  /** Ảnh minh họa cột trái */
  imageSrc?: string | StaticImageData;
};

export function HomeOpenAccount({
  badge,
  title,
  body,
  ctaLabel,
  ctaHref,
  ctaSubLabel,
  ctaSubHref,
  trustItems = [],
  imageSrc = SHINHAN_VISUALS.home.openAccount
}: HomeOpenAccountProps) {
  return (
    <section className="shinhan-container home-section-gap">
      <Card tone="elevated" className="relative overflow-hidden rounded-2xl border-[#d7e0ec] md:rounded-3xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(207,156,81,0.24),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/70" />

        <div className="relative grid md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <div className="relative aspect-[5/3] min-h-[190px] md:aspect-auto md:min-h-[280px]">
            <Image
              src={imageSrc}
              alt=""
              fill
              className="object-cover object-center md:object-[center_28%]"
              sizes="(max-width: 768px) 100vw, 48vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0d1f5e]/68 via-[#10266f]/22 to-transparent md:bg-gradient-to-r md:from-[#0f2369]/20 md:via-transparent md:to-transparent"
              aria-hidden
            />
            <div
              className="absolute inset-y-0 right-0 hidden w-28 bg-gradient-to-r from-transparent via-white/55 to-[#f8fbff] md:block"
              aria-hidden
            />
          </div>

          <div className="relative flex flex-col justify-center border-t border-[#dbe8f5] bg-[linear-gradient(180deg,#f9fcff_0%,#f3f8ff_100%)] px-5 py-6 md:border-l md:border-t-0 md:px-8 md:py-8 lg:px-10">
            <span className="inline-flex w-fit rounded-full border border-[#cf9c51]/45 bg-[#fbf3e7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]">
              {badge}
            </span>
            <h2 className="mt-3 text-[1.5rem] font-semibold leading-tight tracking-tight text-[var(--color-primary)] md:text-[2rem]">
              {title}
            </h2>
            <div className="mt-4 max-w-xl space-y-2 text-[15px] leading-relaxed text-[#27364d] md:text-[16px] md:leading-8">
              {body.map((line) => (
                <p key={line} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#cf9c51]" aria-hidden />
                  <span>{line}</span>
                </p>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#d5e4f2] bg-white/82 p-3 shadow-[0_16px_34px_-26px_rgba(0,57,127,0.42)] backdrop-blur-sm">
              <Button
                as="a"
                href={ctaHref}
                target="_blank"
                rel="noreferrer"
                fullWidth
                size="lg"
                className="justify-between px-5"
              >
                <span>{ctaLabel}</span>
                <span aria-hidden>→</span>
              </Button>

              {ctaSubLabel && ctaSubHref ? (
                <Button
                  as="a"
                  href={ctaSubHref}
                  target={ctaSubHref.startsWith('http') ? '_blank' : undefined}
                  rel={ctaSubHref.startsWith('http') ? 'noreferrer' : undefined}
                  variant="secondary"
                  fullWidth
                  className="mt-2.5"
                >
                  {ctaSubLabel}
                </Button>
              ) : null}

              {trustItems.length ? (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {trustItems.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-[#d4e3f2] bg-[#f7fbff] px-2.5 py-1 text-[11px] font-medium text-[#4a6079]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
