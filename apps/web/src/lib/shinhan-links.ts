export const SHINHAN_BRAND_LINKS = {
  contact: {
    hotlineLabel: '028 6299 8000',
    hotlineTel: 'tel:02862998000',
    email: 'support@shinhan.com',
    emailHref: 'mailto:support@shinhan.com',
    facebookLabel: 'facebook.com/chungkhoanShinhan',
    facebook: 'https://facebook.com/chungkhoanShinhan',
    zaloLabel: 'zalo.ssv/vn',
    zalo: 'https://zalo.me/ssvvn'
  },
  social: {
    facebook: 'https://www.facebook.com/ChungKhoanShinhanVietnam',
    youtube: 'https://www.youtube.com/@chungkhoanshinhanvietnam',
    linkedin: 'https://www.linkedin.com/company/shinhan-securities-vietnam',
    zalo: 'https://zalo.me/871066958519461595'
  },
  trading: {
    web: 'https://online.shinhansec.com.vn/',
    login: 'https://online.shinhansec.com.vn/login',
    ssvChampionship: 'https://online.shinhansec.com.vn/ssvchampionship',
    priceBoard: (market: 'HSX' | 'HNX' | 'UPC') => `https://online.shinhansec.com.vn/priceboard?${market}`
  }
} as const;
