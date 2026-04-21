import type { Attribute, Schema } from '@strapi/strapi';

export interface SectionsContactSection extends Schema.Component {
  collectionName: 'components_sections_contact_sections';
  info: {
    displayName: 'Kh\u1ED1i li\u00EAn h\u1EC7 / Contact Section';
  };
  attributes: {
    address: Attribute.Text;
    description: Attribute.Text;
    email: Attribute.Email;
    phone: Attribute.String;
    title: Attribute.String;
  };
}

export interface SectionsCtaSection extends Schema.Component {
  collectionName: 'components_sections_cta_sections';
  info: {
    displayName: 'Kh\u1ED1i CTA / CTA Section';
  };
  attributes: {
    description: Attribute.Text;
    positionIndex: Attribute.Integer & Attribute.DefaultTo<1100>;
    primaryButton: Attribute.Component<'shared.button-config'>;
    secondaryButton: Attribute.Component<'shared.button-config'>;
    title: Attribute.String & Attribute.Required;
  };
}

export interface SectionsDownloadListSection extends Schema.Component {
  collectionName: 'components_sections_download_list_sections';
  info: {
    displayName: 'Kh\u1ED1i danh s\u00E1ch t\u00E0i li\u1EC7u / Download List Section';
  };
  attributes: {
    description: Attribute.Text;
    documentCategory: Attribute.String;
    limit: Attribute.Integer & Attribute.DefaultTo<6>;
    title: Attribute.String;
  };
}

export interface SectionsEmbedBlock extends Schema.Component {
  collectionName: 'components_sections_embed_blocks';
  info: {
    displayName: 'Kh\u1ED1i nh\u00FAng / Embed Block';
  };
  attributes: {
    embedCode: Attribute.Text;
    embedUrl: Attribute.String;
    title: Attribute.String;
  };
}

export interface SectionsFaqSection extends Schema.Component {
  collectionName: 'components_sections_faq_sections';
  info: {
    displayName: 'Kh\u1ED1i FAQ / FAQ Section';
  };
  attributes: {
    description: Attribute.Text;
    faqCategorySlug: Attribute.String;
    limit: Attribute.Integer & Attribute.DefaultTo<6>;
    positionIndex: Attribute.Integer & Attribute.DefaultTo<1000>;
    title: Attribute.String;
  };
}

export interface SectionsFeatureCardSection extends Schema.Component {
  collectionName: 'components_sections_feature_card_sections';
  info: {
    displayName: 'Kh\u1ED1i th\u1EBB t\u00EDnh n\u0103ng / Feature Card Section';
  };
  attributes: {
    description: Attribute.Text;
    items: Attribute.Component<'shared.feature-item', true>;
    positionIndex: Attribute.Integer & Attribute.DefaultTo<400>;
    title: Attribute.String;
  };
}

export interface SectionsHeroBlock extends Schema.Component {
  collectionName: 'components_sections_hero_blocks';
  info: {
    displayName: 'Kh\u1ED1i hero / Hero Section';
  };
  attributes: {
    backgroundImage: Attribute.Media<'images'>;
    kicker: Attribute.String;
    primaryButton: Attribute.Component<'shared.button-config'>;
    secondaryButton: Attribute.Component<'shared.button-config'>;
    subtitle: Attribute.Text;
    title: Attribute.String & Attribute.Required;
  };
}

export interface SectionsHomeAiStackSection extends Schema.Component {
  collectionName: 'components_home_ai_stack_sections';
  info: {
    description: 'C\u00E1c th\u1EBB th\u1EC3 hi\u1EC7n gi\u00E1 tr\u1ECB AI v\u00E0 d\u1EEF li\u1EC7u tr\u00EAn trang ch\u1EE7 / Cards showing AI and data value propositions on the homepage';
    displayName: 'Kh\u1ED1i AI/d\u1EEF li\u1EC7u trang ch\u1EE7 / Homepage AI Stack Section';
  };
  attributes: {
    cards: Attribute.Component<'shared.home-ai-card', true>;
    eyebrow: Attribute.String;
    positionIndex: Attribute.Integer & Attribute.DefaultTo<200>;
    title: Attribute.String & Attribute.Required;
  };
}

