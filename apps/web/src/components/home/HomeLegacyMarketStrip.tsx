import { Card, CardBody, CardDescription } from '@/components/ui/card';
import { boardRows, getEcosystemCopy, getPriceBoardCopy, type HomeLocale } from './home-legacy-content';

type HomeLegacyMarketStripProps = {
  locale: HomeLocale;
  boardDate: string;
};

export function HomeLegacyMarketStrip({ locale, boardDate }: HomeLegacyMarketStripProps) {
  const ecosystemCopy = getEcosystemCopy(locale);
  const priceCopy = getPriceBoardCopy(locale);
  return (
    <section className="shinhan-container mt-3 md:mt-4">
      <div className="home-market-grid">
        {boardRows.map((stat) => (
          <Card key={stat.symbol} tone="default" className="home-market-card">
            <CardBody className="flex h-full flex-col justify-between gap-4 p-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f552f]">{stat.symbol}</p>
                  <h3 className="mt-2 font-mono text-[1.65rem] font-semibold tracking-tight text-[var(--color-primary)]">{stat.last}</h3>
                </div>
                <TrendPill change={stat.change} pct={stat.pct} trend={stat.trend} />
              </div>
              <div className="flex items-center justify-between border-t border-[#dbe7f4] pt-3">
                <CardDescription className="text-[13px] leading-[1.5] text-[#4e647c]">{locale === 'vi' ? 'Khối lượng' : 'Volume'}</CardDescription>
                <p className="font-mono text-[13px] font-semibold tracking-tight text-[var(--color-primary)]">{stat.volume}</p>
              </div>
            </CardBody>
          </Card>
        ))}

        <article className="home-market-card home-market-card--overview">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0cc94]">{ecosystemCopy.marketLabel}</p>
          <h3 className="mt-2 text-[1.45rem] font-medium leading-tight text-white">{priceCopy.title}</h3>
          <p className="mt-1.5 text-[12px] text-white/72">{boardDate}</p>
        </article>
      </div>
    </section>
  );
}

function TrendPill({ change, pct, trend }: { change: string; pct: string; trend: 'up' | 'down' }) {
  const isUp = trend === 'up' || change.trim().startsWith('+') || pct.trim().startsWith('+');
  const toneClass = isUp ? 'home-market-pill--up' : 'home-market-pill--down';
  const arrow = isUp ? '▲' : '▼';
  return (
    <div className={`home-market-pill ${toneClass}`}>
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">{arrow}</span>
      <span className="font-mono text-[12px] font-semibold">{change}</span>
      <span className="text-[11px] font-semibold">{pct}</span>
    </div>
  );
}
