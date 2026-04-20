import Image from 'next/image';
import type { StaticImageData } from 'next/image';

export function PageHero({
  title,
  subtitle,
  kicker,
  imageUrl,
  highlights,
  contentWidth = 'wide'
}: {
  title: string;
  subtitle?: string;
  kicker?: string;
  imageUrl?: string | StaticImageData;
  highlights?: string[];
  contentWidth?: 'wide' | 'narrow';
}) {
  const contentWidthClass = contentWidth === 'narrow' ? 'subpage-content--narrow' : 'subpage-content--wide';

  return (
    <section className="subpage-hero">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(106,169,198,0.28),transparent_48%),radial-gradient(circle_at_90%_10%,rgba(20,35,104,0.24),transparent_42%)]" />
      <div className={`subpage-content ${contentWidthClass} grid gap-5 py-8 md:grid-cols-2 md:py-10`}>
        <div>
          {kicker ? <p className="subpage-eyebrow">{kicker}</p> : null}
          <h1 className="mt-2 text-[2rem] font-semibold tracking-tight text-slate-950 md:text-[2.8rem]">{title}</h1>
          {subtitle ? <p className="mt-3 max-w-xl text-[0.98rem] leading-7 text-slate-600 md:text-[1.05rem]">{subtitle}</p> : null}
          {highlights?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <span key={item} className="subpage-chip">
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        {imageUrl ? (
          <div className="relative min-h-44 overflow-hidden rounded-[1.15rem] border border-white/60 bg-white/82 shadow-[0_16px_32px_-24px_rgba(15,27,85,0.52)] backdrop-blur-sm">
            <Image src={imageUrl} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
          </div>
        ) : (
          <div className="subpage-soft-card hidden md:block">
            <p className="text-sm font-medium text-slate-700">AI Finance Layer</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Market intelligence, risk scoring, and advisor workflow orchestration are embedded across subpages.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