export interface SectionsHomeEcosystemSection extends Schema.Component {
  collectionName: 'components_home_ecosystem_sections';
  info: {
    description: 'Kh\u1ED1i li\u00EAn k\u1EBFt h\u1EC7 sinh th\u00E1i v\u00E0 CTA tr\u00EAn trang ch\u1EE7 / Ecosystem links and CTA block on the homepage';
    displayName: 'Kh\u1ED1i h\u1EC7 sinh th\u00E1i trang ch\u1EE7 / Homepage Ecosystem Section';
  };
  attributes: {
    description: Attribute.Text;
    eyebrow: Attribute.String;
    marketLabel: Attribute.String;
    positionIndex: Attribute.Integer & Attribute.DefaultTo<300>;
    primaryButton: Attribute.Component<'shared.button-config'>;
    quickLinks: Attribute.Component<'shared.link-item', true>;
    secondaryButton: Attribute.Component<'shared.button-config'>;
    shortcutLinks: Attribute.Component<'shared.link-item', true>;
    title: Attribute.String & Attribute.Required;
  };
}

export interface SectionsHomeMarketStripSection extends Schema.Component {
  collectionName: 'components_home_market_strip_sections';
  info: {
    description: 'D\u1EA3i th\u1ECB tr\u01B0\u1EDDng realtime tr\u00EAn trang ch\u1EE7 / Realtime market strip on the homepage';
    displayName: 'Kh\u1ED1i th\u1ECB tr\u01B0\u1EDDng trang ch\u1EE7 / Homepage Market Strip';
  };
  attributes: {
    positionIndex: Attribute.Integer & Attribute.DefaultTo<50>;
  };
}

export interface SectionsHomeOneShinhanSection extends Schema.Component {
  collectionName: 'components_home_one_shinhan_sections';
  info: {
    description: 'B\u0103ng chuy\u1EC1n h\u1EC7 sinh th\u00E1i \u0111\u1ED1i t\u00E1c tr\u00EAn trang ch\u1EE7 / Partner ecosystem carousel on the homepage';
    displayName: 'Kh\u1ED1i One Shinhan trang ch\u1EE7 / Homepage One Shinhan Section';
  };
  attributes: {
    carouselLabel: Attribute.String;
    ecosystemLabel: Attribute.String;
    footerDescription: Attribute.Text;
    footerTitle: Attribute.String;
    highlights: Attribute.Component<'shared.home-highlight-item', true>;
    kicker: Attribute.String;
    logo: Attribute.Media<'images'>;
    logoAlt: Attribute.String;
    officeCountLabel: Attribute.String;
    officeLocationPrimary: Attribute.String;
    officeLocationSecondary: Attribute.String;
    partners: Attribute.Component<'shared.home-partner-item', true>;
    positionIndex: Attribute.Integer & Attribute.DefaultTo<100>;
    profileLabel: Attribute.String;
    subtitle: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    visitLabel: Attribute.String;
  };
}

export interface SectionsHomePriceBoardSection extends Schema.Component {
  collectionName: 'components_home_price_board_sections';
  info: {
    description: 'Kh\u1ED1i b\u1EA3ng gi\u00E1 realtime tr\u00EAn trang ch\u1EE7 / Realtime price board on the homepage';
    displayName: 'Kh\u1ED1i b\u1EA3ng gi\u00E1 trang ch\u1EE7 / Homepage Price Board';
  };
  attributes: {
    positionIndex: Attribute.Integer & Attribute.DefaultTo<500>;
  };
}

export interface SectionsNewsListSection extends Schema.Component {
  collectionName: 'components_sections_news_list_sections';
  info: {
    displayName: 'Kh\u1ED1i danh s\u00E1ch tin t\u1EE9c / News List Section';
  };
  attributes: {
    description: Attribute.Text;
    featuredOnly: Attribute.Boolean & Attribute.DefaultTo<false>;
    limit: Attribute.Integer & Attribute.DefaultTo<6>;
    positionIndex: Attribute.Integer & Attribute.DefaultTo<800>;
    title: Attribute.String;
  };
}

