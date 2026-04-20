import type { Metadata } from 'next';
import { HomeCmsSections } from '@/components/home/HomeCmsSections';
import { HomeLegacyFallback, getLegacyHomeContent, type HomeLocale } from '@/components/home/HomeLegacyFallback';
import { getHomepage, getHomepageBanners, listFaqs, listNews, listOffices, listResearch } from '@/lib/cms-api';
import { buildPageMetadata } from '@/lib/seo';
import { assetUrl } from '@/lib/urls';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

function isExternalHref(href?: string | null) {
  return !!href && (href.startsWith('http://') || href.startsWith('https://'));
}

function normalizeHomepageBanner(node: any, fallbackIndex: number) {
  const attrs = node?.attributes ?? node ?? {};
  const image =
    assetUrl(attrs.image?.data?.attributes?.url) ||
    assetUrl(attrs.mobileImage?.data?.attributes?.url) ||
    [SHINHAN_VISUALS.home.heroMain, SHINHAN_VISUALS.about.storyHero, SHINHAN_VISUALS.about.hero][fallbackIndex % 3];
  const href = attrs.button?.href || '/';

  return {
    image,
    href,
    ariaLabel: attrs.title || attrs.summary || `Homepage banner ${fallbackIndex + 1}`,
    target: isExternalHref(href) || attrs.button?.target === '_blank' ? '_blank' : '_self',
    rel: isExternalHref(href) || attrs.button?.target === '_blank' ? 'noreferrer' : undefined
  };
}

function buildHeroSlides(
  banners: Array<any>,
  homepage: any,
  legacy: ReturnType<typeof getLegacyHomeContent>,
  locale: HomeLocale
) {
  const uniqueSlides: ReturnType<typeof normalizeHomepageBanner>[] = [];
  const seen = new Set<string>();

  const pushSlide = (slide?: ReturnType<typeof normalizeHomepageBanner>) => {
    if (!slide) return;
    const imageSrc = typeof slide.image === 'string' ? slide.image : slide.image.src;
    const key = `${imageSrc}|${slide.href}|${slide.ariaLabel}`;
    if (seen.has(key) || uniqueSlides.length >= 3) return;
    seen.add(key);
    uniqueSlides.push(slide);
  };

  banners.map(normalizeHomepageBanner).forEach(pushSlide);
  pushSlide(normalizeHeroSlide(homepage, legacy, locale));
  (legacy.heroSlides || []).forEach(pushSlide);

  return uniqueSlides;
}

function normalizeHeroSlide(homepage: any, legacy: ReturnType<typeof getLegacyHomeContent>, locale: HomeLocale) {
  const imageUrl = homepage?.hero?.backgroundImage?.data?.attributes?.url;
  if (!imageUrl) return undefined;

  const href =
    homepage.hero?.primaryButton?.href ||
    homepage.hero?.secondaryButton?.href ||
    (locale === 'vi' ? '/vi/support/mo-tai-khoan-truc-tuyen.html' : '/en/support/mo-tai-khoan-truc-tuyen.html');

  return {
    image: assetUrl(imageUrl) || SHINHAN_VISUALS.home.heroMain,
    href,
    ariaLabel: homepage.hero?.title || legacy.metaTitle,
    target: isExternalHref(href) ? '_blank' : '_self',
    rel: isExternalHref(href) ? 'noreferrer' : undefined
  };
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale: HomeLocale = locale === 'en' ? 'en' : 'vi';
  const legacy = getLegacyHomeContent(currentLocale);
  const homepage = await getHomepage(currentLocale);

  return buildPageMetadata({
    locale: currentLocale,
    pathname: `/${locale}`,
    seo: homepage?.seo,
    fallback: {
      title: homepage?.title || legacy.metaTitle,
      description: homepage?.summary || legacy.metaDescription
    }
  });
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale: HomeLocale = locale === 'en' ? 'en' : 'vi';
  const legacy = getLegacyHomeContent(currentLocale);
  const homepage = await getHomepage(currentLocale);

  if (!homepage?.sections?.length) {
    const fallbackBannerNodes = await getHomepageBanners(currentLocale, 'home_hero');
    const heroSlides = buildHeroSlides(fallbackBannerNodes || [], homepage, legacy, currentLocale);
    return <HomeLegacyFallback locale={currentLocale} heroSlides={heroSlides} />;
  }

  const [homepageBannerNodes, newsNodes, researchNodes, faqCategories, officeNodes] = await Promise.all([
    getHomepageBanners(currentLocale, 'home_hero'),
    listNews({ locale: currentLocale, page: 1, pageSize: 8 }),
    listResearch({ locale: currentLocale, page: 1, pageSize: 8 }),
    listFaqs(currentLocale),
    listOffices(currentLocale)
  ]);

  const heroSlides = buildHeroSlides(homepageBannerNodes || [], homepage, legacy, currentLocale);

  return (
    <>
      <HomeLegacyFallback
        locale={currentLocale}
        heroSlides={heroSlides}
        hideEcosystem
        hideAiStack
        hideOpenAccount
        hideTrading
        hideServices
      />

      <HomeCmsSections
        locale={currentLocale}
        sections={homepage.sections || []}
        newsItems={newsNodes?.items || []}
        researchItems={researchNodes?.items || []}
        faqCategories={faqCategories || []}
        offices={officeNodes || []}
      />
    </>
  );
}
