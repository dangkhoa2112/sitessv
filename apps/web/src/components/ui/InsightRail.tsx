type InsightItem = {
  title: string;
  description: string;
  meta?: string;
};

export function InsightRail({
  eyebrow,
  title,
  description,
  items
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: InsightItem[];
}) {
  return (
    <section className="subpage-panel mb-6 md:mb-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          <p className="subpage-eyebrow">{eyebrow}</p>
          <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 md:text-[0.96rem]">{description}</p>
        </div>
        <span className="ai-badge">AI Applied</span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="subpage-soft-card">
            {item.meta ? <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{item.meta}</p> : null}
            <h3 className="mt-1.5 text-[0.98rem] font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