export interface SectionsOfficeListSection extends Schema.Component {
  collectionName: 'components_sections_office_list_sections';
  info: {
    displayName: 'Kh\u1ED1i danh s\u00E1ch v\u0103n ph\u00F2ng / Office List Section';
  };
  attributes: {
    description: Attribute.Text;
    positionIndex: Attribute.Integer & Attribute.DefaultTo<1200>;
    showMapPlaceholder: Attribute.Boolean & Attribute.DefaultTo<true>;
    title: Attribute.String;
  };
}

export interface SectionsQuoteSection extends Schema.Component {
  collectionName: 'components_sections_quote_sections';
  info: {
    displayName: 'Kh\u1ED1i tr\u00EDch d\u1EABn / Quote Section';
  };
  attributes: {
    author: Attribute.String;
    quote: Attribute.Text & Attribute.Required;
    role: Attribute.String;
  };
}

export interface SectionsRelatedContentSection extends Schema.Component {
  collectionName: 'components_sections_related_contents';
  info: {
    displayName: 'Kh\u1ED1i n\u1ED9i dung li\u00EAn quan / Related Content Section';
  };
  attributes: {
    contentType: Attribute.Relation<
      'sections.related-content-section',
      'manyToOne',
      'api::related-content-type.related-content-type'
    >;
    limit: Attribute.Integer & Attribute.DefaultTo<4>;
    title: Attribute.String;
  };
}

export interface SectionsResearchListSection extends Schema.Component {
  collectionName: 'components_sections_research_list_sections';
  info: {
    displayName: 'Kh\u1ED1i danh s\u00E1ch b\u00E1o c\u00E1o / Research List Section';
  };
  attributes: {
    description: Attribute.Text;
    featuredOnly: Attribute.Boolean & Attribute.DefaultTo<false>;
    limit: Attribute.Integer & Attribute.DefaultTo<6>;
    positionIndex: Attribute.Integer & Attribute.DefaultTo<900>;
    title: Attribute.String;
  };
}

export interface SectionsRichTextBlock extends Schema.Component {
  collectionName: 'components_sections_rich_text_blocks';
  info: {
    displayName: 'Kh\u1ED1i n\u1ED9i dung rich text / Rich Text Block';
  };
  attributes: {
    content: Attribute.RichText & Attribute.Required;
    title: Attribute.String;
  };
}

export interface SectionsStatsSection extends Schema.Component {
  collectionName: 'components_sections_stats_sections';
  info: {
    displayName: 'Kh\u1ED1i s\u1ED1 li\u1EC7u / Stats Section';
  };
  attributes: {
    items: Attribute.Component<'shared.stat-item', true>;
    positionIndex: Attribute.Integer & Attribute.DefaultTo<700>;
    title: Attribute.String;
  };
}

export interface SectionsTableBlock extends Schema.Component {
  collectionName: 'components_sections_table_blocks';
  info: {
    displayName: 'Kh\u1ED1i b\u1EA3ng / Table Block';
  };
  attributes: {
    column1Label: Attribute.String & Attribute.DefaultTo<'Item'>;
    column2Label: Attribute.String & Attribute.DefaultTo<'Value'>;
    column3Label: Attribute.String;
    column4Label: Attribute.String;
    rows: Attribute.Component<'shared.table-row', true>;
    title: Attribute.String;
  };
}

export interface SectionsTimelineSection extends Schema.Component {
  collectionName: 'components_sections_timeline_sections';
  info: {
    displayName: 'Kh\u1ED1i d\u00F2ng th\u1EDDi gian / Timeline Section';
  };
  attributes: {
    items: Attribute.Component<'shared.timeline-item', true>;
    title: Attribute.String;
  };
}

