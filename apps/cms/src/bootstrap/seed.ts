import fs from 'fs/promises';
import path from 'path';

type Locale = 'vi' | 'en';

type SeedMedia = Record<
  | 'heroMain'
  | 'heroAlt1'
  | 'heroAlt2'
  | 'serviceBrokerage'
  | 'serviceIconBrokerage'
  | 'serviceIB'
  | 'serviceIconIB'
  | 'tradingBg'
  | 'openAccountBg'
  | 'oneShinhanBg'
  | 'serviceResearchBg'
  | 'serviceIconResearch'
  | 'advisorSectionBg'
  | 'advisorTruong'
  | 'advisorUyen',
  { id: number }
>;

type StrapiInstance = {
  entityService: {
    findMany: (uid: string, params?: Record<string, unknown>) => Promise<any>;
    create: (uid: string, params: Record<string, unknown>) => Promise<any>;
    update: (uid: string, id: number, params: Record<string, unknown>) => Promise<any>;
  };
  db: {
    query: (uid: string) => {
      findOne: (params?: Record<string, unknown>) => Promise<any>;
    };
  };
  plugin: (name: string) => {
    service: (serviceName: string) => {
      find: () => Promise<Array<{ code: string; name: string }>>;
      create: (params: { code: string; name: string }) => Promise<void>;
    };
  };
  log: {
    info: (message: string) => void;
    error: (message: string) => void;
  };
};

const nowIso = new Date().toISOString();
const WEB_TRADING_URL = 'https://online.shinhansec.com.vn/';

const localized = {
  vi: {
    siteName: 'FinTrust Securities',
    siteTagline: 'Nền tảng dịch vụ chứng khoán và nghiên cứu chuyên sâu',
    siteDescription:
      'Website doanh nghiệp tài chính với trọng tâm minh bạch, kỷ luật quản trị rủi ro và năng lực tư vấn đầu tư chuyên sâu.',
    organizationName: 'Công ty Cổ phần Chứng khoán FinTrust',
    supportHotline: '1900 6868',
    supportEmail: 'support@fintrust.vn',
    address: 'Tầng 15, 99 Nguyễn Du, Quận 1, TP. Hồ Chí Minh',
    nav: {
      items: [
        { label: 'Về chúng tôi', href: '/vi/about' },
        {
          label: 'Sản phẩm & Dịch vụ',
          href: '/vi/services',
          children: [
            { label: 'Môi giới chứng khoán', href: '/vi/services/moi-gioi-chung-khoan' },
            { label: 'Giao dịch trực tuyến', href: '/vi/services/giao-dich-truc-tuyen' },
            { label: 'Tư vấn đầu tư', href: '/vi/services/tu-van-dau-tu' }
          ]
        },
        { label: 'Trung tâm nghiên cứu', href: '/vi/research' },
        { label: 'Tin tức & Sự kiện', href: '/vi/news' },
        { label: 'Hỗ trợ khách hàng', href: '/vi/support' },
        { label: 'Tuyển dụng', href: '/vi/careers' },
        { label: 'Liên hệ', href: '/vi/contact' }
      ],
      primaryButton: { label: 'Mở tài khoản', href: '/vi/support/open-account', variant: 'primary', target: '_self' },
      secondaryButton: { label: 'Tư vấn ngay', href: '/vi/contact', variant: 'secondary', target: '_self' }
    },
    footer: {
      columns: [
        {
          label: 'Doanh nghiệp',
          href: '/vi/about',
          children: [
            { label: 'Giới thiệu', href: '/vi/about' },
            { label: 'Lịch sử phát triển', href: '/vi/about#milestones' },
            { label: 'Tuyển dụng', href: '/vi/careers' }
          ]
        },
        {
          label: 'Dịch vụ',
          href: '/vi/services',
          children: [
            { label: 'Môi giới', href: '/vi/services/moi-gioi-chung-khoan' },
            { label: 'Giao dịch trực tuyến', href: '/vi/services/giao-dich-truc-tuyen' },
            { label: 'Tư vấn', href: '/vi/services/tu-van-dau-tu' }
          ]
        },
        {
          label: 'Nội dung',
          href: '/vi/news',
          children: [
            { label: 'Tin tức', href: '/vi/news' },
            { label: 'Sự kiện', href: '/vi/events' },
            { label: 'Báo cáo phân tích', href: '/vi/research' }
          ]
        }
      ],
      legalLinks: [
        { label: 'Chính sách bảo mật', href: '/vi/legal/chinh-sach-bao-mat' },
        { label: 'Điều khoản sử dụng', href: '/vi/legal/dieu-khoan-su-dung' },
        { label: 'Miễn trừ trách nhiệm', href: '/vi/legal/mien-tru-trach-nhiem' }
      ],
      copyrightText: '© 2026 FinTrust Securities. All rights reserved.'
    },
    homeTitle: 'Giải pháp chứng khoán toàn diện cho nhà đầu tư hiện đại',
    homeSummary: 'Tối ưu quyết định đầu tư bằng dữ liệu, nghiên cứu và nền tảng giao dịch hiệu suất cao.',
    contactPageTitle: 'Kết nối cùng FinTrust',
    contactPageSummary: 'Đội ngũ tư vấn luôn sẵn sàng hỗ trợ mở tài khoản, dịch vụ đầu tư và giải đáp thủ tục.'
  },
  en: {
    siteName: 'FinTrust Securities',
    siteTagline: 'Enterprise brokerage and market intelligence platform',
    siteDescription:
      'Corporate fintech website focused on transparency, risk governance discipline, and professional investment advisory.',
    organizationName: 'FinTrust Securities Joint Stock Company',
    supportHotline: '+84 1900 6868',
    supportEmail: 'support@fintrust.vn',
    address: '15F, 99 Nguyen Du Street, District 1, Ho Chi Minh City, Vietnam',
    nav: {
      items: [
        { label: 'About', href: '/en/about' },
        {
          label: 'Products & Services',
          href: '/en/services',
          children: [
            { label: 'Securities Brokerage', href: '/en/services/moi-gioi-chung-khoan' },
            { label: 'Online Trading', href: '/en/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html' },
            { label: 'Investment Advisory', href: '/en/services/moi-gioi-chung-khoan/tu-van-dau-tu.html' }
          ]
        },
        { label: 'Research Center', href: '/en/research' },
        { label: 'News & Events', href: '/en/news' },
        { label: 'Customer Support', href: '/en/support' },
        { label: 'Careers', href: '/en/careers' },
        { label: 'Contact', href: '/en/contact' }
      ],
      primaryButton: { label: 'Open Account', href: '/en/support/open-account', variant: 'primary', target: '_self' },
      secondaryButton: { label: 'Talk to Advisor', href: '/en/contact', variant: 'secondary', target: '_self' }
    },
    footer: {
      columns: [
        {
          label: 'Corporate',
          href: '/en/about',
          children: [
            { label: 'Overview', href: '/en/about' },
            { label: 'Milestones', href: '/en/about#milestones' },
            { label: 'Careers', href: '/en/careers' }
          ]
        },
        {
          label: 'Services',
          href: '/en/services',
          children: [
            { label: 'Brokerage', href: '/en/services/moi-gioi-chung-khoan' },
            { label: 'Online Trading', href: '/en/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html' },
            { label: 'Advisory', href: '/en/services/moi-gioi-chung-khoan/tu-van-dau-tu.html' }
          ]
        },
        {
          label: 'Insights',
          href: '/en/news',
          children: [
            { label: 'News', href: '/en/news' },
            { label: 'Events', href: '/en/events' },
            { label: 'Research Reports', href: '/en/research' }
          ]
        }
      ],
      legalLinks: [
        { label: 'Privacy Policy', href: '/en/legal/privacy-policy' },
        { label: 'Terms of Use', href: '/en/legal/terms-of-use' },
        { label: 'Disclaimer', href: '/en/legal/disclaimer' }
      ],
      copyrightText: '© 2026 FinTrust Securities. All rights reserved.'
    },
    homeTitle: 'End-to-end securities solutions for modern investors',
    homeSummary: 'Make better investment decisions with trusted data, research, and high-performance trading systems.',
    contactPageTitle: 'Connect with FinTrust',
    contactPageSummary: 'Our advisory team is ready to support account opening, investment services, and operations.'
  }
} as const;

function normalizeSeoText(input: string) {
  return input.replace(/\s+/g, ' ').trim();
}

function buildSeoTitle(mainText: string, siteName: string) {
  const suffix = ` | ${siteName}`;
  const normalized = normalizeSeoText(mainText);
  const maxMainLength = Math.max(1, 70 - suffix.length);
  const safeMain = normalized.length > maxMainLength ? normalized.slice(0, maxMainLength).trimEnd() : normalized;
  const title = `${safeMain}${suffix}`;
  return title.length >= 20 ? title : `${siteName} | ${safeMain}`.slice(0, 70);
}

function buildSeoDescription(primaryText: string, locale: Locale, contextText?: string) {
  const fallback =
    locale === 'vi'
      ? 'FinTrust Securities cung cấp dịch vụ chứng khoán minh bạch, quản trị rủi ro kỷ luật và giải pháp đầu tư phù hợp cho từng mục tiêu tài chính.'
      : 'FinTrust Securities delivers transparent brokerage services, disciplined risk governance, and investment solutions tailored to each client objective.';
  const extra =
    locale === 'vi'
      ? 'Nội dung được cập nhật định kỳ để hỗ trợ nhà đầu tư ra quyết định hiệu quả và bền vững.'
      : 'Content is updated regularly to support timely and sustainable investment decisions.';

  let result = normalizeSeoText(primaryText);
  if (contextText) {
    result = `${result} ${normalizeSeoText(contextText)}`;
  }
  if (result.length < 80) {
    result = `${result} ${fallback}`;
  }
  if (result.length < 80) {
    result = `${result} ${extra}`;
  }
  return result.length > 180 ? result.slice(0, 180).trimEnd() : result;
}

function getPublicAssetPath(relativePath: string) {
  return path.resolve(__dirname, '../../../../web/public', relativePath);
}

function mimeFromFilename(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.svg') return 'image/svg+xml';
  return 'application/octet-stream';
}

async function ensureUploadedMedia(strapi: StrapiInstance, relativePath: string, fileName?: string) {
  const absolutePath = getPublicAssetPath(relativePath);
  const resolvedFileName = fileName || path.basename(relativePath);
  const existing = await strapi.db.query('plugin::upload.file').findOne({
    where: { name: resolvedFileName }
  });

  if (existing?.id) {
    return existing;
  }

  const stat = await fs.stat(absolutePath);
  const uploadService = strapi.plugin('upload').service('upload') as any;
  const tmpWorkingDirectory = await fs.mkdtemp('/tmp/strapi-upload-');

  try {
    const fileData = await uploadService.enhanceAndValidateFile(
      {
        path: absolutePath,
        name: resolvedFileName,
        type: mimeFromFilename(resolvedFileName),
        size: stat.size,
        tmpWorkingDirectory
      },
      { name: resolvedFileName },
      {}
    );

    return await uploadService.uploadFileAndPersist(fileData);
  } finally {
    await fs.rm(tmpWorkingDirectory, { recursive: true, force: true });
  }
}

async function ensureCmsMedia(strapi: StrapiInstance): Promise<SeedMedia> {
  const [
    heroMain,
    heroAlt1,
    heroAlt2,
    serviceBrokerage,
    serviceIconBrokerage,
    serviceIB,
    serviceIconIB,
    tradingBg,
    openAccountBg,
    oneShinhanBg,
    serviceResearchBg,
    serviceIconResearch,
    advisorSectionBg,
    advisorTruong,
    advisorUyen
  ] = await Promise.all([
    ensureUploadedMedia(strapi, 'shinhan/banners/hero-main.png'),
    ensureUploadedMedia(strapi, 'shinhan/banners/hero-alt-1.png'),
    ensureUploadedMedia(strapi, 'shinhan/banners/hero-alt-2.jpg'),
    ensureUploadedMedia(strapi, 'shinhan/content/service-bg-brokerage.png'),
    ensureUploadedMedia(strapi, 'shinhan/content/service-icon-brokerage.png'),
    ensureUploadedMedia(strapi, 'shinhan/content/service-bg-ib.png'),
    ensureUploadedMedia(strapi, 'shinhan/content/service-icon-ib.png'),
    ensureUploadedMedia(strapi, 'shinhan/content/trading-bg.png'),
    ensureUploadedMedia(strapi, 'shinhan/content/open-account-bg.png'),
    ensureUploadedMedia(strapi, 'shinhan/content/one-shinhan-bg.png'),
    ensureUploadedMedia(strapi, 'shinhan/content/service-bg-research.png'),
    ensureUploadedMedia(strapi, 'shinhan/content/service-icon-research.png'),
    ensureUploadedMedia(strapi, 'shinhan/content/advisor-section-bg.svg'),
    ensureUploadedMedia(strapi, 'shinhan/advisors/nguyen-quang-truong.png'),
    ensureUploadedMedia(strapi, 'shinhan/advisors/nguyen-thi-thanh-uyen.png')
  ]);

  return {
    heroMain,
    heroAlt1,
    heroAlt2,
    serviceBrokerage,
    serviceIconBrokerage,
    serviceIB,
    serviceIconIB,
    tradingBg,
    openAccountBg,
    oneShinhanBg,
    serviceResearchBg,
    serviceIconResearch,
    advisorSectionBg,
    advisorTruong,
    advisorUyen
  };
}

async function ensureLocales(strapi: StrapiInstance) {
  const localesService = strapi.plugin('i18n').service('locales');
  const locales = await localesService.find();
  const codes = locales.map((item) => item.code);

  if (!codes.includes('vi')) {
    await localesService.create({ code: 'vi', name: 'Vietnamese (vi)' });
    strapi.log.info('[seed] Added locale vi');
  }

  if (!codes.includes('en')) {
    await localesService.create({ code: 'en', name: 'English (en)' });
    strapi.log.info('[seed] Added locale en');
  }
}

async function upsertSingle(
  strapi: StrapiInstance,
  uid: string,
  locale: Locale,
  data: Record<string, unknown>
) {
  const existing = await strapi.db.query(uid).findOne({ where: { locale } });
  const payload = { ...data, locale, publishedAt: nowIso };

  if (existing?.id) {
    return strapi.entityService.update(uid, existing.id, { data: payload });
  }

  return strapi.entityService.create(uid, { data: payload });
}

async function upsertBySlug(
  strapi: StrapiInstance,
  uid: string,
  locale: Locale,
  data: Record<string, unknown>
) {
  const entries = (await strapi.entityService.findMany(uid, {
    locale,
    publicationState: 'preview',
    filters: { slug: data.slug },
    limit: 1
  })) as Array<{ id: number }>;

  const payload = { ...data, locale, publishedAt: nowIso };

  if (entries?.[0]?.id) {
    return strapi.entityService.update(uid, entries[0].id, { data: payload });
  }

  return strapi.entityService.create(uid, { data: payload });
}

