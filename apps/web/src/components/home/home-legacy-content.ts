import type { StaticImageData } from 'next/image';
import type { HeroBannerSlide } from '@/components/home/HeroBannerSlider';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';
import { SHINHAN_BRAND_LINKS } from '@/lib/shinhan-links';

export type HomeLocale = 'vi' | 'en';

export type LocaleContent = {
  metaTitle: string;
  metaDescription: string;
  services: Array<{ title: string; desc: string; href: string; bg: string | StaticImageData; icon: string | StaticImageData }>;
  aiCards: Array<{ title: string; desc: string; value: string }>;
  heroSlides: HeroBannerSlide[];
  heroCarouselRegion: string;
  heroCarouselDots: string;
  heroCarouselPrev: string;
  heroCarouselNext: string;
};

export const boardRows = [
  { symbol: 'VNINDEX', last: '1,273.17', change: '+4.22', pct: '+0.33%', volume: '678M', trend: 'up' },
  { symbol: 'HNXINDEX', last: '228.41', change: '-0.72', pct: '-0.31%', volume: '91M', trend: 'down' },
  { symbol: 'UPCOM', last: '95.58', change: '+0.27', pct: '+0.28%', volume: '54M', trend: 'up' }
] as const;

export const CONTENT: Record<HomeLocale, LocaleContent> = {
  vi: {
    metaTitle: 'Chứng khoán Shinhan Việt Nam (SSV) - Công ty Chứng khoán hàng đầu Hàn Quốc',
    metaDescription:
      'Đầu tư chứng khoán tại công ty Chứng khoán Shinhan Việt Nam (SSV). Hệ thống giao dịch hiện đại, mở tài khoản chứng khoán trực tuyến dễ dàng.',
    services: [
      { title: 'Ngân hàng đầu tư', desc: 'Shinhan cung cấp giải pháp tài chính tối ưu cho khách hàng doanh nghiệp.', href: '/vi/san-pham-dich-vu/ngan-hang-dau-tu', bg: SHINHAN_VISUALS.services.investmentBanking.hero, icon: SHINHAN_VISUALS.services.investmentBanking.icon },
      { title: 'Môi Giới Chứng Khoán', desc: 'Dịch vụ tư vấn đầu tư bởi các chuyên gia tài chính kết hợp nền tảng giao dịch kỹ thuật số hiện đại.', href: '/vi/san-pham-dich-vu/moi-gioi-chung-khoan', bg: SHINHAN_VISUALS.services.brokerage.hero, icon: SHINHAN_VISUALS.services.brokerage.icon },
      { title: 'Thông tin đầu tư', desc: 'Cập nhật kịp thời thông tin phân tích, khuyến nghị và chuyển động thị trường cho khách hàng.', href: '/vi/trung-tam-phan-tich', bg: SHINHAN_VISUALS.services.research.hero, icon: SHINHAN_VISUALS.services.research.icon }
    ],
    aiCards: [
      { title: 'AI Signal Engine', desc: 'Mô hình nhận diện xung lực thị trường và cảnh báo biến động theo thời gian thực.', value: '24/7 Monitoring' },
      { title: 'Realtime Data Stream', desc: 'Dòng dữ liệu giá và thanh khoản liên tục để hỗ trợ chiến lược giao dịch linh hoạt.', value: '< 1s Refresh' },
      { title: 'Smart Risk Layer', desc: 'Lớp kiểm soát rủi ro thông minh giúp cân bằng giữa hiệu suất và mức chịu đựng rủi ro.', value: 'Adaptive Guard' }
    ],
    heroSlides: [
      { image: SHINHAN_VISUALS.home.heroMain, href: SHINHAN_BRAND_LINKS.trading.ssvChampionship, ariaLabel: 'Chương trình Chứng trường huyền thoại – Tranh tài đầu tư và săn Vinfast cùng Shinhan Securities Vietnam' },
      { image: SHINHAN_VISUALS.about.storyHero, href: SHINHAN_BRAND_LINKS.trading.web, ariaLabel: 'Giao dịch chứng khoán trực tuyến – Nền tảng Shinhan Securities Vietnam' },
      { image: SHINHAN_VISUALS.about.hero, href: SHINHAN_BRAND_LINKS.trading.login, ariaLabel: 'Mở tài khoản chứng khoán trực tuyến – Shinhan Securities Vietnam' }
    ],
    heroCarouselRegion: 'Banner trang chủ',
    heroCarouselDots: 'Chọn banner',
    heroCarouselPrev: 'Banner trước',
    heroCarouselNext: 'Banner sau'
  },
  en: {
    metaTitle: 'Shinhan Securities Vietnam (SSV) - Leading Korean Securities Company',
    metaDescription:
      'Invest in securities at Shinhan Securities Vietnam (SSV). Modern trading infrastructure and online account opening in minutes.',
    services: [
      { title: 'Investment Banking', desc: 'Shinhan delivers optimized financing solutions for institutional and corporate clients.', href: '/en/services/investment-banking', bg: SHINHAN_VISUALS.services.investmentBanking.hero, icon: SHINHAN_VISUALS.services.investmentBanking.icon },
      { title: 'Securities Brokerage', desc: 'Advisory services by experienced experts, powered by modern digital trading technology.', href: '/en/services/moi-gioi-chung-khoan', bg: SHINHAN_VISUALS.services.brokerage.hero, icon: SHINHAN_VISUALS.services.brokerage.icon },
      { title: 'Investment Insights', desc: 'Timely analysis, market updates, and recommendations to support every investment decision.', href: '/en/research', bg: SHINHAN_VISUALS.services.research.hero, icon: SHINHAN_VISUALS.services.research.icon }
    ],
    aiCards: [
      { title: 'AI Signal Engine', desc: 'Model-driven market momentum detection and realtime movement alerts.', value: '24/7 Monitoring' },
      { title: 'Realtime Data Stream', desc: 'Continuous price and liquidity feed to support agile trading strategies.', value: '< 1s Refresh' },
      { title: 'Smart Risk Layer', desc: 'Adaptive risk control layer balancing performance and portfolio resilience.', value: 'Adaptive Guard' }
    ],
    heroSlides: [
      { image: SHINHAN_VISUALS.home.heroMain, href: SHINHAN_BRAND_LINKS.trading.ssvChampionship, ariaLabel: 'SSV Championship — Stock trading competition and Vinfast prizes, Shinhan Securities Vietnam' },
      { image: SHINHAN_VISUALS.about.storyHero, href: SHINHAN_BRAND_LINKS.trading.web, ariaLabel: 'Online securities trading — Shinhan Securities Vietnam platform' },
      { image: SHINHAN_VISUALS.about.hero, href: SHINHAN_BRAND_LINKS.trading.login, ariaLabel: 'Open an online securities account — Shinhan Securities Vietnam' }
    ],
    heroCarouselRegion: 'Homepage hero banners',
    heroCarouselDots: 'Choose banner',
    heroCarouselPrev: 'Previous banner',
    heroCarouselNext: 'Next banner'
  }
};

