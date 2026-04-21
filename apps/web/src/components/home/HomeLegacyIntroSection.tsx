import Link from 'next/link';

type HomeLegacyIntroSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trustItems: string[];
};

export function HomeLegacyIntroSection({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  trustItems
}: HomeLegacyIntroSectionProps) {
  return (
    <section className="shinhan-container mt-4 md:mt-5">
      <div className="rounded-[1.65rem] border border-white/70 bg-white/76 p-5 shadow-[0_24px_48px_-40px_rgba(20,35,104,0.48)] backdrop-blur-md md:p-7">
        <p className="subpage-eyebrow">{eyebrow}</p>
        <h1 className="mt-2 text-[2.05rem] font-semibold leading-[1.08] tracking-tight text-slate-950 md:text-[2.8rem]">{title}</h1>
        <p className="mt-3 max-w-3xl text-[0.98rem] leading-7 text-slate-600 md:text-[1.06rem]">{description}</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link href={primaryCta.href} className="inline-flex h-11 items-center rounded-full bg-[var(--color-primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-strong)]">
            {primaryCta.label}
          </Link>
          <Link href={secondaryCta.href} className="inline-flex h-11 items-center rounded-full border border-[rgba(20,35,104,0.14)] bg-white px-5 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-[#f7faff]">
            {secondaryCta.label}
          </Link>
        </div>
        {trustItems.length ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {trustItems.map((item) => (
              <li key={item} className="rounded-full border border-[#dce7f3] bg-[#f7fbff] px-3 py-1.5 text-[12px] font-medium text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