async function setPublicPermissions(strapi: StrapiInstance) {
  const role = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' }, populate: ['permissions'] });

  if (!role?.id) {
    strapi.log.error('[seed] Public role not found, skip permissions setup.');
    return;
  }

  const actions = [
    'plugin::upload.file.find',
    'plugin::upload.file.findOne',
    'api::global-setting.global-setting.find',
    'api::header-navigation.header-navigation.find',
    'api::footer-navigation.footer-navigation.find',
    'api::homepage.homepage.find',
    'api::seo-default.seo-default.find',
    'api::contact-page-setting.contact-page-setting.find',
    'api::page.page.find',
    'api::page.page.findOne',
    'api::page-type.page-type.find',
    'api::page-type.page-type.findOne',
    'api::service-category.service-category.find',
    'api::service-category.service-category.findOne',
    'api::service.service.find',
    'api::service.service.findOne',
    'api::news-category.news-category.find',
    'api::news-category.news-category.findOne',
    'api::news-article.news-article.find',
    'api::news-article.news-article.findOne',
    'api::event-category.event-category.find',
    'api::event-category.event-category.findOne',
    'api::event.event.find',
    'api::event.event.findOne',
    'api::research-category.research-category.find',
    'api::research-category.research-category.findOne',
    'api::research-report-type.research-report-type.find',
    'api::research-report-type.research-report-type.findOne',
    'api::research-report.research-report.find',
    'api::research-report.research-report.findOne',
    'api::faq-category.faq-category.find',
    'api::faq-category.faq-category.findOne',
    'api::banner-placement.banner-placement.find',
    'api::banner-placement.banner-placement.findOne',
    'api::related-content-type.related-content-type.find',
    'api::related-content-type.related-content-type.findOne',
    'api::office-type.office-type.find',
    'api::office-type.office-type.findOne',
    'api::faq-item.faq-item.find',
    'api::faq-item.faq-item.findOne',
    'api::career-job.career-job.find',
    'api::career-job.career-job.findOne',
    'api::employment-type.employment-type.find',
    'api::employment-type.employment-type.findOne',
    'api::office-location.office-location.find',
    'api::office-location.office-location.findOne',
    'api::announcement.announcement.find',
    'api::announcement.announcement.findOne',
    'api::author.author.find',
    'api::author.author.findOne',
    'api::tag.tag.find',
    'api::tag.tag.findOne',
    'api::downloadable-document.downloadable-document.find',
    'api::downloadable-document.downloadable-document.findOne',
    'api::document-category.document-category.find',
    'api::document-category.document-category.findOne',
    'api::banner.banner.find',
    'api::banner.banner.findOne'
  ];

  for (const action of actions) {
    const existing = role.permissions.find((item: { action: string }) => item.action === action);

    if (!existing) {
      await strapi.entityService.create('plugin::users-permissions.permission', {
        data: {
          action,
          enabled: true,
          role: role.id
        }
      });
      continue;
    }

    if (!existing.enabled) {
      await strapi.entityService.update('plugin::users-permissions.permission', existing.id, {
        data: { enabled: true }
      });
    }
  }

  strapi.log.info('[seed] Public role permissions ensured.');
}