export function getLegacyHomeContent(locale: HomeLocale) {
  return CONTENT[locale];
}

export function getHeroCtas(locale: HomeLocale) {
  return locale === 'vi'
    ? {
        primary: { label: 'Mở tài khoản ngay', href: SHINHAN_BRAND_LINKS.trading.login },
        secondary: { label: 'Giao dịch online', href: SHINHAN_BRAND_LINKS.trading.web }
      }
    : {
        primary: { label: 'Open account now', href: SHINHAN_BRAND_LINKS.trading.login },
        secondary: { label: 'Start trading', href: SHINHAN_BRAND_LINKS.trading.web }
      };
}

export function getAccountTrustItems(locale: HomeLocale) {
  return locale === 'vi'
    ? ['Hoàn tất trong ~3 phút', 'Xác thực eKYC bảo mật', 'Hỗ trợ 24/7']
    : ['Complete in ~3 minutes', 'Secure eKYC verification', '24/7 assistance'];
}

export function getOpenAccountSectionCopy(locale: HomeLocale) {
  return locale === 'vi'
    ? {
        badge: 'eKYC 100% online',
        title: 'Mở tài khoản trực tuyến',
        body: [
          'Mở tài khoản chứng khoán, không khó!',
          'Chỉ với CCCD bạn có thể hoàn thành việc mở tài khoản chứng khoán ngay tại nhà.',
          'Bắt đầu cùng SHINHAN từ bây giờ.'
        ],
        ctaLabel: 'Mở tài khoản'
      }
    : {
        badge: '100% eKYC onboarding',
        title: 'Open Online Account',
        body: [
          'Opening a securities account is simple.',
          'With just your ID card, complete account registration at home.',
          'Start investing with SHINHAN today.'
        ],
        ctaLabel: 'Open account'
      };
}

