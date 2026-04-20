import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type HomeLocale = 'vi' | 'en';

type Row = {
  symbol: string;
  last: string;
  change: string;
  pct: string;
  volume: string;
  trend: 'up' | 'down';
};

type HomePriceBoardProps = {
  locale: HomeLocale;
  eyebrow: string;
  title: string;
  boardDate: string;
  tabs: Array<{ label: string; href: string }>;
  liveLabel: string;
  rows: readonly Row[];
};

export function HomePriceBoard({
  locale,
  eyebrow,
  title,
  boardDate,
  tabs,
  liveLabel,
  rows
}: HomePriceBoardProps) {
  const col = {
    last: locale === 'vi' ? 'Giá gần nhất' : 'Last',
    change: locale === 'vi' ? 'Thay đổi' : 'Change',
    vol: locale === 'vi' ? 'Khối lượng' : 'Volume'
  };

  return (
    <section className="shinhan-container home-section-gap">
      <Card tone="tinted" className="relative overflow-hidden rounded-2xl p-4 md:rounded-3xl md:p-5">
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/40" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#cf9c51]/[0.18] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-[#142368]/[0.06] blur-2xl" />

        <div className="relative">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7a5a2f]">{eyebrow}</p>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <h2 className="text-xl font-semibold tracking-tight text-[var(--color-primary)]">{title}</h2>
                <span className="text-[12px] font-medium tabular-nums text-[#64748b]">{boardDate}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:justify-end">
              <div className="inline-flex rounded-full border border-[#142368]/10 bg-white/60 p-0.5 shadow-sm backdrop-blur-sm">
                {tabs.map((tab) => (
                  <Button
                    as="a"
                    key={tab.label}
                    href={tab.href}
                    target="_blank"
                    rel="noreferrer"
                    size="sm"
                    variant="ghost"
                    className="h-8 rounded-full px-3 text-[12px] font-semibold text-[var(--color-primary)]/90 hover:bg-[#fff8ec]"
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/[0.08] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-800 shadow-[0_0_12px_-4px_rgba(16,185,129,0.35)]">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.85)] motion-safe:animate-pulse"
                  aria-hidden
                />
                {liveLabel}
              </span>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-[#142368]/[0.08] bg-white/[0.45] shadow-inner backdrop-blur-sm md:mt-4">
            <table className="w-full border-collapse text-left text-[13px] md:text-[14px]">
              <thead>
                <tr className="border-b border-[#142368]/[0.08] bg-[#142368]/[0.04] text-[12px] font-semibold uppercase tracking-wide text-[#64748b]">
                  <th className="px-3 py-2 pl-3 md:px-4 md:py-2.5">Symbol</th>
                  <th className="px-3 py-2 md:px-4 md:py-2.5">{col.last}</th>
                  <th className="px-3 py-2 md:px-4 md:py-2.5">{col.change}</th>
                  <th className="px-3 py-2 pr-3 text-right md:px-4 md:py-2.5">{col.vol}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.symbol}
                    className={`border-b border-[#142368]/[0.05] transition-colors last:border-b-0 hover:bg-[#142368]/[0.03] ${
                      index % 2 === 0 ? 'bg-white/[0.25]' : 'bg-transparent'
                    }`}
                  >
                    <td className="px-3 py-2 pl-3 font-semibold text-[var(--color-primary)] md:px-4 md:py-2">{row.symbol}</td>
                    <td className="px-3 py-2 font-mono tabular-nums text-[#1e293b] md:px-4 md:py-2">{row.last}</td>
                    <td className="px-3 py-2 md:px-4 md:py-2">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 font-mono text-[12px] tabular-nums ${
                          row.trend === 'up'
                            ? 'bg-emerald-500/12 text-emerald-700 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.2)]'
                            : 'bg-rose-500/10 text-rose-700 shadow-[inset_0_0_0_1px_rgba(244,63,94,0.18)]'
                        }`}
                      >
                        {row.change}{' '}
                        <span className="opacity-80">({row.pct})</span>
                      </span>
                    </td>
                    <td className="px-3 py-2 pr-3 text-right font-mono tabular-nums text-[#475569] md:px-4 md:py-2">{row.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </section>
  );
}
