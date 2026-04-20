import { HeroBannerSlider, type HeroBannerSlide } from '@/components/home/HeroBannerSlider';

type HomeLegacyHeroSectionProps = {
  slides: HeroBannerSlide[];
  regionLabel: string;
  dotsLabel: string;
  prevSlideLabel: string;
  nextSlideLabel: string;
};

export function HomeLegacyHeroSection({
  slides,
  regionLabel,
  dotsLabel,
  prevSlideLabel,
  nextSlideLabel
}: HomeLegacyHeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-transparent pb-1 md:pb-2">
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="fx-aurora absolute -left-14 -top-10 h-72 w-72 rounded-full bg-[#cf9c51]/26 blur-3xl" />
        <div className="fx-aurora absolute -bottom-20 right-[24%] h-72 w-72 rounded-full bg-[#cf9c51]/18 blur-3xl [animation-delay:1.3s]" />
        <div className="fx-grid absolute inset-0 opacity-[0.18]" />
      </div>

      <HeroBannerSlider
        slides={slides}
        regionLabel={regionLabel}
        dotsLabel={dotsLabel}
        prevSlideLabel={prevSlideLabel}
        nextSlideLabel={nextSlideLabel}
      />
    </section>
  );
}