export interface SectionsTradingSystemShowcaseSection extends Schema.Component {
  collectionName: 'components_sections_trading_system_showcase_sections';
  info: {
    displayName: 'Kh\u1ED1i gi\u1EDBi thi\u1EC7u h\u1EC7 th\u1ED1ng giao d\u1ECBch / Trading System Showcase Section';
  };
  attributes: {
    description: Attribute.Text;
    features: Attribute.JSON;
    platformName: Attribute.String;
    positionIndex: Attribute.Integer & Attribute.DefaultTo<600>;
    screenshot: Attribute.Media<'images'>;
    title: Attribute.String;
  };
}

export interface SectionsTrustSignalSection extends Schema.Component {
  collectionName: 'components_sections_trust_signal_sections';
  info: {
    displayName: 'Kh\u1ED1i t\u00EDn hi\u1EC7u ni\u1EC1m tin / Trust Signal Section';
  };
  attributes: {
    description: Attribute.Text;
    items: Attribute.Component<'shared.trust-item', true>;
    positionIndex: Attribute.Integer & Attribute.DefaultTo<1300>;
    title: Attribute.String;
  };
}

export interface SharedAdvisorCard extends Schema.Component {
  collectionName: 'components_advisor_cards';
  info: {
    description: 'H\u1ED3 s\u01A1 chuy\u00EAn vi\u00EAn t\u01B0 v\u1EA5n hi\u1EC3n th\u1ECB \u1EDF trang d\u1ECBch v\u1EE5 t\u01B0 v\u1EA5n \u0111\u1EA7u t\u01B0 / Advisor profile shown on the investment advisory page';
    displayName: 'H\u1ED3 s\u01A1 t\u01B0 v\u1EA5n vi\u00EAn / Advisor Card';
  };
  attributes: {
    avatar: Attribute.Media<'images'>;
    badge: Attribute.String;
    cert: Attribute.String;
    ctaHref: Attribute.String;
    ctaLabel: Attribute.String;
    experience: Attribute.String;
    name: Attribute.String & Attribute.Required;
    phone: Attribute.String;
    quote: Attribute.Text;
  };
}