export function getAiStackCopy(locale: HomeLocale) {
  return locale === 'vi'
    ? {
        eyebrow: 'Hạ tầng AI & dữ liệu',
        title: 'Quyết định nhanh hơn với tín hiệu thông minh và luồng dữ liệu thời gian thực'
      }
    : {
        eyebrow: 'AI & data infrastructure',
        title: 'Faster decisions with intelligent signals and realtime market streams'
      };
}

export function getAiCards(locale: HomeLocale) {
  return CONTENT[locale].aiCards;
}

export function getPriceBoardCopy(locale: HomeLocale) {
  return locale === 'vi'
    ? {
        eyebrow: 'Thị trường',
        title: 'Bảng giá trực tuyến',
        liveLabel: 'Live market stream',
        tabs: [
          { label: 'HOSE', href: SHINHAN_BRAND_LINKS.trading.priceBoard('HSX') },
          { label: 'HNX', href: SHINHAN_BRAND_LINKS.trading.priceBoard('HNX') },
          { label: 'UPCOM', href: SHINHAN_BRAND_LINKS.trading.priceBoard('UPC') }
        ]
      }
    : {
        eyebrow: 'Markets',
        title: 'Online Price Board',
        liveLabel: 'Live market stream',
        tabs: [
          { label: 'HOSE', href: SHINHAN_BRAND_LINKS.trading.priceBoard('HSX') },
          { label: 'HNX', href: SHINHAN_BRAND_LINKS.trading.priceBoard('HNX') },
          { label: 'UPCOM', href: SHINHAN_BRAND_LINKS.trading.priceBoard('UPC') }
        ]
      };
}

export function getQuickLinks(locale: HomeLocale) {
  return locale === 'vi'
    ? [
        { label: 'Hướng dẫn mở tài khoản online', href: '/vi/support/mo-tai-khoan-truc-tuyen.html' },
        { label: 'Hướng dẫn giao dịch', href: '/vi/support/huong-dan-giao-dich.html' },
        { label: 'Hướng dẫn nộp & rút tiền', href: '/vi/services/moi-gioi-chung-khoan/dich-vu-tai-chinh.html' },
        { label: 'Danh mục khuyến nghị', href: '/vi/trung-tam-phan-tich' }
      ]
    : [
        { label: 'Online account guide', href: '/en/support/mo-tai-khoan-truc-tuyen.html' },
        { label: 'Trading guide', href: '/en/support/huong-dan-giao-dich.html' },
        { label: 'Deposit & withdraw guide', href: '/en/services/moi-gioi-chung-khoan/dich-vu-tai-chinh.html' },
        { label: 'Recommended portfolio', href: '/en/research' }
      ];
}

export function getShortcutLinks(locale: HomeLocale) {
  return locale === 'vi'
    ? [
        { label: 'Mobile Trading', href: '/vi/san-pham-dich-vu/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html' },
        { label: 'Web Trading', href: SHINHAN_BRAND_LINKS.trading.web }
      ]
    : [
        { label: 'Mobile Trading', href: '/en/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html' },
        { label: 'Web Trading', href: SHINHAN_BRAND_LINKS.trading.web }
      ];
}

