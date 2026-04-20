import Image from 'next/image';
import { type HomeLocale, getTradingCopy, getTradingSystems } from './home-legacy-content';

type HomeLegacyTradingSectionProps = {
  locale: HomeLocale;
};

function isExternalHref(href?: string | null) {
  return !!href && (href.startsWith('http://') || href.startsWith('https://'));
}

export function HomeLegacyTradingSection({ locale }: HomeLegacyTradingSectionProps) {
  const copy = getTradingCopy(locale);
  const systems = getTradingSystems(locale);

  return (
    <section className="home-section-gap">
      <div className="shinhan-container">
        <div className="home-apple-panel rounded-3xl p-6 md:p-8">
          <div className="home-section-head home-section-head--left mb-9 max-w-3xl text-left">
            <span className="inline-flex rounded-full border border-[#cf9c51]/38 bg-[#cf9c51]/12 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[#7a5a2f]">
              {copy.badge}
            </span>
            <h2 className="mt-4 text-[1.6rem] font-semibold leading-tight text-[var(--color-primary)] md:text-[2rem]">{copy.title}</h2>
            <div className="mt-3 space-y-1 text-[15px] leading-7 text-[#435971]">
              {copy.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {systems.map((system) => (
              <a
                key={system.title}
                href={system.href}
                target={isExternalHref(system.href) ? '_blank' : undefined}
                rel={isExternalHref(system.href) ? 'noreferrer' : undefined}
                className="home-apple-card group rounded-2xl p-5 transition duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00397f]/8 shadow-sm">
                    <Image src={system.icon} alt={system.title} width={34} height={34} className="h-8 w-8 object-contain" />
                  </div>
                  <h3 className="text-[1.05rem] font-semibold leading-snug text-[var(--color-primary)] md:text-[1.15rem]">{system.title}</h3>
                </div>
                <p className="mt-3 text-[15px] leading-6 text-[#4b6279]">{system.desc}</p>
                <span className="mt-4 inline-flex text-[14px] font-semibold text-[#b88435]">{copy.exploreLabel} →</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