export interface SharedBreadcrumbConfig extends Schema.Component {
  collectionName: 'components_shared_breadcrumb_configs';
  info: {
    displayName: 'C\u1EA5u h\u00ECnh breadcrumb / Breadcrumb Config';
  };
  attributes: {
    customLabel: Attribute.String;
    show: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface SharedButtonConfig extends Schema.Component {
  collectionName: 'components_shared_button_configs';
  info: {
    displayName: 'C\u1EA5u h\u00ECnh n\u00FAt';
  };
  attributes: {
    href: Attribute.String & Attribute.Required;
    label: Attribute.String & Attribute.Required;
    target: Attribute.Enumeration<['_self', '_blank']> &
      Attribute.DefaultTo<'_self'>;
    variant: Attribute.Enumeration<['primary', 'secondary', 'ghost']> &
      Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedFeatureItem extends Schema.Component {
  collectionName: 'components_shared_feature_items';
  info: {
    displayName: 'M\u1EE5c t\u00EDnh n\u0103ng';
  };
  attributes: {
    description: Attribute.Text;
    icon: Attribute.Media<'images'>;
    link: Attribute.Component<'shared.link-item'>;
    title: Attribute.String & Attribute.Required;
  };
}

export interface SharedHomeAiCard extends Schema.Component {
  collectionName: 'components_shared_home_ai_cards';
  info: {
    description: 'Th\u1EBB n\u1ED9i dung cho kh\u1ED1i AI/d\u1EEF li\u1EC7u tr\u00EAn trang ch\u1EE7 / Content card for the homepage AI/data block';
    displayName: 'Th\u1EBB AI / AI Card';
  };
  attributes: {
    description: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    value: Attribute.String & Attribute.Required;
  };
}

export interface SharedHomeHighlightItem extends Schema.Component {
  collectionName: 'components_shared_home_highlight_items';
  info: {
    description: 'Th\u1EBB nh\u1EA5n ng\u1EAFn tr\u00EAn kh\u1ED1i One Shinhan / Short highlight card in the One Shinhan section';
    displayName: 'M\u1EE5c nh\u1EA5n trang ch\u1EE7 / Homepage Highlight Item';
  };
  attributes: {
    accentBackgroundColor: Attribute.String;
    accentBorderColor: Attribute.String;
    accentColor: Attribute.String;
    description: Attribute.Text;
    icon: Attribute.Media<'images'>;
    title: Attribute.String & Attribute.Required;
  };
}

export interface SharedHomePartnerItem extends Schema.Component {
  collectionName: 'components_shared_home_partner_items';
  info: {
    description: 'M\u1EE5c \u0111\u1ED1i t\u00E1c trong kh\u1ED1i One Shinhan c\u1EE7a trang ch\u1EE7 / Partner item used in the homepage One Shinhan block';
    displayName: '\u0110\u1ED1i t\u00E1c One Shinhan / One Shinhan Partner';
  };
  attributes: {
    active: Attribute.Boolean & Attribute.DefaultTo<true>;
    alt: Attribute.String;
    href: Attribute.String & Attribute.Required;
    logo: Attribute.Media<'images'>;
    name: Attribute.String & Attribute.Required;
    priority: Attribute.Integer & Attribute.DefaultTo<0>;
    shortDesc: Attribute.Text;
  };
}

export interface SharedLinkItem extends Schema.Component {
  collectionName: 'components_shared_link_items';
  info: {
    description: 'Li\u00EAn k\u1EBFt \u0111i\u1EC1u h\u01B0\u1EDBng ho\u1EB7c n\u00FAt k\u00EAu g\u1ECDi h\u00E0nh \u0111\u1ED9ng / Navigation or CTA link';
    displayName: 'Li\u00EAn k\u1EBFt \u0111i\u1EC1u h\u01B0\u1EDBng / Navigation Link';
  };
  attributes: {
    children: Attribute.Component<'shared.nested-link-item', true>;
    description: Attribute.Text;
    href: Attribute.String & Attribute.Required;
    label: Attribute.String & Attribute.Required;
    target: Attribute.Enumeration<['_self', '_blank']> &
      Attribute.DefaultTo<'_self'>;
  };
}

export interface SharedMediaAssetReference extends Schema.Component {
  collectionName: 'components_shared_media_asset_references';
  info: {
    displayName: 'Tham chi\u1EBFu t\u00E0i nguy\u00EAn media / Media Asset Reference';
  };
  attributes: {
    alt: Attribute.String;
    file: Attribute.Media<'images' | 'files'>;
    title: Attribute.String;
  };
}

export interface SharedNestedLinkItem extends Schema.Component {
  collectionName: 'components_shared_nested_link_items';
  info: {
    description: 'Li\u00EAn k\u1EBFt c\u1EA5p con trong menu \u0111i\u1EC1u h\u01B0\u1EDBng / Child navigation link';
    displayName: 'Li\u00EAn k\u1EBFt con / Nested Link';
  };
  attributes: {
    description: Attribute.Text;
    href: Attribute.String & Attribute.Required;
    label: Attribute.String & Attribute.Required;
    target: Attribute.Enumeration<['_self', '_blank']> &
      Attribute.DefaultTo<'_self'>;
  };
}

export interface SharedSeoMeta extends Schema.Component {
  collectionName: 'components_shared_seo_metas';
  info: {
    description: 'Th\u00F4ng tin t\u1ED1i \u01B0u c\u00F4ng c\u1EE5 t\u00ECm ki\u1EBFm / SEO metadata';
    displayName: 'Si\u00EAu d\u1EEF li\u1EC7u SEO / SEO Meta';
  };
  attributes: {
    canonicalUrl: Attribute.String;
    keywords: Attribute.Text &
      Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    metaDescription: Attribute.Text &
      Attribute.SetMinMaxLength<{
        maxLength: 180;
        minLength: 80;
      }>;
    metaRobots: Attribute.String & Attribute.DefaultTo<'index,follow'>;
    metaTitle: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 70;
        minLength: 20;
      }>;
    ogDescription: Attribute.Text &
      Attribute.SetMinMaxLength<{
        maxLength: 180;
      }>;
    ogImage: Attribute.Media<'images'>;
    ogTitle: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    twitterCard: Attribute.Enumeration<['summary', 'summary_large_image']> &
      Attribute.DefaultTo<'summary_large_image'>;
  };
}

export interface SharedStatItem extends Schema.Component {
  collectionName: 'components_shared_stat_items';
  info: {
    displayName: 'M\u1EE5c s\u1ED1 li\u1EC7u / Stat Item';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    note: Attribute.String;
    value: Attribute.String & Attribute.Required;
  };
}

export interface SharedTableRow extends Schema.Component {
  collectionName: 'components_shared_table_rows';
  info: {
    displayName: 'H\u00E0ng b\u1EA3ng / Table Row';
  };
  attributes: {
    col1: Attribute.String & Attribute.Required;
    col2: Attribute.String;
    col3: Attribute.String;
    col4: Attribute.String;
  };
}

export interface SharedTimelineItem extends Schema.Component {
  collectionName: 'components_shared_timeline_items';
  info: {
    displayName: 'M\u1EE5c d\u00F2ng th\u1EDDi gian / Timeline Item';
  };
  attributes: {
    description: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    year: Attribute.String & Attribute.Required;
  };
}

export interface SharedTrustItem extends Schema.Component {
  collectionName: 'components_shared_trust_items';
  info: {
    displayName: 'M\u1EE5c ni\u1EC1m tin / Trust Item';
  };
  attributes: {
    description: Attribute.Text;
    logo: Attribute.Media<'images'>;
    title: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'sections.contact-section': SectionsContactSection;
      'sections.cta-section': SectionsCtaSection;
      'sections.download-list-section': SectionsDownloadListSection;
      'sections.embed-block': SectionsEmbedBlock;
      'sections.faq-section': SectionsFaqSection;
      'sections.feature-card-section': SectionsFeatureCardSection;
      'sections.hero-block': SectionsHeroBlock;
      'sections.home-ai-stack-section': SectionsHomeAiStackSection;
      'sections.home-ecosystem-section': SectionsHomeEcosystemSection;
      'sections.home-market-strip-section': SectionsHomeMarketStripSection;
      'sections.home-one-shinhan-section': SectionsHomeOneShinhanSection;
      'sections.home-price-board-section': SectionsHomePriceBoardSection;
      'sections.news-list-section': SectionsNewsListSection;
      'sections.office-list-section': SectionsOfficeListSection;
      'sections.quote-section': SectionsQuoteSection;
      'sections.related-content-section': SectionsRelatedContentSection;
      'sections.research-list-section': SectionsResearchListSection;
      'sections.rich-text-block': SectionsRichTextBlock;
      'sections.stats-section': SectionsStatsSection;
      'sections.table-block': SectionsTableBlock;
      'sections.timeline-section': SectionsTimelineSection;
      'sections.trading-system-showcase-section': SectionsTradingSystemShowcaseSection;
      'sections.trust-signal-section': SectionsTrustSignalSection;
      'shared.advisor-card': SharedAdvisorCard;
      'shared.breadcrumb-config': SharedBreadcrumbConfig;
      'shared.button-config': SharedButtonConfig;
      'shared.feature-item': SharedFeatureItem;
      'shared.home-ai-card': SharedHomeAiCard;
      'shared.home-highlight-item': SharedHomeHighlightItem;
      'shared.home-partner-item': SharedHomePartnerItem;
      'shared.link-item': SharedLinkItem;
      'shared.media-asset-reference': SharedMediaAssetReference;
      'shared.nested-link-item': SharedNestedLinkItem;
      'shared.seo-meta': SharedSeoMeta;
      'shared.stat-item': SharedStatItem;
      'shared.table-row': SharedTableRow;
      'shared.timeline-item': SharedTimelineItem;
      'shared.trust-item': SharedTrustItem;
    }
  }
}
