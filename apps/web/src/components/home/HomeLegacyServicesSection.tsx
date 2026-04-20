import Link from 'next/link';
import Image from 'next/image';
import { getServiceCards, getServiceCopy, type HomeLocale } from './home-legacy-content';

type HomeLegacyServicesSectionProps = {
  locale: HomeLocale;
};

export function HomeLegacyServicesSection({ locale }: HomeLegacyServicesSectionProps) {
  const copy = getServiceCopy(locale);
  const services = getServiceCards(locale);
  return (
    <section className="shinhan-container home-section-gap">
      <header className="home-section-head">
        <h2 className="text-[1.65rem] font-medium text-[var(--color-primary)] md:text-[2rem]">{copy.title}</h2>
      </header>
      <div className="grid gap-5 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.title}
            href={service.href}
            className="home-apple-card group relative overflow-hidden rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_-24px_rgba(0,57,127,0.32)]"
          >
            <div className="flex min-h-[220px] flex-col justify-end">
              <Image src={service.icon} alt="" width={58} height={58} className="h-12 w-12" />
              <h3 className="mt-3 text-[1.45rem] font-semibold leading-tight text-[var(--color-primary)] md:text-[1.6rem]">{service.title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-[#4a6178]">{service.desc}</p>
              <span className="mt-4 inline-flex text-[14px] font-semibold text-[#b88435]">{copy.exploreLabel} →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
