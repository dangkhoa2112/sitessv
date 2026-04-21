import { type HeroBannerSlide } from '@/components/home/HeroBannerSlider';
import { CONTENT, type HomeLocale } from './home-legacy-content';
import { HomeLegacyHeroSection } from './HomeLegacyHeroSection';
import { HomeLegacyAiStackSection } from './HomeLegacyAiStackSection';
import { HomeLegacyEcosystemSection } from './HomeLegacyEcosystemSection';
import { HomeLegacyMarketStrip } from './HomeLegacyMarketStrip';
import { HomeLegacyOpenAccountSection } from './HomeLegacyOpenAccountSection';
import { HomeLegacyPriceBoardSection } from './HomeLegacyPriceBoardSection';
import { HomeLegacyServicesSection } from './HomeLegacyServicesSection';
import { HomeLegacyTradingSection } from './HomeLegacyTradingSection';

export { getLegacyHomeContent, type HomeLocale } from './home-legacy-content';

type HomeLegacyFallbackProps = {
  locale: HomeLocale;
  heroSlides?: HeroBannerSlide[];
  heroCarouselRegion?: string;
  heroCarouselDots?: string;
  heroCarouselPrev?: string;
  heroCarouselNext?: string;
  hideMarketStrip?: boolean;
  hideEcosystem?: boolean;
  hideAiStack?: boolean;
  hideOpenAccount?: boolean;
  hidePriceBoard?: boolean;
  hideTrading?: boolean;
  hideServices?: boolean;
};

export function HomeLegacyFallback({
  locale,
  heroSlides,
  heroCarouselRegion,
  heroCarouselDots,
  heroCarouselPrev,
  heroCarouselNext,
  hideMarketStrip,
  hideEcosystem,
  hideAiStack,
  hideOpenAccount,
  hidePriceBoard,
  hideTrading,
  hideServices
}: HomeLegacyFallbackProps) {
  const content = CONTENT[locale];
  const resolvedHeroSlides = heroSlides?.length ? heroSlides : content.heroSlides;
  const boardDate = new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(new Date());

  return (
    <>
      <HomeLegacyHeroSection
        slides={resolvedHeroSlides}
        regionLabel={heroCarouselRegion || content.heroCarouselRegion}
        dotsLabel={heroCarouselDots || content.heroCarouselDots}
        prevSlideLabel={heroCarouselPrev || content.heroCarouselPrev}
        nextSlideLabel={heroCarouselNext || content.heroCarouselNext}
      />

      <div className="home-main-canvas home-fin-wrap relative z-10 ">
        {!hideMarketStrip ? <HomeLegacyMarketStrip locale={locale} boardDate={boardDate} /> : null}
        
        {!hideAiStack ? <HomeLegacyAiStackSection locale={locale} /> : null}
        {!hideOpenAccount ? <HomeLegacyOpenAccountSection locale={locale} /> : null}

        {!hidePriceBoard ? <HomeLegacyPriceBoardSection locale={locale} boardDate={boardDate} /> : null}

        {!hideTrading ? <HomeLegacyTradingSection locale={locale} /> : null}
        {!hideServices ? <HomeLegacyServicesSection locale={locale} /> : null}
        {!hideEcosystem ? <HomeLegacyEcosystemSection locale={locale} /> : null}
      </div>
    </>
  );
}