async function seedLocale(strapi: StrapiInstance, locale: Locale, media: SeedMedia) {
  const t = localized[locale];

  await upsertSingle(strapi, 'api::global-setting.global-setting', locale, {
    siteName: t.siteName,
    siteTagline: t.siteTagline,
    siteDescription: t.siteDescription,
    organizationName: t.organizationName,
    supportHotline: t.supportHotline,
    supportEmail: t.supportEmail,
    address: t.address,
    socialLinks: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com', target: '_blank' },
      { label: 'YouTube', href: 'https://www.youtube.com', target: '_blank' },
      { label: 'Facebook', href: 'https://www.facebook.com', target: '_blank' }
    ],
    defaultSeo: {
      metaTitle: buildSeoTitle(locale === 'vi' ? 'Nền tảng dịch vụ chứng khoán' : 'Securities service platform', t.siteName),
      metaDescription: buildSeoDescription(t.siteDescription, locale),
      metaRobots: 'index,follow',
      twitterCard: 'summary_large_image'
    }
  });

  await upsertSingle(strapi, 'api::header-navigation.header-navigation', locale, {
    items: t.nav.items,
    primaryButton: t.nav.primaryButton,
    secondaryButton: t.nav.secondaryButton
  });

  await upsertSingle(strapi, 'api::footer-navigation.footer-navigation', locale, {
    columns: t.footer.columns,
    legalLinks: t.footer.legalLinks,
    copyrightText: t.footer.copyrightText
  });

  await upsertSingle(strapi, 'api::seo-default.seo-default', locale, {
    siteUrl: 'https://fintrust.vn',
    meta: {
      metaTitle: buildSeoTitle(locale === 'vi' ? 'Website doanh nghiệp tài chính' : 'Corporate fintech website', t.siteName),
      metaDescription: buildSeoDescription(t.siteDescription, locale),
      canonicalUrl: `https://fintrust.vn/${locale}`,
      metaRobots: 'index,follow',
      twitterCard: 'summary_large_image'
    },
    organizationSchema: {
      '@type': 'Organization',
      name: t.organizationName,
      url: 'https://fintrust.vn',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          telephone: t.supportHotline,
          email: t.supportEmail
        }
      ]
    }
  });

  await upsertSingle(strapi, 'api::contact-page-setting.contact-page-setting', locale, {
    title: t.contactPageTitle,
    summary: t.contactPageSummary,
    recipientEmail: t.supportEmail,
    mapEmbedUrl: 'https://maps.google.com/',
    supportChannels: [
      { label: 'Hotline', href: `tel:${t.supportHotline}` },
      { label: 'Email', href: `mailto:${t.supportEmail}` },
      { label: 'Live chat', href: '#', target: '_self' }
    ],
    seo: {
      metaTitle: buildSeoTitle(t.contactPageTitle, t.siteName),
      metaDescription: buildSeoDescription(t.contactPageSummary, locale),
      metaRobots: 'index,follow'
    }
  });

  await upsertSingle(strapi, 'api::homepage.homepage', locale, {
    title: t.homeTitle,
    summary: t.homeSummary,
    hero: {
      kicker: locale === 'vi' ? 'Doanh nghiệp tài chính uy tín' : 'Trusted financial institution',
      title: t.homeTitle,
      subtitle: t.homeSummary,
      backgroundImage: media.heroMain.id,
      primaryButton: t.nav.primaryButton,
      secondaryButton: t.nav.secondaryButton
    },
    sections: [
      {
        __component: 'sections.home-market-strip-section',
        positionIndex: 50
      },
      {
        __component: 'sections.home-one-shinhan-section',
        positionIndex: 100,
        kicker: locale === 'vi' ? 'Hệ sinh thái One Shinhan' : 'One Shinhan ecosystem',
        profileLabel: locale === 'vi' ? 'Hồ sơ đối tác' : 'Partner profile',
        title: locale === 'vi' ? 'Kết nối với hệ sinh thái tài chính Shinhan' : 'Connect with the Shinhan financial ecosystem',
        subtitle:
          locale === 'vi'
            ? 'Một trung tâm cho ngân hàng, chứng khoán, công nghệ, bảo hiểm và tài chính tiêu dùng.'
            : 'A single touchpoint for banking, securities, technology, insurance, and consumer finance.',
        visitLabel: locale === 'vi' ? 'Truy cập ngay' : 'Visit now',
        carouselLabel: locale === 'vi' ? 'One Shinhan' : 'One Shinhan ecosystem',
        ecosystemLabel: locale === 'vi' ? 'Hệ sinh thái Shinhan' : 'Shinhan ecosystem',
        officeCountLabel: locale === 'vi' ? 'văn phòng' : 'offices',
        officeLocationPrimary: locale === 'vi' ? 'Hồ Chí Minh' : 'Ho Chi Minh City',
        officeLocationSecondary: locale === 'vi' ? 'Hà Nội' : 'Ha Noi',
        footerTitle: 'One Shinhan',
        footerDescription:
          locale === 'vi'
            ? 'Kết nối đồng bộ giữa ngân hàng, chứng khoán và bảo hiểm để theo dõi tài sản, giao dịch và thông tin đầu tư trong một luồng.'
            : 'A unified journey across banking, securities, and insurance for seamless tracking of assets, trading, and investment information.',
        partners: [
          {
            name: locale === 'vi' ? 'Ngân hàng Shinhan' : 'Shinhan Bank',
            shortDesc: locale === 'vi' ? 'Ngân hàng & thanh toán' : 'Banking and payments',
            href: 'https://shinhan.com.vn',
            alt: locale === 'vi' ? 'Ngân hàng Shinhan' : 'Shinhan Bank',
            logo: media.serviceBrokerage.id,
            priority: 1,
            active: true
          },
          {
            name: locale === 'vi' ? 'Shinhan DS' : 'Shinhan DS',
            shortDesc: locale === 'vi' ? 'Công nghệ tài chính' : 'Technology solutions',
            href: 'https://shinhands.com.vn',
            alt: 'Shinhan DS',
            logo: media.oneShinhanBg.id,
            priority: 2,
            active: true
          },
          {
            name: locale === 'vi' ? 'Chứng khoán Shinhan' : 'Shinhan Securities',
            shortDesc: locale === 'vi' ? 'Môi giới và nghiên cứu' : 'Brokerage and research',
            href: locale === 'vi' ? '/vi/about' : '/en/about',
            alt: locale === 'vi' ? 'Chứng khoán Shinhan' : 'Shinhan Securities',
            logo: media.heroMain.id,
            priority: 3,
            active: true
          },
          {
            name: locale === 'vi' ? 'Shinhan Life' : 'Shinhan Life',
            shortDesc: locale === 'vi' ? 'Bảo hiểm' : 'Insurance',
            href: 'https://shinhanlifevn.com.vn',
            alt: 'Shinhan Life',
            logo: media.heroAlt1.id,
            priority: 4,
            active: true
          },
          {
            name: locale === 'vi' ? 'Shinhan Finance' : 'Shinhan Finance',
            shortDesc: locale === 'vi' ? 'Tài chính tiêu dùng' : 'Consumer finance',
            href: 'https://www.shinhanfinance.com.vn',
            alt: 'Shinhan Finance',
            logo: media.heroAlt2.id,
            priority: 5,
            active: true
          }
        ],
        highlights: [
          {
            title: locale === 'vi' ? 'Kết nối đồng bộ' : 'Unified access',
            description:
              locale === 'vi'
              ? 'Ngân hàng, chứng khoán, bảo hiểm'
              : 'Banking, securities, and insurance',
            icon: media.serviceIconBrokerage.id,
            accentColor: '#0f4ea1',
            accentBackgroundColor: '#f3f8ff',
            accentBorderColor: '#cfe0f4'
          },
          {
            title: locale === 'vi' ? 'Trải nghiệm realtime' : 'Realtime experience',
            description:
              locale === 'vi'
                ? 'Luồng dữ liệu và giao dịch liên tục'
                : 'Live data and uninterrupted execution',
            icon: media.serviceIconResearch.id,
            accentColor: '#0f9c5d',
            accentBackgroundColor: '#effaf4',
            accentBorderColor: '#cdeedc'
          },
          {
            title: locale === 'vi' ? 'Hỗ trợ hành trình' : 'Journey support',
            description:
              locale === 'vi'
                ? 'Từ khám phá đến giao dịch'
                : 'From discovery to execution',
            icon: media.serviceIconIB.id,
            accentColor: '#d2942f',
            accentBackgroundColor: '#fff8ed',
            accentBorderColor: '#f0dcc0'
          }
        ]
      },
      {
        __component: 'sections.home-ecosystem-section',
        positionIndex: 300,
        eyebrow: locale === 'vi' ? 'Hệ sinh thái đầu tư' : 'Investment ecosystem',
        title: locale === 'vi' ? 'Hệ sinh thái đầu tư đồng bộ' : 'Integrated ecosystem for modern investing',
        description:
          locale === 'vi'
            ? 'Kết hợp công nghệ giao dịch, dữ liệu theo thời gian thực và đội ngũ chuyên gia để tối ưu trải nghiệm đầu tư cho cá nhân và tổ chức.'
            : 'Combining trading technology, realtime data streams, and expert support for both retail and institutional investors.',
        primaryButton: t.nav.primaryButton,
        secondaryButton: t.nav.secondaryButton,
        marketLabel: locale === 'vi' ? 'Tổng quan thị trường' : 'Market overview',
        quickLinks: [
          { label: locale === 'vi' ? 'Hướng dẫn mở tài khoản online' : 'Online account guide', href: locale === 'vi' ? '/vi/support/mo-tai-khoan-truc-tuyen.html' : '/en/support/mo-tai-khoan-truc-tuyen.html', target: '_self' },
          { label: locale === 'vi' ? 'Hướng dẫn giao dịch' : 'Trading guide', href: locale === 'vi' ? '/vi/support/huong-dan-giao-dich.html' : '/en/support/huong-dan-giao-dich.html', target: '_self' },
          { label: locale === 'vi' ? 'Hướng dẫn nộp & rút tiền' : 'Deposit & withdraw guide', href: locale === 'vi' ? '/vi/services/moi-gioi-chung-khoan/dich-vu-tai-chinh.html' : '/en/services/moi-gioi-chung-khoan/dich-vu-tai-chinh.html', target: '_self' },
          { label: locale === 'vi' ? 'Danh mục khuyến nghị' : 'Recommended portfolio', href: locale === 'vi' ? '/vi/research' : '/en/research', target: '_self' }
        ],
        shortcutLinks: [
          { label: locale === 'vi' ? 'Giao dịch di động' : 'Mobile Trading', href: locale === 'vi' ? '/vi/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html' : '/en/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html', target: '_self' },
          { label: locale === 'vi' ? 'Giao dịch web' : 'Web Trading', href: WEB_TRADING_URL, target: '_blank' }
        ]
      },
      {
        __component: 'sections.home-ai-stack-section',
        positionIndex: 200,
        eyebrow: locale === 'vi' ? 'Hạ tầng AI & dữ liệu' : 'AI & data infrastructure',
        title:
          locale === 'vi'
            ? 'Quyết định nhanh hơn với tín hiệu thông minh và luồng dữ liệu thời gian thực'
            : 'Faster decisions with intelligent signals and realtime market streams',
        cards: [
          {
            title: locale === 'vi' ? 'Bộ tín hiệu AI' : 'AI Signal Engine',
            description:
              locale === 'vi'
                ? 'Mô hình nhận diện xung lực thị trường và cảnh báo biến động theo thời gian thực.'
                : 'Model-driven market momentum detection and realtime movement alerts.',
            value: '24/7 Monitoring'
          },
          {
            title: locale === 'vi' ? 'Luồng dữ liệu thời gian thực' : 'Realtime Data Stream',
            description:
              locale === 'vi'
                ? 'Dòng dữ liệu giá và thanh khoản liên tục để hỗ trợ chiến lược giao dịch linh hoạt.'
                : 'Continuous price and liquidity feed to support agile trading strategies.',
            value: '< 1s Refresh'
          },
          {
            title: locale === 'vi' ? 'Lớp quản trị rủi ro thông minh' : 'Smart Risk Layer',
            description:
              locale === 'vi'
                ? 'Lớp kiểm soát rủi ro thông minh giúp cân bằng giữa hiệu suất và mức chịu đựng rủi ro.'
                : 'Adaptive risk control layer balancing performance and portfolio resilience.',
            value: 'Adaptive Guard'
          }
        ]
      },
      {
        __component: 'sections.feature-card-section',
        positionIndex: 400,
        title: locale === 'vi' ? 'Dịch vụ trọng tâm' : 'Core services',
        description:
          locale === 'vi'
            ? 'Danh mục dịch vụ được thiết kế cho cá nhân, doanh nghiệp và định chế.'
            : 'A service portfolio designed for retail, corporate, and institutional clients.',
        items: [
          {
            title: locale === 'vi' ? 'Môi giới chứng khoán' : 'Securities brokerage',
            description:
              locale === 'vi'
                ? 'Đội ngũ môi giới được đào tạo chuẩn quản trị rủi ro và kỷ luật thực thi.'
                : 'Brokerage support with disciplined execution and risk governance.',
            link: {
              label: locale === 'vi' ? 'Xem chi tiết' : 'Learn more',
              href: locale === 'vi' ? '/vi/services/moi-gioi-chung-khoan' : '/en/services/moi-gioi-chung-khoan'
            }
          },
          {
            title: locale === 'vi' ? 'Nền tảng giao dịch' : 'Trading platform',
            description:
              locale === 'vi'
                ? 'Hạ tầng tốc độ cao, quản trị tài khoản đa lớp và cảnh báo danh mục theo thời gian thực.'
                : 'High-performance platform with multi-layer account controls and real-time alerts.',
            link: {
              label: locale === 'vi' ? 'Khám phá' : 'Explore',
              href: locale === 'vi' ? '/vi/services/giao-dich-truc-tuyen' : '/en/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html'
            }
          },
          {
            title: locale === 'vi' ? 'Nghiên cứu chuyên sâu' : 'Institutional-grade research',
            description:
              locale === 'vi'
                ? 'Báo cáo chiến lược, ngành và doanh nghiệp với góc nhìn định lượng.'
                : 'Strategy, sector and company coverage with a quantitative perspective.',
            link: {
              label: locale === 'vi' ? 'Xem báo cáo' : 'View reports',
              href: locale === 'vi' ? '/vi/research' : '/en/research'
            }
          }
        ]
      },
      {
        __component: 'sections.home-price-board-section',
        positionIndex: 500
      },
      {
        __component: 'sections.trading-system-showcase-section',
        positionIndex: 600,
        title: locale === 'vi' ? 'Hệ thống giao dịch doanh nghiệp' : 'Enterprise trading systems',
        description:
          locale === 'vi'
            ? 'Trải nghiệm giao dịch ổn định trên web, mobile và desktop với chuẩn bảo mật nhiều lớp.'
            : 'Stable multi-device trading experience with enterprise-grade security controls.',
        platformName: 'FinTrust Trader',
        features: [
          locale === 'vi' ? 'Khớp lệnh nhanh' : 'Low-latency matching',
          locale === 'vi' ? 'Quản trị hạn mức' : 'Portfolio controls',
          locale === 'vi' ? 'Cảnh báo biến động' : 'Volatility alerts'
        ],
        screenshot: media.tradingBg.id
      },
      {
        __component: 'sections.stats-section',
        positionIndex: 700,
        title: locale === 'vi' ? 'Năng lực vận hành' : 'Operational strengths',
        items: [
          { label: locale === 'vi' ? 'Khách hàng hoạt động' : 'Active clients', value: '85,000+' },
          { label: locale === 'vi' ? 'Chi nhánh & văn phòng' : 'Branches & offices', value: '12' },
          { label: locale === 'vi' ? 'Báo cáo/năm' : 'Reports per year', value: '1,200+' },
          { label: locale === 'vi' ? 'Tỷ lệ uptime hệ thống' : 'System uptime', value: '99.95%' }
        ]
      },
      {
        __component: 'sections.news-list-section',
        positionIndex: 800,
        title: locale === 'vi' ? 'Tin tức mới nhất' : 'Latest updates',
        description: locale === 'vi' ? 'Cập nhật thị trường và hoạt động doanh nghiệp.' : 'Market and corporate updates.',
        limit: 4,
        featuredOnly: false
      },
      {
        __component: 'sections.research-list-section',
        positionIndex: 900,
        title: locale === 'vi' ? 'Điểm nhấn nghiên cứu' : 'Research highlights',
        description:
          locale === 'vi'
            ? 'Truy cập nhanh các báo cáo chiến lược và phân tích doanh nghiệp.'
            : 'Quick access to strategy and company coverage.',
        limit: 4,
        featuredOnly: false
      },
      {
        __component: 'sections.faq-section',
        positionIndex: 1000,
        title: locale === 'vi' ? 'Câu hỏi thường gặp' : 'Frequently asked questions',
        description: locale === 'vi' ? 'Giải đáp nhanh các quy trình phổ biến.' : 'Answers to common onboarding and service questions.',
        limit: 5
      },
      {
        __component: 'sections.cta-section',
        positionIndex: 1100,
        title: locale === 'vi' ? 'Sẵn sàng bắt đầu hành trình đầu tư?' : 'Ready to start your investment journey?',
        description:
          locale === 'vi'
            ? 'Đăng ký mở tài khoản hoặc đặt lịch tư vấn với chuyên gia của FinTrust.'
            : 'Open an account or schedule a consultation with a FinTrust advisor.',
        primaryButton: t.nav.primaryButton,
        secondaryButton: t.nav.secondaryButton
      },
      {
        __component: 'sections.office-list-section',
        positionIndex: 1200,
        title: locale === 'vi' ? 'Mạng lưới văn phòng' : 'Office network',
        description: locale === 'vi' ? 'Hệ thống chi nhánh hỗ trợ trên toàn quốc.' : 'Branch network supporting clients nationwide.',
        showMapPlaceholder: true
      },
      {
        __component: 'sections.trust-signal-section',
        positionIndex: 1300,
        title: locale === 'vi' ? 'Nền tảng niềm tin' : 'Trust signals',
        description:
          locale === 'vi'
            ? 'Cam kết vận hành minh bạch theo chuẩn kiểm soát nội bộ và tuân thủ.'
            : 'Transparent operations backed by internal controls and compliance discipline.',
        items: [
          {
            title: locale === 'vi' ? 'Quản trị rủi ro đa tầng' : 'Layered risk governance',
            description:
              locale === 'vi'
                ? 'Giám sát vị thế và cảnh báo theo thời gian thực.'
                : 'Real-time position surveillance and alerts.'
          },
          {
            title: locale === 'vi' ? 'Báo cáo minh bạch' : 'Transparent reporting',
            description:
              locale === 'vi'
                ? 'Bộ chỉ số hoạt động được công bố theo chuẩn doanh nghiệp.'
                : 'Enterprise-grade performance and governance reporting.'
          }
        ]
      }
    ],
    seo: {
      metaTitle: buildSeoTitle(locale === 'vi' ? 'Trang chủ' : 'Home', t.siteName),
      metaDescription: buildSeoDescription(t.homeSummary, locale),
      canonicalUrl: `https://fintrust.vn/${locale}`,
      metaRobots: 'index,follow'
    }
  });

  const serviceCategories = locale === 'vi'
    ? [
        { title: 'Khách hàng cá nhân', slug: 'khach-hang-ca-nhan', summary: 'Dịch vụ cho nhà đầu tư cá nhân.' },
        { title: 'Khách hàng tổ chức', slug: 'khach-hang-to-chuc', summary: 'Giải pháp chuyên biệt cho doanh nghiệp và định chế.' }
      ]
    : [
        { title: 'Retail Clients', slug: 'retail-clients', summary: 'Service suite for individual investors.' },
        { title: 'Institutional Clients', slug: 'institutional-clients', summary: 'Tailored solutions for corporate and institutional clients.' }
      ];

  const serviceCategoryMap = new Map<string, number>();
  for (const category of serviceCategories) {
    const entry = await upsertBySlug(strapi, 'api::service-category.service-category', locale, category);
    serviceCategoryMap.set(category.slug, entry.id);
  }

  const newsCategories = locale === 'vi'
    ? [
        { title: 'Tin thị trường', slug: 'tin-thi-truong', summary: 'Diễn biến thị trường và dữ liệu vĩ mô.' },
        { title: 'Tin doanh nghiệp', slug: 'tin-doanh-nghiep', summary: 'Thông tin hoạt động và cập nhật nội bộ.' }
      ]
    : [
        { title: 'Market News', slug: 'market-news', summary: 'Market movement and macro updates.' },
        { title: 'Corporate News', slug: 'corporate-news', summary: 'Company updates and governance news.' }
      ];

  const newsCategoryMap = new Map<string, number>();
  for (const category of newsCategories) {
    const entry = await upsertBySlug(strapi, 'api::news-category.news-category', locale, category);
    newsCategoryMap.set(category.slug, entry.id);
  }

  const eventCategories = locale === 'vi'
    ? [
        { title: 'Sự kiện đầu tư', slug: 'su-kien-dau-tu', summary: 'Chuỗi hội thảo và tọa đàm đầu tư.' },
        { title: 'Đào tạo khách hàng', slug: 'dao-tao-khach-hang', summary: 'Nội dung hướng dẫn sử dụng dịch vụ.' }
      ]
    : [
        { title: 'Investment Events', slug: 'investment-events', summary: 'Investor conference and briefings.' },
        { title: 'Client Education', slug: 'client-education', summary: 'Service and platform training sessions.' }
      ];

  const eventCategoryMap = new Map<string, number>();
  for (const category of eventCategories) {
    const entry = await upsertBySlug(strapi, 'api::event-category.event-category', locale, category);
    eventCategoryMap.set(category.slug, entry.id);
  }

  const researchCategories = locale === 'vi'
    ? [
        { title: 'Báo cáo chiến lược', slug: 'bao-cao-chien-luoc', summary: 'Phân tích chiến lược theo chu kỳ thị trường.' },
        { title: 'Phân tích doanh nghiệp', slug: 'phan-tich-doanh-nghiep', summary: 'Định giá, rủi ro và triển vọng doanh nghiệp.' },
        { title: 'Phân tích ngành', slug: 'phan-tich-nganh', summary: 'Xu hướng ngành và cơ hội đầu tư.' }
      ]
    : [
        { title: 'Strategy Reports', slug: 'strategy-reports', summary: 'Top-down strategy and asset allocation perspectives.' },
        { title: 'Company Analysis', slug: 'company-analysis', summary: 'Valuation, risk and earnings outlook.' },
        { title: 'Sector Analysis', slug: 'sector-analysis', summary: 'Sector trends and opportunity mapping.' }
      ];

  const researchCategoryMap = new Map<string, number>();
  for (const category of researchCategories) {
    const entry = await upsertBySlug(strapi, 'api::research-category.research-category', locale, category);
    researchCategoryMap.set(category.slug, entry.id);
  }

  const faqCategories = locale === 'vi'
    ? [
        { title: 'Mở tài khoản', slug: 'mo-tai-khoan', summary: 'Hướng dẫn và điều kiện mở tài khoản.' },
        { title: 'Giao dịch', slug: 'giao-dich', summary: 'Quy trình đặt lệnh và quản trị tài khoản.' }
      ]
    : [
        { title: 'Account Opening', slug: 'account-opening', summary: 'Onboarding conditions and process.' },
        { title: 'Trading', slug: 'trading', summary: 'Order placement and account controls.' }
      ];

  const faqCategoryMap = new Map<string, number>();
  for (const category of faqCategories) {
    const entry = await upsertBySlug(strapi, 'api::faq-category.faq-category', locale, category);
    faqCategoryMap.set(category.slug, entry.id);
  }

  const officeTypes =
    locale === 'vi'
      ? [
          { title: 'Trụ sở chính', slug: 'head_office', summary: 'Địa điểm văn phòng trụ sở chính.', sortOrder: 1 },
          { title: 'Chi nhánh', slug: 'branch', summary: 'Địa điểm văn phòng chi nhánh.', sortOrder: 2 },
          { title: 'Phòng giao dịch', slug: 'transaction_office', summary: 'Địa điểm phòng giao dịch.', sortOrder: 3 }
        ]
      : [
          { title: 'Head office', slug: 'head_office', summary: 'Main corporate office.', sortOrder: 1 },
          { title: 'Branch', slug: 'branch', summary: 'Branch office location.', sortOrder: 2 },
          { title: 'Transaction office', slug: 'transaction_office', summary: 'Trading and service office.', sortOrder: 3 }
        ];

  const officeTypeMap = new Map<string, number>();
  for (const officeType of officeTypes) {
    const entry = await upsertBySlug(strapi, 'api::office-type.office-type', locale, officeType);
    officeTypeMap.set(officeType.slug, entry.id);
  }

  const bannerPlacements =
    locale === 'vi'
      ? [
          { title: 'Banner chính', slug: 'home_hero', summary: 'Khu vực banner chính ở trang chủ.', sortOrder: 1 },
          { title: 'Banner nội dung', slug: 'section', summary: 'Banner dùng trong các khối nội dung.', sortOrder: 2 },
          { title: 'Banner bên lề', slug: 'sidebar', summary: 'Banner hiển thị ở cột phụ.', sortOrder: 3 }
        ]
      : [
          { title: 'Hero banner', slug: 'home_hero', summary: 'Primary home page banner area.', sortOrder: 1 },
          { title: 'Content banner', slug: 'section', summary: 'Banner used inside content sections.', sortOrder: 2 },
          { title: 'Sidebar banner', slug: 'sidebar', summary: 'Banner used in side rails.', sortOrder: 3 }
        ];

  const bannerPlacementMap = new Map<string, number>();
  for (const placement of bannerPlacements) {
    const entry = await upsertBySlug(strapi, 'api::banner-placement.banner-placement', locale, placement);
    bannerPlacementMap.set(placement.slug, entry.id);
  }

  const relatedContentTypes =
    locale === 'vi'
      ? [
          { title: 'Tin tức', slug: 'news', summary: 'Nội dung tin tức và cập nhật thị trường.', sortOrder: 1 },
          { title: 'Nghiên cứu', slug: 'research', summary: 'Báo cáo và phân tích chuyên sâu.', sortOrder: 2 },
          { title: 'Dịch vụ', slug: 'service', summary: 'Nội dung giới thiệu dịch vụ.', sortOrder: 3 },
          { title: 'Sự kiện', slug: 'event', summary: 'Tin sự kiện và hội thảo.', sortOrder: 4 }
        ]
      : [
          { title: 'News', slug: 'news', summary: 'News and market updates.', sortOrder: 1 },
          { title: 'Research', slug: 'research', summary: 'Reports and in-depth analysis.', sortOrder: 2 },
          { title: 'Service', slug: 'service', summary: 'Service introduction content.', sortOrder: 3 },
          { title: 'Event', slug: 'event', summary: 'Event and webinar updates.', sortOrder: 4 }
        ];

  const relatedContentTypeMap = new Map<string, number>();
  for (const contentType of relatedContentTypes) {
    const entry = await upsertBySlug(strapi, 'api::related-content-type.related-content-type', locale, contentType);
    relatedContentTypeMap.set(contentType.slug, entry.id);
  }
  void relatedContentTypeMap;

  const pageTypes =
    locale === 'vi'
      ? [
          { title: 'Trang tổng quan', slug: 'generic', summary: 'Trang nội dung tổng quan.' },
          { title: 'Giới thiệu', slug: 'about', summary: 'Trang giới thiệu doanh nghiệp.' },
          { title: 'Pháp lý', slug: 'legal', summary: 'Trang nội dung pháp lý.' },
          { title: 'Hỗ trợ', slug: 'support', summary: 'Trang tài liệu và hướng dẫn hỗ trợ khách hàng.' }
        ]
      : [
          { title: 'Generic page', slug: 'generic', summary: 'General content page.' },
          { title: 'About page', slug: 'about', summary: 'Company overview page.' },
          { title: 'Legal page', slug: 'legal', summary: 'Legal and policy page.' },
          { title: 'Support page', slug: 'support', summary: 'Customer support and guidance page.' }
        ];

  const pageTypeMap = new Map<string, number>();
  for (const pageType of pageTypes) {
    const entry = await upsertBySlug(strapi, 'api::page-type.page-type', locale, pageType);
    pageTypeMap.set(pageType.slug, entry.id);
  }
  const pageTypeSlugById = new Map<number, string>();
  for (const [slug, id] of pageTypeMap.entries()) {
    if (typeof id === 'number') {
      pageTypeSlugById.set(id, slug);
    }
  }

  const documentCategories =
    locale === 'vi'
      ? [
          { title: 'Nghiên cứu', slug: 'research', summary: 'Tài liệu và báo cáo nghiên cứu.' },
          { title: 'Pháp lý', slug: 'legal', summary: 'Tài liệu, biểu mẫu và chính sách pháp lý.' },
          { title: 'Biểu mẫu', slug: 'form', summary: 'Biểu mẫu và hướng dẫn thao tác.' },
          { title: 'Tài liệu giới thiệu', slug: 'brochure', summary: 'Tài liệu giới thiệu sản phẩm và dịch vụ.' },
          { title: 'Biểu phí', slug: 'fee_table', summary: 'Bảng biểu phí và mức áp dụng.' }
        ]
      : [
          { title: 'Research', slug: 'research', summary: 'Research materials and reports.' },
          { title: 'Legal', slug: 'legal', summary: 'Forms, policies and legal documents.' },
          { title: 'Forms', slug: 'form', summary: 'Application forms and procedural guides.' },
          { title: 'Brochures', slug: 'brochure', summary: 'Product and service brochures.' },
          { title: 'Fee table', slug: 'fee_table', summary: 'Fee schedules and applied rates.' }
        ];

  const documentCategoryMap = new Map<string, number>();
  for (const documentCategory of documentCategories) {
    const entry = await upsertBySlug(strapi, 'api::document-category.document-category', locale, documentCategory);
    documentCategoryMap.set(documentCategory.slug, entry.id);
  }

  const employmentTypes =
    locale === 'vi'
      ? [
          { title: 'Toàn thời gian', slug: 'full_time', summary: 'Vị trí làm việc toàn thời gian.' },
          { title: 'Bán thời gian', slug: 'part_time', summary: 'Vị trí làm việc bán thời gian.' },
          { title: 'Hợp đồng', slug: 'contract', summary: 'Vị trí theo hợp đồng ngắn hoặc trung hạn.' },
          { title: 'Thực tập', slug: 'internship', summary: 'Vị trí dành cho thực tập sinh.' }
        ]
      : [
          { title: 'Full-time', slug: 'full_time', summary: 'Full-time employment.' },
          { title: 'Part-time', slug: 'part_time', summary: 'Part-time employment.' },
          { title: 'Contract', slug: 'contract', summary: 'Contract-based role.' },
          { title: 'Internship', slug: 'internship', summary: 'Internship position.' }
        ];

  const employmentTypeMap = new Map<string, number>();
  for (const employmentType of employmentTypes) {
    const entry = await upsertBySlug(strapi, 'api::employment-type.employment-type', locale, employmentType);
    employmentTypeMap.set(employmentType.slug, entry.id);
  }

  const researchReportTypes =
    locale === 'vi'
      ? [
          { title: 'Hàng ngày', slug: 'daily', summary: 'Báo cáo hoặc chiến lược hàng ngày.' },
          { title: 'Hàng tuần', slug: 'weekly', summary: 'Báo cáo hoặc chiến lược hàng tuần.' },
          { title: 'Hàng tháng', slug: 'monthly', summary: 'Báo cáo hoặc chiến lược hàng tháng.' },
          { title: 'Chiến lược', slug: 'strategy', summary: 'Góc nhìn chiến lược và phân bổ tài sản.' },
          { title: 'Doanh nghiệp', slug: 'company', summary: 'Báo cáo phân tích doanh nghiệp.' },
          { title: 'Ngành', slug: 'sector', summary: 'Báo cáo phân tích ngành.' },
          { title: 'Bình luận', slug: 'commentary', summary: 'Bình luận thị trường và diễn biến ngắn hạn.' }
        ]
      : [
          { title: 'Daily', slug: 'daily', summary: 'Daily research and strategy note.' },
          { title: 'Weekly', slug: 'weekly', summary: 'Weekly research and strategy note.' },
          { title: 'Monthly', slug: 'monthly', summary: 'Monthly research and strategy note.' },
          { title: 'Strategy', slug: 'strategy', summary: 'Strategy and allocation perspective.' },
          { title: 'Company', slug: 'company', summary: 'Company coverage report.' },
          { title: 'Sector', slug: 'sector', summary: 'Sector coverage report.' },
          { title: 'Commentary', slug: 'commentary', summary: 'Market commentary and short-term view.' }
        ];

  const researchReportTypeMap = new Map<string, number>();
  for (const reportType of researchReportTypes) {
    const entry = await upsertBySlug(strapi, 'api::research-report-type.research-report-type', locale, reportType);
    researchReportTypeMap.set(reportType.slug, entry.id);
  }

  const tags = locale === 'vi'
    ? [
        { name: 'Thị trường', slug: 'thi-truong' },
        { name: 'Chiến lược', slug: 'chien-luoc' },
        { name: 'Doanh nghiệp', slug: 'doanh-nghiep' },
        { name: 'Đầu tư dài hạn', slug: 'dau-tu-dai-han' }
      ]
    : [
        { name: 'Market', slug: 'market' },
        { name: 'Strategy', slug: 'strategy' },
        { name: 'Corporate', slug: 'corporate' },
        { name: 'Long-term investing', slug: 'long-term-investing' }
      ];

  const tagIds: number[] = [];
  for (const tag of tags) {
    const entry = await upsertBySlug(strapi, 'api::tag.tag', locale, tag);
    tagIds.push(entry.id);
  }

  const authors = locale === 'vi'
    ? [
        {
          name: 'Nguyễn Khánh Linh',
          slug: 'nguyen-khanh-linh',
          title: 'Giám đốc Phân tích',
          bio: 'Phụ trách chiến lược đầu tư và định hướng nghiên cứu vĩ mô.'
        },
        {
          name: 'Trần Quốc Bảo',
          slug: 'tran-quoc-bao',
          title: 'Trưởng nhóm Phân tích ngành',
          bio: 'Chuyên sâu nhóm ngành ngân hàng, tiêu dùng và hạ tầng.'
        }
      ]
    : [
        {
          name: 'Linh Nguyen',
          slug: 'linh-nguyen',
          title: 'Director of Research',
          bio: 'Leads top-down strategy and macro research direction.'
        },
        {
          name: 'Bao Tran',
          slug: 'bao-tran',
          title: 'Head of Sector Research',
          bio: 'Covers banking, consumer and infrastructure sectors.'
        }
      ];

  const authorIds: number[] = [];
  for (const author of authors) {
    const entry = await upsertBySlug(strapi, 'api::author.author', locale, author);
    authorIds.push(entry.id);
  }

  const docs = locale === 'vi'
    ? [
        {
          title: 'Biểu phí dịch vụ giao dịch 2026',
          slug: 'bieu-phi-dich-vu-giao-dich-2026',
          summary: 'Bảng phí áp dụng cho dịch vụ giao dịch chứng khoán.',
      documentCategory: documentCategoryMap.get('fee_table')
        },
        {
          title: 'Hướng dẫn mở tài khoản trực tuyến',
          slug: 'huong-dan-mo-tai-khoan-truc-tuyen',
          summary: 'Quy trình eKYC và kích hoạt tài khoản giao dịch.',
      documentCategory: documentCategoryMap.get('form')
        },
        {
          title: 'Bản tin chiến lược mẫu',
          slug: 'ban-tin-chien-luoc-mau',
          summary: 'Mẫu báo cáo tổng quan chiến lược đầu tư.',
      documentCategory: documentCategoryMap.get('research')
        }
      ]
    : [
        {
          title: '2026 Service Fee Schedule',
          slug: '2026-service-fee-schedule',
          summary: 'Applicable brokerage and service fee matrix.',
      documentCategory: documentCategoryMap.get('fee_table')
        },
        {
          title: 'Online Account Opening Guide',
          slug: 'online-account-opening-guide',
          summary: 'Step-by-step eKYC and trading account activation guide.',
      documentCategory: documentCategoryMap.get('form')
        },
        {
          title: 'Sample Strategy Bulletin',
          slug: 'sample-strategy-bulletin',
          summary: 'Template strategy report for investor communication.',
      documentCategory: documentCategoryMap.get('research')
        }
      ];

  const documentIds: number[] = [];
  for (const doc of docs) {
    const entry = await upsertBySlug(strapi, 'api::downloadable-document.downloadable-document', locale, {
      ...doc,
      publishDate: nowIso,
      featured: true
    });
    documentIds.push(entry.id);
  }

  const services =
    locale === 'vi'
      ? [
          {
            title: 'Môi giới chứng khoán',
            slug: 'moi-gioi-chung-khoan',
            summary: 'Giải pháp môi giới cổ phiếu, trái phiếu và chứng chỉ quỹ với tư vấn theo khẩu vị rủi ro.',
            description:
              '<p>Dịch vụ môi giới của FinTrust kết hợp tư vấn đầu tư, quản trị danh mục và hệ thống hỗ trợ quyết định theo dữ liệu thị trường.</p>',
            categorySlug: 'khach-hang-ca-nhan'
          },
          {
            title: 'Giao dịch trực tuyến',
            slug: 'giao-dich-truc-tuyen',
            summary: 'Nền tảng giao dịch web/mobile với cảnh báo thông minh và bảo mật nâng cao.',
            description:
              '<p>Khách hàng có thể giao dịch nhiều sản phẩm, theo dõi tài sản thời gian thực và quản trị hạn mức hiệu quả.</p>',
            categorySlug: 'khach-hang-ca-nhan'
          },
          {
            title: 'Tư vấn đầu tư',
            slug: 'tu-van-dau-tu',
            summary: 'Khuyến nghị đầu tư theo mục tiêu tài chính và chu kỳ thị trường.',
            description:
              '<p>Đội ngũ chuyên gia hỗ trợ xây dựng chiến lược phân bổ tài sản, tái cân bằng danh mục và giám sát hiệu quả đầu tư.</p>',
            categorySlug: 'khach-hang-ca-nhan'
          },
          {
            title: 'Giải pháp tổ chức',
            slug: 'giai-phap-to-chuc',
            summary: 'Dịch vụ giao dịch và tư vấn chuyên biệt cho khách hàng doanh nghiệp và tổ chức.',
            description:
              '<p>Chúng tôi cung cấp dịch vụ execution, tư vấn giao dịch khối lớn và báo cáo phân tích chuyên sâu cho khách hàng tổ chức.</p>',
            categorySlug: 'khach-hang-to-chuc'
          }
        ]
      : [
          {
            title: 'Securities Brokerage',
            slug: 'securities-brokerage',
            summary: 'Brokerage execution for equities, bonds, and funds with risk-profile guidance.',
            description:
              '<p>FinTrust brokerage combines trade execution, portfolio monitoring, and actionable research coverage.</p>',
            categorySlug: 'retail-clients'
          },
          {
            title: 'Online Trading',
            slug: 'online-trading',
            summary: 'Web and mobile trading platform with smart alerts and robust security.',
            description:
              '<p>Trade multiple products with real-time portfolio visibility and integrated risk controls.</p>',
            categorySlug: 'retail-clients'
          },
          {
            title: 'Investment Advisory',
            slug: 'investment-advisory',
            summary: 'Advisory service aligned with financial goals and market cycles.',
            description:
              '<p>Our advisors support allocation planning, portfolio rebalancing, and investment monitoring.</p>',
            categorySlug: 'retail-clients'
          },
          {
            title: 'Institutional Solutions',
            slug: 'institutional-solutions',
            summary: 'Execution and advisory solutions for corporate and institutional clients.',
            description:
              '<p>Services include block-trade support, customized dealing strategy, and dedicated analytical coverage.</p>',
            categorySlug: 'institutional-clients'
          }
        ];

  for (const service of services) {
    const coverImage =
      service.slug === 'moi-gioi-chung-khoan'
        ? media.serviceBrokerage.id
        : service.slug === 'giao-dich-truc-tuyen'
          ? media.tradingBg.id
          : service.slug === 'tu-van-dau-tu'
            ? media.serviceIB.id
            : media.serviceIB.id;

    const advisors =
      service.slug === 'tu-van-dau-tu' || service.slug === 'investment-advisory'
        ? [
            {
              name: locale === 'vi' ? 'Nguyễn Quang Trường' : 'Nguyen Quang Truong',
              quote:
                locale === 'vi'
                  ? 'Tuân thủ 1 chiến lược đầu tư quan trọng hơn việc chiến lược đó là gì.'
                  : 'The discipline of a strategy matters more than the strategy itself.',
              cert: '003559/MGCK',
              experience: '2007-2021',
              phone: '1900 6868',
              badge: locale === 'vi' ? 'Tư vấn viên tiêu biểu của tháng' : 'Featured advisor of the month',
              ctaLabel: locale === 'vi' ? 'Nhận tư vấn' : 'Request advice',
              ctaHref: `/${locale}/contact`,
              avatar: media.advisorTruong.id
            },
            {
              name: locale === 'vi' ? 'Nguyễn Thị Thành Uyên' : 'Nguyen Thi Thanh Uyen',
              quote:
                locale === 'vi'
                  ? 'Chiến lược đầu tư tập trung'
                  : 'Focused investing strategy',
              cert: '003559/MGCK',
              experience: '2007-2021',
              phone: '1900 6868',
              badge: locale === 'vi' ? 'Tư vấn viên tiêu biểu của tháng' : 'Featured advisor of the month',
              ctaLabel: locale === 'vi' ? 'Nhận tư vấn' : 'Request advice',
              ctaHref: `/${locale}/contact`,
              avatar: media.advisorUyen.id
            }
          ]
        : undefined;

    await upsertBySlug(strapi, 'api::service.service', locale, {
      title: service.title,
      slug: service.slug,
      summary: service.summary,
      description: service.description,
      coverImage,
      ...(advisors
        ? {
            advisorSectionTitle:
              locale === 'vi'
                ? 'Danh sách chuyên viên tư vấn'
                : 'Advisor directory',
            advisorSectionDescription:
              locale === 'vi'
                ? 'Chọn tư vấn viên và để lại thông tin để đội ngũ liên hệ sớm.'
                : 'Pick an advisor and leave your details so we can follow up quickly.',
            advisorSectionBackgroundImage: media.advisorSectionBg.id,
            advisors
          }
        : {}),
      publishDate: nowIso,
      featured: true,
      category: serviceCategoryMap.get(service.categorySlug),
      tags: tagIds.slice(0, 2),
      documents: documentIds,
      seo: {
        metaTitle: buildSeoTitle(service.title, t.siteName),
        metaDescription: buildSeoDescription(service.summary, locale),
        metaRobots: 'index,follow'
      }
    });
  }

  const newsItems = locale === 'vi'
    ? [
        ['thi-truong-giao-dich-quy-2-2026', 'Thị trường quý 2/2026: Thanh khoản cải thiện tại nhóm vốn hóa lớn'],
        ['cap-nhat-he-thong-giao-dich-thang-4', 'Nâng cấp hệ thống giao dịch trực tuyến tháng 4/2026'],
        ['chien-luoc-phan-bo-ngan-han', 'Chiến lược phân bổ ngắn hạn trong giai đoạn biến động'],
        ['bao-cao-nganh-ngan-hang-2026', 'Triển vọng ngành ngân hàng 2026: Tăng trưởng chọn lọc'],
        ['fintrust-khai-truong-chi-nhanh-da-nang', 'FinTrust khai trương chi nhánh Đà Nẵng'],
        ['nhan-dinh-vi-mo-thang-4', 'Nhận định vĩ mô tháng 4: Lạm phát và tỷ giá']
      ]
    : [
        ['q2-2026-market-liquidity-update', 'Q2 2026 Market Pulse: Liquidity improves in large-cap names'],
        ['april-platform-upgrade', 'April 2026 online trading platform upgrade notice'],
        ['short-term-allocation-playbook', 'Short-term allocation playbook under volatile conditions'],
        ['banking-sector-outlook-2026', '2026 banking sector outlook: selective growth setup'],
        ['fintrust-opens-da-nang-branch', 'FinTrust opens Da Nang branch office'],
        ['april-macro-briefing', 'April macro briefing: inflation and FX dynamics']
      ];

  for (let i = 0; i < newsItems.length; i += 1) {
    const [slug, title] = newsItems[i];
    const coverImage = [media.heroMain.id, media.heroAlt1.id, media.tradingBg.id, media.serviceResearchBg.id, media.heroAlt2.id, media.oneShinhanBg.id][i % 6];
    await upsertBySlug(strapi, 'api::news-article.news-article', locale, {
      title,
      slug,
      summary:
        locale === 'vi'
          ? 'Bản tin cập nhật diễn biến thị trường, chính sách và hoạt động doanh nghiệp liên quan đến nhà đầu tư.'
          : 'News update covering market movements, policy context, and investor-relevant corporate developments.',
      content:
        locale === 'vi'
          ? '<p>Nội dung bài viết mẫu nhằm minh họa cách vận hành chuyên mục tin tức, bao gồm góc nhìn thị trường, dữ liệu tham khảo và lưu ý rủi ro.</p>'
          : '<p>Sample article content demonstrating market commentary structure, reference data highlights, and risk notes.</p>',
      coverImage,
      publishDate: new Date(Date.now() - i * 86400000).toISOString(),
      featured: i < 2,
      status: 'published',
      category: i % 2 === 0 ? newsCategoryMap.values().next().value : Array.from(newsCategoryMap.values())[1],
      author: authorIds[i % authorIds.length],
      tags: tagIds,
      documents: documentIds.slice(0, 1),
      seo: {
        metaTitle: buildSeoTitle(title, t.siteName),
        metaDescription:
          buildSeoDescription(
            locale === 'vi'
              ? 'Tin tức cập nhật từ FinTrust Securities.'
              : 'Latest update from FinTrust Securities.',
            locale,
            locale === 'vi'
              ? 'Bản tin tập trung vào diễn biến thị trường, bối cảnh chính sách và thông tin quan trọng cho nhà đầu tư.'
              : 'News coverage focuses on market movements, policy context, and investor-relevant corporate updates.'
          ),
        metaRobots: 'index,follow'
      }
    });
  }

  const eventItems = locale === 'vi'
    ? [
        ['hoi-thao-chien-luoc-dau-tu-2026', 'Hội thảo Chiến lược đầu tư 2026', 'upcoming'],
        ['workshop-giao-dich-an-toan', 'Workshop Giao dịch an toàn trên nền tảng số', 'upcoming'],
        ['toa-dam-trien-vong-nganh-ngan-hang', 'Tọa đàm Triển vọng ngành ngân hàng', 'ongoing']
      ]
    : [
        ['investment-strategy-forum-2026', '2026 Investment Strategy Forum', 'upcoming'],
        ['digital-trading-safety-workshop', 'Digital Trading Safety Workshop', 'upcoming'],
        ['banking-sector-outlook-dialogue', 'Banking Sector Outlook Dialogue', 'ongoing']
      ];

  for (let i = 0; i < eventItems.length; i += 1) {
    const [slug, title, status] = eventItems[i];
    const coverImage = [media.serviceResearchBg.id, media.heroMain.id, media.heroAlt1.id][i % 3];
    await upsertBySlug(strapi, 'api::event.event', locale, {
      title,
      slug,
      summary:
        locale === 'vi'
          ? 'Sự kiện kết nối chuyên gia và nhà đầu tư với nội dung phân tích thực tiễn.'
          : 'Investor-focused event featuring practical market and strategy insights.',
      content:
        locale === 'vi'
          ? '<p>Nội dung sự kiện mẫu gồm chủ đề, diễn giả và cách đăng ký tham dự.</p>'
          : '<p>Sample event content includes agenda highlights, speakers, and registration notes.</p>',
      coverImage,
      publishDate: nowIso,
      startDate: new Date(Date.now() + (i + 2) * 86400000).toISOString(),
      endDate: new Date(Date.now() + (i + 2) * 86400000 + 7200000).toISOString(),
      location: locale === 'vi' ? 'TP. Hồ Chí Minh' : 'Ho Chi Minh City',
      isOnline: i === 1,
      registrationUrl: 'https://example.com/register',
      featured: i === 0,
      status,
      category: i % 2 === 0 ? eventCategoryMap.values().next().value : Array.from(eventCategoryMap.values())[1],
      tags: tagIds.slice(0, 2),
      seo: {
        metaTitle: buildSeoTitle(title, t.siteName),
        metaDescription:
          buildSeoDescription(
            locale === 'vi'
              ? 'Lịch sự kiện và hoạt động kết nối đầu tư từ FinTrust.'
              : 'Event schedule and investor engagement updates from FinTrust.',
            locale,
            locale === 'vi'
              ? 'Thông tin bao gồm thời gian, chủ đề, hình thức tổ chức và hướng dẫn đăng ký tham dự.'
              : 'Details include timing, topic highlights, event format, and registration guidance for participants.'
          ),
        metaRobots: 'index,follow'
      }
    });
  }

  const researchItems = locale === 'vi'
    ? [
        ['chien-luoc-ngay-11-04-2026', 'Chiến lược ngày 11/04/2026', 'daily'],
        ['chien-luoc-tuan-15-2026', 'Chiến lược tuần 15/2026', 'weekly'],
        ['chien-luoc-thang-04-2026', 'Chiến lược tháng 04/2026', 'monthly'],
        ['bao-cao-co-phieu-ngan-hang-a', 'Phân tích doanh nghiệp: Ngân hàng A', 'company'],
        ['bao-cao-nganh-ban-le', 'Phân tích ngành bán lẻ', 'sector'],
        ['goc-nhin-thi-truong-dau-phien', 'Bình luận thị trường đầu phiên', 'commentary']
      ]
    : [
        ['daily-strategy-2026-04-11', 'Daily Strategy - April 11, 2026', 'daily'],
        ['week-15-strategy-2026', 'Week 15 Strategy Note', 'weekly'],
        ['april-2026-monthly-strategy', 'April 2026 Monthly Strategy', 'monthly'],
        ['company-note-bank-a', 'Company Coverage: Bank A', 'company'],
        ['sector-note-retail', 'Sector Coverage: Retail', 'sector'],
        ['opening-bell-market-commentary', 'Opening Bell Market Commentary', 'commentary']
      ];

  for (let i = 0; i < researchItems.length; i += 1) {
    const [slug, title, reportType] = researchItems[i] as [string, string, string];
    const coverImage = [media.serviceResearchBg.id, media.heroMain.id, media.tradingBg.id, media.serviceIB.id, media.heroAlt1.id, media.oneShinhanBg.id][i % 6];
    await upsertBySlug(strapi, 'api::research-report.research-report', locale, {
      title,
      slug,
      summary:
        locale === 'vi'
          ? 'Báo cáo mẫu cung cấp góc nhìn chiến lược, dữ liệu định lượng và khuyến nghị theo kịch bản.'
          : 'Sample report with strategy perspective, quantitative datapoints, and scenario-based recommendations.',
      content:
        locale === 'vi'
          ? '<p>Nội dung báo cáo mẫu cho trung tâm nghiên cứu, có thể mở rộng thêm bảng biểu, biểu đồ và tệp đính kèm.</p>'
          : '<p>Sample research content for the research center, extendable with data tables, charts, and attachments.</p>',
      coverImage,
      publishDate: new Date(Date.now() - i * 43200000).toISOString(),
      featured: i < 2,
      reportType: researchReportTypeMap.get(reportType),
      category: i % 3 === 0
        ? researchCategoryMap.values().next().value
        : Array.from(researchCategoryMap.values())[i % 3],
      author: authorIds[i % authorIds.length],
      tags: tagIds,
      documents: documentIds,
      seo: {
        metaTitle: buildSeoTitle(title, t.siteName),
        metaDescription:
          buildSeoDescription(
            locale === 'vi'
              ? 'Báo cáo phân tích từ trung tâm nghiên cứu FinTrust.'
              : 'Research publication from FinTrust Research Center.',
            locale,
            locale === 'vi'
              ? 'Nội dung trình bày kịch bản chiến lược, dữ liệu định lượng và khuyến nghị theo từng điều kiện thị trường.'
              : 'Coverage includes strategy scenarios, quantitative datapoints, and recommendations across market conditions.'
          ),
        metaRobots: 'index,follow'
      }
    });
  }

  const faqItems =
    locale === 'vi'
      ? [
          ['mo-tai-khoan-can-gi', 'Mở tài khoản cần chuẩn bị giấy tờ gì?', 'Tài khoản có thể mở trực tuyến bằng eKYC với CCCD/CMND còn hiệu lực.', 'mo-tai-khoan'],
          ['mat-khau-giao-dich', 'Làm thế nào để cấp lại mật khẩu giao dịch?', 'Khách hàng có thể đặt lại mật khẩu qua ứng dụng hoặc tổng đài hỗ trợ.', 'giao-dich'],
          ['phi-giao-dich-co-thay-doi', 'Biểu phí giao dịch có thay đổi theo phân khúc không?', 'Biểu phí có thể thay đổi theo giá trị giao dịch và chính sách từng thời kỳ.', 'giao-dich'],
          ['co-ho-tro-margin-khong', 'FinTrust có hỗ trợ giao dịch ký quỹ không?', 'Có. Danh mục cổ phiếu ký quỹ và tỷ lệ cấp hạn mức được cập nhật định kỳ.', 'giao-dich'],
          ['doi-thong-tin-ca-nhan', 'Cách cập nhật thông tin cá nhân?', 'Khách hàng có thể cập nhật trực tuyến hoặc tại quầy giao dịch gần nhất.', 'mo-tai-khoan'],
          ['thoi-gian-ho-tro', 'Khung giờ tổng đài hỗ trợ?', 'Tổng đài hoạt động 8:00 - 17:30 từ thứ Hai đến thứ Sáu.', 'mo-tai-khoan']
        ]
      : [
          ['required-documents-account-opening', 'What documents are required for account opening?', 'Accounts can be opened online via eKYC with valid ID documents.', 'account-opening'],
          ['reset-trading-password', 'How do I reset my trading password?', 'Password reset is available via mobile app or customer hotline.', 'trading'],
          ['service-fee-policy', 'Do service fees vary by client segment?', 'Fee policy may vary based on transaction value and service package.', 'trading'],
          ['margin-support', 'Does FinTrust provide margin support?', 'Yes. Margin-eligible list and limits are updated periodically.', 'trading'],
          ['update-personal-information', 'How can I update personal information?', 'You can update online or at the nearest branch office.', 'account-opening'],
          ['hotline-hours', 'What are customer hotline operating hours?', 'Hotline runs from 8:00 to 17:30, Monday to Friday.', 'account-opening']
        ];

  for (let i = 0; i < faqItems.length; i += 1) {
    const [slug, question, answerText, categorySlug] = faqItems[i];
    await upsertBySlug(strapi, 'api::faq-item.faq-item', locale, {
      slug,
      question,
      answer: `<p>${answerText}</p>`,
      sortOrder: i,
      featured: i < 3,
      category: faqCategoryMap.get(categorySlug),
      seo: {
        metaTitle: buildSeoTitle(question, t.siteName),
        metaDescription: buildSeoDescription(answerText, locale),
        metaRobots: 'index,follow'
      }
    });
  }

  const jobs =
    locale === 'vi'
      ? [
          ['chuyen-vien-tu-van-dau-tu', 'Chuyên viên Tư vấn đầu tư'],
          ['chuyen-vien-phan-tich-nganh', 'Chuyên viên Phân tích ngành'],
          ['chuyen-vien-van-hanh-he-thong', 'Chuyên viên Vận hành hệ thống giao dịch']
        ]
      : [
          ['investment-advisory-specialist', 'Investment Advisory Specialist'],
          ['sector-research-analyst', 'Sector Research Analyst'],
          ['trading-platform-operations-specialist', 'Trading Platform Operations Specialist']
        ];

  for (let i = 0; i < jobs.length; i += 1) {
    const [slug, title] = jobs[i];
    await upsertBySlug(strapi, 'api::career-job.career-job', locale, {
      slug,
      title,
      summary:
        locale === 'vi'
          ? 'Vị trí tuyển dụng toàn thời gian trong môi trường tài chính chuyên nghiệp.'
          : 'Full-time position in a high-standard financial services environment.',
      description:
        locale === 'vi'
          ? '<p>Mô tả công việc mẫu bao gồm trách nhiệm chính, yêu cầu năng lực và quyền lợi.</p>'
          : '<p>Sample job description with responsibilities, qualifications, and compensation framework.</p>',
      department: locale === 'vi' ? 'Khối Khách hàng' : 'Client Division',
      location: locale === 'vi' ? 'TP. Hồ Chí Minh' : 'Ho Chi Minh City',
      employmentType: employmentTypeMap.get('full_time'),
      salaryRange: locale === 'vi' ? 'Thỏa thuận theo năng lực' : 'Competitive package',
      publishDate: nowIso,
      applicationDeadline: new Date(Date.now() + 20 * 86400000).toISOString().split('T')[0],
      featured: i === 0,
      status: 'open',
      applyUrl: 'mailto:careers@fintrust.vn',
      seo: {
        metaTitle: buildSeoTitle(title, t.siteName),
        metaDescription:
          buildSeoDescription(
            locale === 'vi' ? 'Thông tin tuyển dụng tại FinTrust Securities.' : 'Career opportunity at FinTrust Securities.',
            locale,
            locale === 'vi'
              ? 'Vị trí tuyển dụng mô tả rõ trách nhiệm, yêu cầu năng lực, quyền lợi và quy trình ứng tuyển.'
              : 'Each role outlines responsibilities, qualifications, benefits, and the application process.'
          ),
        metaRobots: 'index,follow'
      }
    });
  }

  const offices =
    locale === 'vi'
      ? [
          ['tru-so-ho-chi-minh', 'Trụ sở Hồ Chí Minh', 'TP. Hồ Chí Minh', 'Tầng 15, 99 Nguyễn Du, Quận 1'],
          ['chi-nhanh-ha-noi', 'Chi nhánh Hà Nội', 'Hà Nội', 'Tầng 8, 21 Lý Thường Kiệt, Hoàn Kiếm'],
          ['chi-nhanh-da-nang', 'Chi nhánh Đà Nẵng', 'Đà Nẵng', 'Tầng 6, 120 Bạch Đằng, Hải Châu']
        ]
      : [
          ['ho-chi-minh-head-office', 'Ho Chi Minh Head Office', 'Ho Chi Minh City', '15F, 99 Nguyen Du Street, District 1'],
          ['hanoi-branch', 'Hanoi Branch', 'Hanoi', '8F, 21 Ly Thuong Kiet Street, Hoan Kiem District'],
          ['da-nang-branch', 'Da Nang Branch', 'Da Nang', '6F, 120 Bach Dang Street, Hai Chau District']
        ];

  for (let i = 0; i < offices.length; i += 1) {
    const [slug, name, city, address] = offices[i];
    await upsertBySlug(strapi, 'api::office-location.office-location', locale, {
      slug,
      name,
      city,
      address,
      phone: '1900 6868',
      email: 'support@fintrust.vn',
      officeType: officeTypeMap.get(i === 0 ? 'head_office' : 'branch')!,
      workingHours: locale === 'vi' ? '08:00 - 17:30 (Thứ 2 - Thứ 6)' : '08:00 - 17:30 (Mon - Fri)',
      mapUrl: 'https://maps.google.com',
      sortOrder: i,
      featured: i === 0
    });
  }

  const announcements =
    locale === 'vi'
      ? [
          ['thong-bao-lich-nghi-le-30-4', 'Thông báo lịch nghỉ lễ 30/4 - 1/5'],
          ['thong-bao-cap-nhat-he-thong-cuoi-tuan', 'Thông báo bảo trì hệ thống cuối tuần']
        ]
      : [
          ['holiday-notice-april-30-may-1', 'Holiday notice for April 30 - May 1'],
          ['weekend-maintenance-notice', 'Weekend system maintenance notice']
        ];

  for (let i = 0; i < announcements.length; i += 1) {
    const [slug, title] = announcements[i];
    await upsertBySlug(strapi, 'api::announcement.announcement', locale, {
      slug,
      title,
      summary:
        locale === 'vi'
          ? 'Thông báo vận hành dành cho khách hàng và đối tác.'
          : 'Operational notice for clients and partners.',
      content:
        locale === 'vi'
          ? '<p>Nội dung thông báo mẫu về lịch giao dịch, thời gian hỗ trợ và cập nhật hệ thống.</p>'
          : '<p>Sample announcement on trading calendar, support timing, and platform updates.</p>',
      publishDate: nowIso,
      priority: i === 0 ? 'high' : 'medium',
      featured: i === 0,
      seo: {
        metaTitle: buildSeoTitle(title, t.siteName),
        metaDescription:
          buildSeoDescription(
            locale === 'vi' ? 'Thông báo chính thức từ FinTrust Securities.' : 'Official announcement from FinTrust Securities.',
            locale,
            locale === 'vi'
              ? 'Nội dung cung cấp cập nhật vận hành, lịch giao dịch và lưu ý quan trọng dành cho khách hàng.'
              : 'Updates include operational notices, trading calendar changes, and important client instructions.'
          ),
        metaRobots: 'index,follow'
      }
    });
  }

  const pages =
    locale === 'vi'
      ? [
          {
            slug: 'about',
            title: 'Chứng Khoán Shinhan Việt Nam',
            summary: 'Tổng quan doanh nghiệp, lĩnh vực kinh doanh, lịch sử hình thành, leadership, Shinhan Way và One Shinhan.',
            pageType: pageTypeMap.get('about'),
            coverImage: media.heroAlt2.id,
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Về chúng tôi',
                title: 'Đối tác tin tưởng cùng đồng hành với bạn trên thị trường chứng khoán',
                subtitle:
                  'Shinhan Investment đã mua lại cổ phần Chứng khoán Nam An vào tháng 7/2015 và thành lập Công ty TNHH Chứng khoán Shinhan Việt Nam vào tháng 2/2016.',
                backgroundImage: media.heroAlt2.id
              },
              {
                __component: 'sections.rich-text-block',
                title: 'Chúng tôi là ai',
                content:
                  '<p>Shinhan Investment là công ty con có 100% vốn của Tập đoàn Tài chính Shinhan, vào tháng 7 năm 2015 đã mua lại cổ phần của Chứng khoán Nam An tại Việt Nam và thành lập nên Công ty TNHH Chứng khoán Shinhan Việt Nam (“Chứng khoán Shinhan”) vào tháng 2 năm 2016.</p><p>Thông qua mạng lưới rộng khắp toàn cầu của Tập đoàn tài chính Shinhan và tại Việt Nam, Chứng Khoán Shinhan ưu tiên đặt mục tiêu hàng đầu với vai trò là "Người dẫn đường" cho sự đầu tư thành công để tạo ra giá trị mà khách hàng mong muốn và thiết kế một tương lai tốt đẹp hơn.</p>'
              },
              {
                __component: 'sections.feature-card-section',
                title: 'Lĩnh vực kinh doanh',
                description: 'Hai trụ cột kinh doanh trọng tâm được triển khai theo mô hình dịch vụ tài chính tích hợp.',
                items: [
                  {
                    title: 'Môi giới chứng khoán',
                    description:
                      'Đối tác quản lý tài sản theo đuổi sự tăng trưởng đồng hành cùng khách hàng. Tư vấn đầu tư bởi các chuyên gia tài chính và dịch vụ giao dịch thông qua Nền tảng Kỹ thuật số Sáng tạo.',
                    link: { label: 'Xem dịch vụ', href: '/vi/services' }
                  },
                  {
                    title: 'Ngân hàng đầu tư',
                    description:
                      'Cung cấp giải pháp tài chính tối ưu cho khách hàng doanh nghiệp. Tận dụng mạng lưới toàn cầu của Tập đoàn Tài chính Shinhan để cung cấp các dịch vụ tư vấn tài chính đa dạng ở thị trường nợ và thị trường vốn nhằm đáp ứng nhu cầu cho khách hàng.',
                    link: { label: 'Liên hệ tư vấn', href: '/vi/contact' }
                  }
                ]
              },
              {
                __component: 'sections.timeline-section',
                title: 'Lịch sử hình thành',
                items: [
                  { year: '2015', title: 'Mua lại Chứng khoán Nam An', description: 'Shinhan Investment hoàn tất mua lại 100% cổ phần Công ty CP Chứng khoán Nam An.' },
                  { year: '2016 / Tháng 2 /', title: 'Thành lập Chứng khoán Shinhan Việt Nam', description: 'Chính thức đổi tên thành lập Công ty TNHH Chứng Khoán Shinhan Việt Nam.' },
                  { year: '2016 / Tháng 2 /', title: 'Thành viên lưu ký', description: 'Chính thức trở thành thành viên lưu ký của trung tâm lưu ký Việt nam.' },
                  { year: '2016 / Tháng 5 /', title: 'Thành viên HNX', description: 'Chính thức trở thành thành viên Sở Giao Dịch Chứng Khoán Hà Nội.' },
                  { year: '2017 / Tháng 12 /', title: 'Tăng vốn điều lệ', description: 'Công ty tăng vốn điều lện lên 812.600.000.000 VND.' },
                  { year: '2018', title: 'Phát triển Ngân hàng đầu tư', description: 'Xây dựng và phát triển nghiệp vụ Ngân hàng đầu tư.' },
                  { year: '2020', title: 'Mở rộng mảng bán lẻ', description: 'Mở rộng phát triển nghiệp vụ kinh doanh bán lẻ môi giới chứng khoán.' },
                  { year: '2021 / Tháng 11 /', title: 'Ra mắt hệ thống giao dịch mới', description: 'Bắt đầu phát triển kinh doanh bán lẻ và ra mắt hệ thống giao dịch mới.' },
                  { year: '2021 / Tháng 12 /', title: 'Tăng vốn điều lệ', description: 'Tăng vốn điều lệ lên 2.000 tỷ đồng.' },
                  { year: '2022 / Tháng 07 /', title: 'Khai trương chi nhánh Hà nội', description: 'Khai trương chi nhánh Hà nội.' },
                  { year: '2023 / Tháng 03 /', title: 'Ra mắt ứng dụng Sàn Xịn Ha', description: 'Ra mắt ứng dụng Sàn Xịn Ha.' }
                ]
              },
              {
                __component: 'sections.quote-section',
                quote:
                  'Công Ty Chứng khoán Shinhan Việt Nam đang ngày càng phát triển trên thị trường vốn Việt Nam bằng cách kết hợp cơ cấu tài chính và quản trị doanh nghiệp vững chắc và ổn định với các kỹ thuật quản lý tiên tiến.',
                author: 'Han Bokhee',
                role: 'Tổng Giám Đốc - Chứng khoán Shinhan Việt Nam'
              },
              {
                __component: 'sections.rich-text-block',
                title: locale === 'vi' ? 'Ban lãnh đạo' : 'Leadership',
                content:
                  '<p>Thông qua mạng lưới “One Shinhan” của Tập đoàn Tài chính Shinhan, bao gồm ngân hàng, Công ty thẻ và Công ty tài chính, chúng tôi cung cấp nhiều dịch vụ đa dạng khác nhau vượt qua các rào cản giữa các lĩnh vực tài chính.</p><p>Ngoài ra, chúng tôi hứa hẹn phát triển công ty thành công ty chứng khoán hàng đầu Việt Nam với mục đích cung cấp các giải pháp tài chính tối ưu cho khách hàng thông qua các bí quyết tài chính tiên tiến trong lĩnh vực quản lý tài sản cá nhân và tài chính doanh nghiệp.</p>'
              },
              {
                __component: 'sections.rich-text-block',
                title: 'Shinhan Way',
                content:
                  '<p>Tuyên bố sứ mệnh, giá trị cốt lõi và tầm nhìn thể hiện Đường hướng của Shinhan đại diện cho một hệ thống giá trị mà qua đó tất cả các thành viên của tập đoàn tài chính Shinhan đo lường suy nghĩ và hành động của họ.</p><p><strong>Tuyên bố sứ mệnh:</strong> Một thế giới tốt hơn thông qua Tài chính Shinhan.</p><p><strong>Giá trị cốt lõi:</strong> Khách hàng, Tôn trọng lẫn nhau, Thay đổi, Xuất sắc, Quyền sở hữu.</p><p><strong>Tầm nhìn:</strong> Tập đoàn tài chính đẳng cấp thế giới.</p>'
              },
              {
                __component: 'sections.feature-card-section',
                title: 'One Shinhan',
                description: 'Shinhan Vietnam hướng tới xây dựng “Tập đoàn Tài chính Shinhan thứ 2” dựa trên mạng lưới One Shinhan vững mạnh.',
                items: [
                  {
                    title: 'Ngân hàng',
                    description: 'Dịch vụ ngân hàng và hệ sinh thái thanh toán hỗ trợ khách hàng cá nhân, doanh nghiệp.',
                    link: { label: 'Xem thêm', href: 'https://shinhan.com.vn' }
                  },
                  {
                    title: 'Giải pháp công nghệ',
                    description: 'Nền tảng công nghệ phục vụ vận hành tài chính và trải nghiệm người dùng nhất quán.',
                    link: { label: 'Xem thêm', href: 'https://shinhands.com.vn' }
                  },
                  {
                    title: 'Chứng khoán',
                    description: 'Môi giới, tư vấn đầu tư và dịch vụ ngân hàng đầu tư trong cùng hệ thống One Shinhan.',
                    link: { label: 'Xem thêm', href: '/vi/about' }
                  },
                  {
                    title: 'Bảo hiểm',
                    description: 'Giải pháp bảo hiểm mở rộng trong hệ sinh thái tài chính Shinhan tại Việt Nam.',
                    link: { label: 'Xem thêm', href: 'https://shinhanlifevn.com.vn' }
                  },
                  {
                    title: 'Tài chính',
                    description: 'Dịch vụ tài chính tiêu dùng và các giải pháp vốn phục vụ nhu cầu đa dạng của khách hàng.',
                    link: { label: 'Xem thêm', href: 'https://www.shinhanfinance.com.vn' }
                  }
                ]
              },
              {
                __component: 'sections.rich-text-block',
                title: 'Thông điệp One Shinhan',
                content:
                  '<p>Bằng góc độ của khách hàng, chúng tôi luôn cố gắng hết sức để đáp ứng những trải nghiệm và nhu cầu đa dạng với các sản phẩm và dịch vụ tốt nhất tập hợp bởi Tập đoàn Shinhan.</p>'
              },
              {
                __component: 'sections.cta-section',
                title: 'Liên hệ và tìm hiểu thêm',
                description: 'Khám phá thêm về công ty, cơ hội nghề nghiệp và hệ sinh thái One Shinhan tại Việt Nam.',
                primaryButton: { label: 'Liên hệ', href: '/vi/contact', variant: 'primary' },
                secondaryButton: { label: 'Cơ hội nghề nghiệp', href: '/vi/careers', variant: 'secondary' }
              }
            ]
          },
          {
            slug: 'support',
            title: 'Hỗ trợ khách hàng',
            summary: 'Hướng dẫn mở tài khoản, giao dịch và quy trình dịch vụ.',
            pageType: pageTypeMap.get('support'),
            coverImage: media.openAccountBg.id,
            sections: [
              {
                __component: 'sections.feature-card-section',
                title: 'Trung tâm hỗ trợ',
                items: [
                  { title: 'Mở tài khoản', description: 'Quy trình eKYC, xác thực và kích hoạt tài khoản.' },
                  { title: 'Hướng dẫn giao dịch', description: 'Các bước đặt lệnh, chỉnh sửa và hủy lệnh.' },
                  { title: 'Biểu phí', description: 'Bảng phí và điều kiện áp dụng theo nhóm dịch vụ.' }
                ]
              },
              {
                __component: 'sections.table-block',
                title: 'Khung giờ hỗ trợ',
                column1Label: 'Kênh',
                column2Label: 'Thời gian',
                rows: [
                  { col1: 'Hotline', col2: '08:00 - 17:30 (Thứ 2 - Thứ 6)' },
                  { col1: 'Email', col2: 'Phản hồi trong 4 giờ làm việc' }
                ]
              },
              {
                __component: 'sections.faq-section',
                title: 'Câu hỏi thường gặp',
                limit: 6
              }
            ]
          },
          {
            slug: 'mo-tai-khoan-truc-tuyen',
            title: 'Hướng dẫn mở tài khoản trực tuyến',
            summary: 'Quy trình mở tài khoản eKYC, danh sách chuẩn bị và hướng dẫn liên hệ khi cần hỗ trợ.',
            pageType: pageTypeMap.get('support'),
            coverImage: media.openAccountBg.id,
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Hỗ trợ',
                title: 'Mở tài khoản trực tuyến trong vài bước',
                subtitle: 'Khách hàng cá nhân có thể hoàn tất eKYC ngay trên thiết bị di động hoặc máy tính có camera.',
                backgroundImage: media.openAccountBg.id
              },
              {
                __component: 'sections.feature-card-section',
                title: 'Bạn cần chuẩn bị',
                description: 'Các giấy tờ và thiết bị cần có trước khi bắt đầu.',
                items: [
                  { title: 'CCCD gắn chip', description: 'Giấy tờ tùy thân còn hiệu lực để xác thực thông tin.' },
                  { title: 'Thiết bị có camera', description: 'Điện thoại hoặc máy tính để chụp ảnh và nhận diện khuôn mặt.' },
                  { title: 'Ứng dụng San Xin Ha', description: 'Tải ứng dụng để hoàn tất quy trình mở tài khoản.' }
                ]
              },
              {
                __component: 'sections.rich-text-block',
                title: 'Quy trình cơ bản',
                content:
                  '<p>1. Tải ứng dụng San Xin Ha.</p><p>2. Chọn mở tài khoản và nhập thông tin cá nhân.</p><p>3. Hoàn tất định danh, xác nhận hợp đồng và chờ kích hoạt.</p>'
              },
              {
                __component: 'sections.faq-section',
                title: 'Câu hỏi thường gặp',
                limit: 4
              }
            ]
          },
          {
            slug: 'huong-dan-giao-dich',
            title: 'Hướng dẫn giao dịch',
            summary: 'Các bước đăng nhập, nộp/rút tiền và quản lý tài khoản giao dịch.',
            pageType: pageTypeMap.get('support'),
            coverImage: media.tradingBg.id,
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Hỗ trợ',
                title: 'Các thao tác giao dịch phổ biến',
                subtitle: 'Nội dung được nhóm theo luồng thực tế: đăng nhập, funding và quản lý tài khoản.',
                backgroundImage: media.tradingBg.id
              },
              {
                __component: 'sections.feature-card-section',
                title: 'Trọng tâm nội dung',
                description: 'Những thao tác người dùng cần biết trước khi giao dịch.',
                items: [
                  { title: 'Đăng nhập và bảo mật', description: 'Cách dùng mật khẩu giao dịch, OTP và iOTP an toàn.' },
                  { title: 'Nộp và rút tiền', description: 'Lưu ý về tiểu khoản, nội dung chuyển tiền và thời gian xử lý.' },
                  { title: 'Quản lý tài khoản', description: 'Cập nhật thông tin cá nhân, tài khoản ngân hàng và danh mục quan tâm.' }
                ]
              }
            ]
          },
          {
            slug: 'quy-dinh-giao-dich',
            title: 'Quy định giao dịch',
            summary: 'Tổng hợp khung giờ, đơn vị giao dịch, bước giá, lô lẻ và nguyên tắc thanh toán.',
            pageType: pageTypeMap.get('support'),
            coverImage: media.tradingBg.id,
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Hỗ trợ',
                title: 'Các quy tắc cốt lõi trước khi đặt lệnh',
                subtitle: 'Khung giờ, bước giá, lô giao dịch và thanh toán được hệ thống hóa để dễ tra cứu.',
                backgroundImage: media.tradingBg.id
              },
              {
                __component: 'sections.table-block',
                title: 'Thông tin nhanh',
                column1Label: 'Chủ đề',
                column2Label: 'Tóm tắt',
                rows: [
                  { col1: 'Giờ giao dịch', col2: 'Làm việc từ Thứ Hai đến Thứ Sáu, trừ ngày lễ' },
                  { col1: 'Đơn vị giao dịch', col2: 'Giao dịch lô chẵn và lô lẻ tùy sàn' },
                  { col1: 'Thanh toán', col2: 'Áp dụng theo chu kỳ và sản phẩm cụ thể' }
                ]
              },
              {
                __component: 'sections.faq-section',
                title: 'Câu hỏi thường gặp',
                limit: 4
              }
            ]
          },
          {
            slug: 'cau-hoi-thuong-gap',
            title: 'Câu hỏi thường gặp',
            summary: 'Những câu hỏi phổ biến về mở tài khoản, giao dịch, ký quỹ và chuyển tiền.',
            pageType: pageTypeMap.get('support'),
            coverImage: media.openAccountBg.id,
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Hỗ trợ',
                title: 'Tìm nhanh câu trả lời cho những thắc mắc phổ biến',
                subtitle: 'Tổng hợp các câu hỏi thường gặp theo nhóm vấn đề để người dùng tra cứu nhanh hơn.',
                backgroundImage: media.openAccountBg.id
              },
              {
                __component: 'sections.faq-section',
                title: 'Nhóm câu hỏi phổ biến',
                limit: 8
              }
            ]
          },
          {
            slug: 'thong-bao',
            title: 'Thông báo',
            summary: 'Danh sách cập nhật về danh mục ký quỹ, thay đổi quy định, nghỉ lễ và các thông báo quan trọng.',
            pageType: pageTypeMap.get('support'),
            coverImage: media.tradingBg.id,
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Hỗ trợ',
                title: 'Thông báo vận hành và cập nhật quan trọng',
                subtitle: 'Khách hàng nên kiểm tra thường xuyên để nắm sớm thay đổi về giao dịch, quy định và lịch nghỉ.',
                backgroundImage: media.tradingBg.id
              },
              {
                __component: 'sections.feature-card-section',
                title: 'Nội dung cần theo dõi',
                description: 'Các nhóm thông báo ảnh hưởng trực tiếp tới giao dịch và tài khoản.',
                items: [
                  { title: 'Danh mục ký quỹ', description: 'Danh mục và tỷ lệ cho vay thay đổi theo từng thời điểm.' },
                  { title: 'Nghỉ lễ và lịch vận hành', description: 'Các cập nhật về ngày nghỉ, thời gian xử lý và hỗ trợ.' },
                  { title: 'Thông báo hệ thống', description: 'Bảo trì, nâng cấp hoặc thay đổi tính năng trên nền tảng.' }
                ]
              }
            ]
          },
          {
            slug: 'dang-ky-giao-dich-ky-quy',
            title: 'Hướng dẫn giao dịch ký quỹ',
            summary: 'Các bước đăng ký, điều kiện sử dụng và lưu ý khi giao dịch ký quỹ.',
            pageType: pageTypeMap.get('support'),
            coverImage: media.tradingBg.id,
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Hỗ trợ',
                title: 'Đăng ký giao dịch ký quỹ',
                subtitle: 'Trang này tóm tắt điều kiện, quy trình và lưu ý chính khi sử dụng dịch vụ margin.',
                backgroundImage: media.tradingBg.id
              },
              {
                __component: 'sections.feature-card-section',
                title: 'Điều kiện và lưu ý',
                description: 'Những điểm cần nắm trước khi đăng ký dịch vụ.',
                items: [
                  { title: 'Tài khoản giao dịch', description: 'Khách hàng cần có tài khoản giao dịch tại SSV.' },
                  { title: 'Hợp đồng ký quỹ', description: 'Hoàn tất hợp đồng mở tài khoản giao dịch ký quỹ theo quy trình công bố.' },
                  { title: 'Danh mục và lãi suất', description: 'Danh mục được phép và lãi suất được cập nhật định kỳ.' }
                ]
              }
            ]
          },
          {
            slug: 'services',
            title: 'Sản phẩm & Dịch vụ',
            summary: 'Danh mục giải pháp cho khách hàng cá nhân, doanh nghiệp và định chế.',
            pageType: pageTypeMap.get('generic'),
            coverImage: media.serviceBrokerage.id,
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Sản phẩm & Dịch vụ',
                title: 'Giải pháp đầu tư cho từng nhu cầu',
                subtitle:
                  'Từ môi giới chứng khoán, giao dịch trực tuyến đến ngân hàng đầu tư, nội dung được sắp xếp theo đúng hành trình sử dụng của khách hàng.',
                backgroundImage: media.serviceBrokerage.id
              },
              {
                __component: 'sections.feature-card-section',
                title: 'Hai nhóm trọng tâm',
                description: 'Tổng quan nhanh các nhóm sản phẩm chính trên website.',
                items: [
                  {
                    title: 'Môi giới chứng khoán',
                    description: 'Giao dịch trực tuyến, tư vấn đầu tư và dịch vụ tài chính cho nhà đầu tư cá nhân.',
                    link: { label: 'Xem chi tiết', href: '/vi/services/moi-gioi-chung-khoan' }
                  },
                  {
                    title: 'Ngân hàng đầu tư',
                    description: 'Giải pháp thị trường vốn và thị trường nợ cho khách hàng doanh nghiệp.',
                    link: { label: 'Xem chi tiết', href: '/vi/services/ngan-hang-dau-tu' }
                  }
                ]
              }
            ]
          },
          {
            slug: 'news',
            title: 'Tin tức',
            summary: 'Dòng tin thị trường, vận hành và hoạt động doanh nghiệp.',
            pageType: pageTypeMap.get('generic'),
            coverImage: media.heroMain.id,
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Tin tức',
                title: 'Dòng tin giúp nhà đầu tư đi trước thị trường',
                subtitle: 'Tổng hợp thông báo vận hành, chương trình ưu đãi và cập nhật thị trường theo một trục thông tin duy nhất.',
                backgroundImage: media.heroMain.id
              },
              {
                __component: 'sections.feature-card-section',
                title: 'Cách đọc dòng tin',
                description: 'Tập trung vào những nhóm nội dung có tác động trực tiếp tới quyết định giao dịch.',
                items: [
                  { title: 'Thông báo hệ thống', description: 'Các thay đổi về giao dịch, chính sách hoặc nền tảng cần theo dõi kịp thời.' },
                  { title: 'Ưu đãi khách hàng', description: 'Các chương trình mới giúp tối ưu chi phí và trải nghiệm giao dịch.' },
                  { title: 'Diễn biến thị trường', description: 'Những điểm nhấn tác động tới danh mục và chiến lược ngắn hạn.' }
                ]
              }
            ]
          },
          {
            slug: 'events',
            title: 'Sự kiện',
            summary: 'Workshop, webinar và cập nhật chiến lược cho cộng đồng đầu tư.',
            pageType: pageTypeMap.get('generic'),
            coverImage: media.serviceResearchBg.id,
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Sự kiện',
                title: 'Kết nối với cập nhật chiến lược và cộng đồng đầu tư',
                subtitle: 'Các buổi workshop, briefing thị trường và hoạt động cộng đồng được tổ chức thành một luồng nội dung thống nhất.',
                backgroundImage: media.serviceResearchBg.id
              },
              {
                __component: 'sections.feature-card-section',
                title: 'Lịch sự kiện',
                description: 'Tập trung theo nhu cầu học sản phẩm, cập nhật thị trường và kết nối cộng đồng.',
                items: [
                  { title: 'Workshop sản phẩm', description: 'Giới thiệu và ứng dụng các sản phẩm mới vào danh mục thực tế.' },
                  { title: 'Briefing thị trường', description: 'Cập nhật kịch bản vận động thị trường theo chu kỳ ngắn và trung hạn.' },
                  { title: 'Cộng đồng đầu tư', description: 'Hoạt động kết nối giữa chuyên gia và nhà đầu tư cá nhân.' }
                ]
              }
            ]
          },
          {
            slug: 'chinh-sach-bao-mat',
            title: 'Chính sách bảo mật',
            summary: 'Cam kết bảo mật dữ liệu khách hàng.',
            pageType: pageTypeMap.get('legal'),
            coverImage: media.oneShinhanBg.id,
            sections: [
              {
                __component: 'sections.rich-text-block',
                content:
                  '<p>Chính sách này mô tả cách chúng tôi thu thập, xử lý và bảo vệ dữ liệu cá nhân theo quy định pháp luật hiện hành.</p>'
              }
            ]
          },
          {
            slug: 'dieu-khoan-su-dung',
            title: 'Điều khoản sử dụng',
            summary: 'Điều khoản và điều kiện sử dụng website.',
            pageType: pageTypeMap.get('legal'),
            coverImage: media.oneShinhanBg.id,
            sections: [
              {
                __component: 'sections.rich-text-block',
                content:
                  '<p>Người dùng cần tuân thủ điều khoản sử dụng, quyền sở hữu nội dung và các nguyên tắc bảo mật khi truy cập website.</p>'
              }
            ]
          },
          {
            slug: 'mien-tru-trach-nhiem',
            title: 'Miễn trừ trách nhiệm',
            summary: 'Thông tin pháp lý liên quan đến nội dung công bố.',
            pageType: pageTypeMap.get('legal'),
            coverImage: media.oneShinhanBg.id,
            sections: [
              {
                __component: 'sections.rich-text-block',
                content:
                  '<p>Nội dung trên website chỉ mang tính tham khảo, không cấu thành khuyến nghị đầu tư bắt buộc.</p>'
              }
            ]
          },
          {
            slug: 'careers',
            title: 'Tuyển dụng',
            summary: 'Cơ hội nghề nghiệp trong lĩnh vực chứng khoán, tư vấn, vận hành và công nghệ.',
            pageType: pageTypeMap.get('generic'),
            coverImage: media.serviceResearchBg.id
          },
          {
            slug: 'research',
            title: 'Trung tâm phân tích',
            summary: 'Khuyến nghị cổ phiếu, báo cáo định kỳ, báo cáo vĩ mô và đội ngũ phân tích viên.',
            pageType: pageTypeMap.get('generic'),
            coverImage: media.serviceResearchBg.id
          },
          {
            slug: 'faq',
            title: 'Câu hỏi thường gặp',
            summary: 'Tổng hợp câu hỏi thường gặp về tài khoản, giao dịch, nộp rút tiền và dịch vụ hỗ trợ khách hàng.',
            pageType: pageTypeMap.get('generic'),
            coverImage: media.tradingBg.id
          },
          {
            slug: 'contact',
            title: 'Liên hệ',
            summary: 'Kết nối với bộ phận tư vấn, vận hành và mạng lưới văn phòng giao dịch.',
            pageType: pageTypeMap.get('generic'),
            coverImage: media.oneShinhanBg.id
          }
        ]
      : [
          {
            slug: 'about',
            title: 'Shinhan Securities Vietnam',
            summary: 'Company overview, business lines, milestones, leadership, Shinhan Way, and One Shinhan.',
            pageType: pageTypeMap.get('about'),
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'About us',
                title: 'A trusted partner accompanying your journey in equity markets',
                subtitle:
                  'Shinhan Investment acquired Nam An Securities in July 2015 and established Shinhan Securities Vietnam in February 2016.'
              },
              {
                __component: 'sections.rich-text-block',
                title: 'Who we are',
                content:
                  '<p>Shinhan Investment is a wholly owned subsidiary of Shinhan Financial Group. In Vietnam, it acquired Nam An Securities in July 2015 and officially established Shinhan Securities Vietnam in February 2016.</p><p>Through Shinhan Financial Group’s global network and One Shinhan ecosystem in Vietnam, we position ourselves as a trusted guide for successful investment and long-term value creation.</p>'
              },
              {
                __component: 'sections.feature-card-section',
                title: 'Business lines',
                description: 'Two major business pillars delivered through an integrated financial service model.',
                items: [
                  {
                    title: 'Brokerage',
                    description:
                      'An asset management partner pursuing growth with clients through professional advisory and digital trading services.',
                    link: { label: 'Explore services', href: '/en/services' }
                  },
                  {
                    title: 'Investment banking',
                    description:
                      'Optimal financial solutions for corporate clients through debt and capital market advisory backed by Shinhan’s global network.',
                    link: { label: 'Talk to our team', href: '/en/contact' }
                  }
                ]
              },
              {
                __component: 'sections.timeline-section',
                title: 'Milestones',
                items: [
                  { year: '2015', title: 'Acquisition completed', description: 'Shinhan Investment completed the 100% acquisition of Nam An Securities.' },
                  { year: '2016.02', title: 'Shinhan Securities Vietnam established', description: 'Official renaming and establishment of Shinhan Securities Vietnam LLC.' },
                  { year: '2016.02', title: 'Custody member status', description: 'Became an official custody member of the Vietnam Securities Depository.' },
                  { year: '2016.05', title: 'HNX membership', description: 'Became an official member of Hanoi Stock Exchange.' },
                  { year: '2017.12', title: 'Charter capital increase', description: 'Increased charter capital to VND 812.6 billion.' },
                  { year: '2018', title: 'Investment banking expansion', description: 'Developed and scaled up the investment banking business line.' },
                  { year: '2020', title: 'Retail brokerage expansion', description: 'Accelerated retail brokerage business growth.' },
                  { year: '2021.11', title: 'New trading platform launched', description: 'Expanded retail business and launched a new trading platform.' },
                  { year: '2021.12', title: 'Capital raised to VND 2,000 billion', description: 'Increased charter capital to VND 2,000 billion.' },
                  { year: '2022.07', title: 'Hanoi branch opening', description: 'Opened the Hanoi branch to expand nationwide presence.' },
                  { year: '2023.03', title: 'San Xin Ha app launched', description: 'Introduced the San Xin Ha investment application.' }
                ]
              },
              {
                __component: 'sections.quote-section',
                quote:
                  'We are committed to becoming a leading securities firm in Vietnam by delivering optimal financial solutions with advanced expertise in wealth management and corporate finance.',
                author: 'Han Bokhee',
                role: 'CEO - Shinhan Securities Vietnam'
              },
              {
                __component: 'sections.rich-text-block',
                title: 'Shinhan Way',
                content:
                  '<p>Shinhan Way defines the mission, core values, and vision used by all members of Shinhan Financial Group to guide decisions and actions.</p><p><strong>Mission:</strong> A better world through Shinhan finance.</p><p><strong>Core values:</strong> Customer, Mutual Respect, Change, Excellence, Ownership.</p><p><strong>Vision:</strong> A world-class financial group.</p>'
              },
              {
                __component: 'sections.feature-card-section',
                title: 'One Shinhan',
                description: 'Shinhan Vietnam aims to build the second Shinhan Financial Group based on a strong One Shinhan network.',
                items: [
                  {
                    title: 'Banking',
                    description: 'Banking services and payment ecosystem for individuals and businesses.',
                    link: { label: 'Learn more', href: 'https://shinhan.com.vn' }
                  },
                  {
                    title: 'Technology solutions',
                    description: 'Technology-enabled financial operations and consistent user experience.',
                    link: { label: 'Learn more', href: 'https://shinhands.com.vn' }
                  },
                  {
                    title: 'Securities',
                    description: 'Integrated brokerage, advisory, and investment banking capabilities.',
                    link: { label: 'Learn more', href: '/en/about' }
                  },
                  {
                    title: 'Insurance',
                    description: 'Insurance offerings delivered within Shinhan’s Vietnam financial ecosystem.',
                    link: { label: 'Learn more', href: 'https://shinhanlifevn.com.vn' }
                  },
                  {
                    title: 'Finance',
                    description: 'Consumer finance and funding solutions for diversified customer needs.',
                    link: { label: 'Learn more', href: 'https://www.shinhanfinance.com.vn' }
                  }
                ]
              },
              {
                __component: 'sections.cta-section',
                title: 'Get in touch and explore more',
                description: 'Discover more about the company, career opportunities, and the One Shinhan ecosystem in Vietnam.',
                primaryButton: { label: 'Contact us', href: '/en/contact', variant: 'primary' },
                secondaryButton: { label: 'View careers', href: '/en/careers', variant: 'secondary' }
              }
            ]
          },
          {
            slug: 'support',
            title: 'Customer Support',
            summary: 'Guides for onboarding, trading and service procedures.',
            pageType: pageTypeMap.get('support'),
            sections: [
              {
                __component: 'sections.feature-card-section',
                title: 'Help Center',
                items: [
                  { title: 'Open account', description: 'eKYC onboarding and account activation flow.' },
                  { title: 'Trading guide', description: 'How to place, modify and cancel orders.' },
                  { title: 'Fees', description: 'Service fee schedules and applied conditions.' }
                ]
              },
              {
                __component: 'sections.table-block',
                title: 'Support Hours',
                column1Label: 'Channel',
                column2Label: 'Hours',
                rows: [
                  { col1: 'Hotline', col2: '08:00 - 17:30 (Mon - Fri)' },
                  { col1: 'Email', col2: 'Response within 4 business hours' }
                ]
              },
              {
                __component: 'sections.faq-section',
                title: 'Frequently asked questions',
                limit: 6
              }
            ]
          },
          {
            slug: 'mo-tai-khoan-truc-tuyen',
            title: 'Online account opening guide',
            summary: 'eKYC onboarding, required documents, and support contacts.',
            pageType: pageTypeMap.get('support'),
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Support',
                title: 'Open your account online in a few steps',
                subtitle: 'Domestic individual customers can complete eKYC on a mobile device or a computer with a camera.'
              },
              {
                __component: 'sections.feature-card-section',
                title: 'What to prepare',
                description: 'Documents and devices to have ready before starting.',
                items: [
                  { title: 'Valid chip ID card', description: 'A valid identity document for verification.' },
                  { title: 'Camera-enabled device', description: 'Phone or computer for photos and facial recognition.' },
                  { title: 'San Xin Ha app', description: 'Install the app to complete the account opening flow.' }
                ]
              },
              {
                __component: 'sections.rich-text-block',
                title: 'Basic flow',
                content:
                  '<p>1. Download the San Xin Ha app.</p><p>2. Choose account opening and enter your personal details.</p><p>3. Complete verification, sign the contract, and wait for activation.</p>'
              },
              {
                __component: 'sections.faq-section',
                title: 'Frequently asked questions',
                limit: 4
              }
            ]
          },
          {
            slug: 'huong-dan-giao-dich',
            title: 'Trading guide',
            summary: 'Login, profile updates, funding, and account management steps.',
            pageType: pageTypeMap.get('support'),
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Support',
                title: 'Common trading actions',
                subtitle: 'Content is grouped by the real workflow: login, funding, and account management.'
              },
              {
                __component: 'sections.feature-card-section',
                title: 'Key topics',
                description: 'The actions users need to know before trading.',
                items: [
                  { title: 'Login and security', description: 'How to use trading passwords, OTP, and iOTP safely.' },
                  { title: 'Deposits and withdrawals', description: 'Notes on sub-accounts, transfer content, and processing times.' },
                  { title: 'Account management', description: 'Update your profile, settlement bank account, and watchlists.' }
                ]
              }
            ]
          },
          {
            slug: 'quy-dinh-giao-dich',
            title: 'Trading regulations',
            summary: 'Trading hours, lot sizes, tick sizes, odd-lot rules, and settlement basics.',
            pageType: pageTypeMap.get('support'),
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Support',
                title: 'Core rules before placing an order',
                subtitle: 'Trading hours, price steps, lot sizes, and settlement are organized for quick reference.'
              },
              {
                __component: 'sections.table-block',
                title: 'Quick reference',
                column1Label: 'Topic',
                column2Label: 'Summary',
                rows: [
                  { col1: 'Trading hours', col2: 'Monday to Friday excluding public holidays' },
                  { col1: 'Lot sizes', col2: 'Board lot and odd lot trading depending on the exchange' },
                  { col1: 'Settlement', col2: 'Applied according to product-specific cycles' }
                ]
              },
              {
                __component: 'sections.faq-section',
                title: 'Frequently asked questions',
                limit: 4
              }
            ]
          },
          {
            slug: 'cau-hoi-thuong-gap',
            title: 'Frequently asked questions',
            summary: 'Common questions about onboarding, trading, margin, and fund transfers.',
            pageType: pageTypeMap.get('support'),
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Support',
                title: 'Find quick answers to common questions',
                subtitle: 'Frequently asked questions are grouped by topic so users can search faster.'
              },
              {
                __component: 'sections.faq-section',
                title: 'Common questions',
                limit: 8
              }
            ]
          },
          {
            slug: 'thong-bao',
            title: 'Notices',
            summary: 'Updates on margin lists, rule changes, holidays, and important notices.',
            pageType: pageTypeMap.get('support'),
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Support',
                title: 'Operational notices and key updates',
                subtitle: 'Customers should check regularly for changes to trading, rules and holiday schedules.'
              },
              {
                __component: 'sections.feature-card-section',
                title: 'Topics to follow',
                description: 'Notice categories that directly affect trading and accounts.',
                items: [
                  { title: 'Margin lists', description: 'Eligible securities and lending ratios change over time.' },
                  { title: 'Holiday schedules', description: 'Updated processing times and support availability.' },
                  { title: 'System notices', description: 'Maintenance, upgrades, or platform feature changes.' }
                ]
              }
            ]
          },
          {
            slug: 'dang-ky-giao-dich-ky-quy',
            title: 'Margin trading guide',
            summary: 'Registration flow, usage conditions, and key margin trading notes.',
            pageType: pageTypeMap.get('support'),
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Support',
                title: 'Register for margin trading',
                subtitle: 'This page summarizes the main conditions, process and notes for using margin services.'
              },
              {
                __component: 'sections.feature-card-section',
                title: 'Conditions and notes',
                description: 'What to know before registering for the service.',
                items: [
                  { title: 'Trading account', description: 'Customers must already have an SSV trading account.' },
                  { title: 'Margin agreement', description: 'Complete the margin account agreement under the published process.' },
                  { title: 'Eligibility and rates', description: 'Eligible list and interest rates are updated periodically.' }
                ]
              }
            ]
          },
          {
            slug: 'services',
            title: 'Products & Services',
            summary: 'Service portfolio for retail, corporate and institutional clients.',
            pageType: pageTypeMap.get('generic'),
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Products & Services',
                title: 'Investment solutions for every client need',
                subtitle:
                  'From securities brokerage and online trading to investment banking, the content is structured around the customer journey.'
              },
              {
                __component: 'sections.feature-card-section',
                title: 'Two core groups',
                description: 'A quick overview of the main service clusters on the website.',
                items: [
                  {
                    title: 'Securities brokerage',
                    description: 'Online trading, advisory, and financing services for retail investors.',
                    link: { label: 'View details', href: '/en/services/moi-gioi-chung-khoan' }
                  },
                  {
                    title: 'Investment banking',
                    description: 'Equity and debt capital market solutions for corporate clients.',
                    link: { label: 'View details', href: '/en/services/investment-banking' }
                  }
                ]
              }
            ]
          },
          {
            slug: 'news',
            title: 'News',
            summary: 'Market news, operational updates and corporate activities.',
            pageType: pageTypeMap.get('generic'),
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'News',
                title: 'A feed that helps investors stay ahead',
                subtitle: 'Operational notices, promotions and market updates are grouped into one consistent information stream.'
              },
              {
                __component: 'sections.feature-card-section',
                title: 'How to read the feed',
                description: 'Focused on the content clusters that influence trading decisions most directly.',
                items: [
                  { title: 'System notices', description: 'Track platform, product and policy changes before they affect execution.' },
                  { title: 'Investor programs', description: 'Promotions and campaigns that improve transaction economics and engagement.' },
                  { title: 'Market updates', description: 'Highlights that may influence positions and short-term strategies.' }
                ]
              }
            ]
          },
          {
            slug: 'events',
            title: 'Events',
            summary: 'Workshops, webinars and strategy updates for investors.',
            pageType: pageTypeMap.get('generic'),
            sections: [
              {
                __component: 'sections.hero-block',
                kicker: 'Events',
                title: 'Connect with strategy updates and the investor community',
                subtitle: 'Workshops, market briefings and community activities are organized into a single editorial track.'
              },
              {
                __component: 'sections.feature-card-section',
                title: 'Event calendar',
                description: 'Focused on product education, market updates, and community engagement.',
                items: [
                  { title: 'Product workshops', description: 'Practical walkthroughs of new products and portfolio use cases.' },
                  { title: 'Market briefings', description: 'Scenario-based market updates for tactical and medium-term positioning.' },
                  { title: 'Investor community', description: 'Events connecting experts and individual investors.' }
                ]
              }
            ]
          },
          {
            slug: 'privacy-policy',
            title: 'Privacy Policy',
            summary: 'Our commitment to personal data protection.',
            pageType: pageTypeMap.get('legal'),
            coverImage: media.oneShinhanBg.id,
            sections: [
              {
                __component: 'sections.rich-text-block',
                content:
                  '<p>This policy describes how we collect, process, and protect personal data in accordance with applicable regulations.</p>'
              }
            ]
          },
          {
            slug: 'terms-of-use',
            title: 'Terms of Use',
            summary: 'Terms and conditions for website usage.',
            pageType: pageTypeMap.get('legal'),
            coverImage: media.oneShinhanBg.id,
            sections: [
              {
                __component: 'sections.rich-text-block',
                content:
                  '<p>Users must comply with the terms, content ownership principles, and security practices when using this website.</p>'
              }
            ]
          },
          {
            slug: 'disclaimer',
            title: 'Disclaimer',
            summary: 'Legal notice regarding published content.',
            pageType: pageTypeMap.get('legal'),
            coverImage: media.oneShinhanBg.id,
            sections: [
              {
                __component: 'sections.rich-text-block',
                content:
                  '<p>Website content is for reference only and does not constitute mandatory investment advice.</p>'
              }
            ]
          },
          {
            slug: 'careers',
            title: 'Careers',
            summary: 'Career opportunities in securities, advisory, operations, and technology.',
            pageType: pageTypeMap.get('generic'),
            coverImage: media.serviceResearchBg.id
          },
          {
            slug: 'research',
            title: 'Research Center',
            summary: 'Stock recommendations, periodic reports, macro reports, and analysts.',
            pageType: pageTypeMap.get('generic'),
            coverImage: media.serviceResearchBg.id
          },
          {
            slug: 'faq',
            title: 'Frequently Asked Questions',
            summary: 'Common questions about onboarding, trading, fund transfers, and customer support.',
            pageType: pageTypeMap.get('generic'),
            coverImage: media.tradingBg.id
          },
          {
            slug: 'contact',
            title: 'Contact',
            summary: 'Connect with advisory, operations and office network touchpoints.',
            pageType: pageTypeMap.get('generic'),
            coverImage: media.oneShinhanBg.id
          }
        ];

  for (const page of pages) {
    await upsertBySlug(strapi, 'api::page.page', locale, {
      ...page,
      featured: false,
      sortOrder: 0,
      breadcrumb: { show: true },
      seo: {
        metaTitle: buildSeoTitle(page.title, t.siteName),
        metaDescription: buildSeoDescription(
          page.summary,
          locale,
          locale === 'vi'
            ? 'Nội dung trang được xây dựng theo chuẩn thông tin doanh nghiệp, rõ ràng và dễ tiếp cận cho người dùng.'
            : 'Page content follows enterprise communication standards for clarity, consistency, and accessibility.'
        ),
        canonicalUrl: `https://fintrust.vn/${locale}/${
          page.slug === 'about'
            ? 'about'
            : pageTypeSlugById.get(page.pageType as number) === 'legal'
              ? `legal/${page.slug}`
              : pageTypeSlugById.get(page.pageType as number) === 'support' && page.slug !== 'support'
                ? `support/${page.slug}.html`
                : page.slug
        }`,
        metaRobots: 'index,follow'
      }
    });
  }

  const banners =
    locale === 'vi'
      ? [
          {
            title: 'Mở tài khoản trong vài phút',
            slug: 'uu-dai-mo-tai-khoan-moi',
            summary: 'Hoàn tất eKYC online và bắt đầu hành trình đầu tư ngay hôm nay.',
            button: { label: 'Đăng ký ngay', href: '/vi/support/open-account', variant: 'primary', target: '_self' },
            image: media.heroMain.id,
            mobileImage: media.heroAlt1.id
          },
          {
            title: 'Giao dịch số nhanh và an toàn',
            slug: 'trai-nghiem-giao-dich-so',
            summary: 'Khám phá nền tảng giao dịch web và mobile với cảnh báo thông minh và quản trị tài khoản linh hoạt.',
            button: { label: 'Bắt đầu giao dịch', href: '/vi/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html', variant: 'primary', target: '_self' },
            image: media.heroAlt1.id,
            mobileImage: media.heroAlt2.id
          },
          {
            title: 'Báo cáo và khuyến nghị mới nhất',
            slug: 'nghien-cuu-dau-tu-noi-bat',
            summary: 'Cập nhật báo cáo chiến lược, thị trường và khuyến nghị cổ phiếu từ đội ngũ phân tích.',
            button: { label: 'Xem báo cáo', href: '/vi/research', variant: 'primary', target: '_self' },
            image: media.heroAlt2.id,
            mobileImage: media.heroMain.id
          }
        ]
      : [
          {
            title: 'Open your account in minutes',
            slug: 'new-account-offer',
            summary: 'Complete eKYC online and start your investing journey today.',
            button: { label: 'Register now', href: '/en/support/open-account', variant: 'primary', target: '_self' },
            image: media.heroMain.id,
            mobileImage: media.heroAlt1.id
          },
          {
            title: 'Fast and secure digital trading',
            slug: 'digital-trading-experience',
            summary: 'Explore the web and mobile trading stack with smart alerts and flexible account control.',
            button: { label: 'Start trading', href: '/en/services/moi-gioi-chung-khoan/giao-dich-truc-tuyen.html', variant: 'primary', target: '_self' },
            image: media.heroAlt1.id,
            mobileImage: media.heroAlt2.id
          },
          {
            title: 'Latest research and stock ideas',
            slug: 'featured-research-insights',
            summary: 'Fresh strategy notes, market updates, and stock recommendations from our research team.',
            button: { label: 'View reports', href: '/en/research', variant: 'primary', target: '_self' },
            image: media.heroAlt2.id,
            mobileImage: media.heroMain.id
          }
        ];

  for (let i = 0; i < banners.length; i += 1) {
    await upsertBySlug(strapi, 'api::banner.banner', locale, {
      ...banners[i],
      placement: bannerPlacementMap.get('home_hero')!,
      priority: i + 1,
      active: true
    });
  }

  strapi.log.info(`[seed] Locale ${locale} seeded.`);
}

export async function seedAll(strapi: StrapiInstance) {
  await ensureLocales(strapi);
  await setPublicPermissions(strapi);
  const media = await ensureCmsMedia(strapi);
  await seedLocale(strapi, 'vi', media);
  await seedLocale(strapi, 'en', media);
  strapi.log.info('[seed] Completed seed process for vi/en.');
}
