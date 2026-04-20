# CMS Content Model

## Single Types
- `GlobalSetting`: brand, organization, site contacts, social links, default SEO.
- `HeaderNavigation`: localized mega navigation and CTA buttons.
- `FooterNavigation`: localized multi-column links and legal links.
- `Homepage`: hero + dynamic sections + SEO.
- `SeoDefault`: site-wide fallback SEO and organization schema config.
- `ContactPageSetting`: contact page heading, channels, recipient metadata.

## Collection Types
- `Page`
- `Service`, `ServiceCategory`
- `NewsArticle`, `NewsCategory`
- `Event`, `EventCategory`
- `ResearchReport`, `ResearchCategory`
- `FAQItem`, `FAQCategory`
- `CareerJob`
- `OfficeLocation`
- `Announcement`
- `Author`
- `Tag`
- `DownloadableDocument`
- `Banner`

## Reusable Components
- Shared: `SeoMeta`, `LinkItem`, `ButtonConfig`, `MediaAssetReference`, `BreadcrumbConfig`, `FeatureItem`, `StatItem`, `TimelineItem`, `TrustItem`, `TableRow`
- Sections: `HeroBlock`, `RichTextBlock`, `CTASection`, `FeatureCardSection`, `StatsSection`, `FAQSection`, `NewsListSection`, `ResearchListSection`, `TimelineSection`, `QuoteSection`, `ContactSection`, `DownloadListSection`, `OfficeListSection`, `RelatedContentSection`, `EmbedBlock`, `TradingSystemShowcaseSection`, `TrustSignalSection`, `TableBlock`

## Modeling Notes
- Most content types use i18n localization and Draft/Publish.
- SEO component attached per major entity for page-level override.
- Dynamic zones enable block-based editorial assembly for `Homepage` and `Page`.