export function getEcosystemCopy(locale: HomeLocale) {
  return locale === 'vi'
    ? {
        title: 'Hệ sinh thái đầu tư đồng bộ',
        description:
          'Kết hợp công nghệ giao dịch, dữ liệu theo thời gian thực và đội ngũ chuyên gia để tối ưu trải nghiệm đầu tư cho cá nhân và tổ chức.',
        buttonLabel: 'Khám phá nền tảng',
        marketLabel: 'Tổng quan thị trường'
      }
    : {
        title: 'Integrated ecosystem for modern investing',
        description:
          'Combining trading technology, realtime data streams, and expert support for both retail and institutional investors.',
        buttonLabel: 'Explore platform',
        marketLabel: 'Market overview'
  };
}

export function getTradingCopy(locale: HomeLocale) {
  return locale === 'vi'
    ? {
        badge: 'AI Trading Stack',
        title: 'Hệ thống giao dịch',
        exploreLabel: 'Khám phá',
        body: [
          'Công nghệ nhanh nhất thị trường chứng khoán Việt Nam;',
          'Giao diện thông minh, thân thiện với người dùng;',
          'Công cụ phân tích thị trường đơn giản và chuyên biệt;',
          'Cho bạn cái nhìn toàn diện và chi tiết nhất.'
        ]
      }
    : {
        badge: 'AI Trading Stack',
        title: 'Trading Systems',
        exploreLabel: 'Explore',
        body: [
          'Fastest trading technology for Vietnam market;',
          'Smart and user-friendly interface;',
          'Simple but specialized analytics toolkit;',
          'Delivering a full and detailed market view.'
        ]
      };
}

export function getTradingSystems(locale: HomeLocale) {
  return locale === 'vi'
    ? [
        {
          title: 'Mobile Trading System',
          desc: 'Theo dõi thị trường và đặt lệnh nhanh trên ứng dụng di động.',
          icon: SHINHAN_VISUALS.services.platforms.mts,
          href: '/vi/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html'
        },
        {
          title: 'Web Trading System',
          desc: 'Giao diện web tối ưu hiệu năng cho nhà đầu tư cá nhân và tổ chức.',
          icon: SHINHAN_VISUALS.services.platforms.wts,
          href: SHINHAN_BRAND_LINKS.trading.web
        },
        {
          title: 'Home Trading System',
          desc: 'Nền tảng chuyên sâu với bộ công cụ phân tích chuyên nghiệp.',
          icon: SHINHAN_VISUALS.services.platforms.hts,
          href: '/vi/services/moi-gioi-chung-khoan/he-thong-giao-dich.html'
        }
      ]
    : [
        {
          title: 'Mobile Trading System',
          desc: 'Monitor and execute orders quickly from your mobile trading app.',
          icon: SHINHAN_VISUALS.services.platforms.mts,
          href: '/en/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html'
        },
        {
          title: 'Web Trading System',
          desc: 'A high-performance web experience for retail and institutional users.',
          icon: SHINHAN_VISUALS.services.platforms.wts,
          href: SHINHAN_BRAND_LINKS.trading.web
        },
        {
          title: 'Home Trading System',
          desc: 'Advanced workstation with professional analytics capabilities.',
          icon: SHINHAN_VISUALS.services.platforms.hts,
          href: '/en/services/moi-gioi-chung-khoan/he-thong-giao-dich.html'
        }
      ];
}

export function getServiceCards(locale: HomeLocale) {
  return CONTENT[locale].services;
}

export function getServiceCopy(locale: HomeLocale) {
  return locale === 'vi'
    ? { title: 'Dịch vụ chúng tôi cung cấp', exploreLabel: 'Khám phá' }
    : { title: 'Our Services', exploreLabel: 'Explore' };
}

export function getOpenAccountCopy(locale: HomeLocale) {
  return locale === 'vi'
    ? {
        subLabel: 'Hướng dẫn mở tài khoản',
        subHref: '/vi/support/mo-tai-khoan-truc-tuyen.html'
      }
    : {
        subLabel: 'Account opening guide',
        subHref: '/en/support/mo-tai-khoan-truc-tuyen.html'
      };
}
