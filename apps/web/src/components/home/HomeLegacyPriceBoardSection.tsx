import { HomePriceBoard } from '@/components/home/HomePriceBoard';
import { boardRows, getPriceBoardCopy, type HomeLocale } from './home-legacy-content';

type HomeLegacyPriceBoardSectionProps = {
  locale: HomeLocale;
  boardDate: string;
};

export function HomeLegacyPriceBoardSection({ locale, boardDate }: HomeLegacyPriceBoardSectionProps) {
  const copy = getPriceBoardCopy(locale);

  return (
    <HomePriceBoard
      locale={locale}
      eyebrow={copy.eyebrow}
      title={copy.title}
      boardDate={boardDate}
      tabs={copy.tabs}
      liveLabel={copy.liveLabel}
      rows={boardRows}
    />
  );
}
