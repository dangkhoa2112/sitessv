import { getAiCards, getAiStackCopy, type HomeLocale } from './home-legacy-content';

type HomeLegacyAiStackSectionProps = {
  locale: HomeLocale;
};

export function HomeLegacyAiStackSection({ locale }: HomeLegacyAiStackSectionProps) {
  const copy = getAiStackCopy(locale);
  const cards = getAiCards(locale);
  return (
    <section className="shinhan-container home-section-gap">
      <header className="home-section-head">
        <h2 className="text-[1.65rem] font-medium text-[var(--color-primary)] md:text-[2rem]">{copy.title}</h2>
      </header>
      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {cards.map((card, i) => (
          <article key={card.title} className={`ai-stack-card relative pl-7 pr-5 py-6 md:pl-8 md:pr-6 ${i === 0 ? 'ai-stack-card--featured' : ''}`}>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-wide text-[#b88435]">{card.value}</p>
            <h3 className="mt-3 text-lg font-medium text-[var(--color-primary)] md:text-xl">{card.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#475569] md:text-[15px]">{card.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
