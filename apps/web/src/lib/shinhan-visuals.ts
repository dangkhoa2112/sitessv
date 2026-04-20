import aboutHeroImage from '../../public/shinhan/banners/hero-alt-2.jpg';
import aboutStoryHeroImage from '../../public/shinhan/banners/hero-alt-1.png';
import homeHeroMainImage from '../../public/shinhan/banners/hero-main.png';
import aboutOverviewImage from '../../public/shinhan/content/one-shinhan-bg.png';
import aboutLeadershipImage from '../../public/shinhan/content/trading-bg.png';
import homeOpenAccountImage from '../../public/shinhan/content/open-account-bg.png';
import homeTradingImage from '../../public/shinhan/content/trading-bg.png';
import homeOneShinhanLogoImage from '../../public/shinhan/content/one-shinhan-logo.png';
import researchHeroImage from '../../public/shinhan/content/service-bg-research.png';
import researchAnalystIconImage from '../../public/shinhan/content/service-icon-research.png';
import researchAnalystImage from '../../public/shinhan/content/trading-bg.png';
import supportHeroImage from '../../public/shinhan/content/open-account-bg.png';
import serviceBgBrokerageImage from '../../public/shinhan/content/service-bg-brokerage.png';
import serviceBgIbImage from '../../public/shinhan/content/service-bg-ib.png';
import serviceBgResearchImage from '../../public/shinhan/content/service-bg-research.png';
import serviceIconBrokerageImage from '../../public/shinhan/content/service-icon-brokerage.png';
import serviceIconIbImage from '../../public/shinhan/content/service-icon-ib.png';
import serviceIconResearchImage from '../../public/shinhan/content/service-icon-research.png';
import openAccountBgImage from '../../public/shinhan/content/open-account-bg.png';
import tradingBgImage from '../../public/shinhan/content/trading-bg.png';
import mtsIconImage from '../../public/shinhan/content/mts-icon.png';
import htsIconImage from '../../public/shinhan/content/hts-icon.png';
import wtsIconImage from '../../public/shinhan/content/wts-icon.png';
import partnerBankImage from '../../public/shinhan/content/partner-bank.png';
import partnerDsImage from '../../public/shinhan/content/partner-ds.png';
import partnerLifeImage from '../../public/shinhan/content/partner-life.png';
import partnerFinanceImage from '../../public/shinhan/content/partner-finance.png';
import brandLogoImage from '../../public/shinhan/images/logo.png';
import brandFooterLogoImage from '../../public/shinhan/images/logo-footer.png';
import socialFacebookImage from '../../public/shinhan/social/facebook.png';
import socialYoutubeImage from '../../public/shinhan/social/youtube.png';
import socialLinkedInImage from '../../public/shinhan/social/linkedin.png';
import socialZaloImage from '../../public/shinhan/social/zalo.png';
import iconCallImage from '../../public/shinhan/icons/icon-call.svg';
import iconMailImage from '../../public/shinhan/icons/icon-mail.svg';

export const SHINHAN_VISUALS = {
  home: {
    heroMain: homeHeroMainImage,
    openAccount: homeOpenAccountImage,
    trading: homeTradingImage,
    oneShinhanLogo: homeOneShinhanLogoImage
  },
  about: {
    hero: aboutHeroImage,
    overview: aboutOverviewImage,
    leadership: aboutLeadershipImage,
    storyHero: aboutStoryHeroImage
  },
  research: {
    hero: researchHeroImage,
    analyst: researchAnalystImage,
    analystIcon: researchAnalystIconImage
  },
  support: {
    hero: supportHeroImage
  },
  services: {
    brokerage: {
      hero: serviceBgBrokerageImage,
      icon: serviceIconBrokerageImage
    },
    investmentBanking: {
      hero: serviceBgIbImage,
      icon: serviceIconIbImage
    },
    research: {
      hero: serviceBgResearchImage,
      icon: serviceIconResearchImage
    },
    trading: tradingBgImage,
    openAccount: openAccountBgImage,
    platforms: {
      mts: mtsIconImage,
      hts: htsIconImage,
      wts: wtsIconImage
    },
    partnerBank: partnerBankImage,
    partnerDs: partnerDsImage,
    partnerLife: partnerLifeImage,
    partnerFinance: partnerFinanceImage
  },
  brand: {
    logo: brandLogoImage,
    footerLogo: brandFooterLogoImage,
    socials: {
      facebook: socialFacebookImage,
      youtube: socialYoutubeImage,
      linkedin: socialLinkedInImage,
      zalo: socialZaloImage
    },
    icons: {
      call: iconCallImage,
      mail: iconMailImage
    }
  }
} as const;
