import { gql } from '@apollo/client';

export const IMAGE_FIELDS = gql`
  fragment ImageFields on UploadFileEntityResponse {
    data {
      attributes {
        url
        alternativeText
        width
        height
      }
    }
  }
`;

export const SEO_FIELDS = gql`
  fragment SeoFields on ComponentSharedSeoMeta {
    metaTitle
    metaDescription
    keywords
    canonicalUrl
    metaRobots
    ogTitle
    ogDescription
    twitterCard
    ogImage {
      ...ImageFields
    }
  }
  ${IMAGE_FIELDS}
`;

export const LINK_ITEM_FIELDS = gql`
  fragment LinkItemFields on ComponentSharedLinkItem {
    label
    href
    target
    description
    children {
      label
      href
      target
      description
    }
  }
`;

export const BUTTON_FIELDS = gql`
  fragment ButtonFields on ComponentSharedButtonConfig {
    label
    href
    variant
    target
  }
`;

export const HOME_SECTION_FIELDS = gql`
  fragment HomeSectionFields on HomepageSectionsDynamicZone {
    __typename
    ... on ComponentSectionsHomeOneShinhanSection {
      kicker
      profileLabel
      title
      subtitle
      logo {
        ...ImageFields
      }
      logoAlt
      visitLabel
      carouselLabel
      ecosystemLabel
      officeCountLabel
      officeLocationPrimary
      officeLocationSecondary
      footerTitle
      footerDescription
      highlights {
        icon {
          ...ImageFields
        }
        accentColor
        accentBackgroundColor
        accentBorderColor
        title
        description
      }
      partners {
        name
        shortDesc
        href
        alt
        priority
        active
        logo {
          ...ImageFields
        }
      }
    }
    ... on ComponentSectionsHomeAiStackSection {
      eyebrow
      title
      cards {
        title
        description
        value
      }
    }
    ... on ComponentSectionsHomeEcosystemSection {
      eyebrow
      title
      description
      primaryButton {
        ...ButtonFields
      }
      secondaryButton {
        ...ButtonFields
      }
      marketLabel
      quickLinks {
        ...LinkItemFields
      }
      shortcutLinks {
        ...LinkItemFields
      }
    }
    ... on ComponentSectionsFeatureCardSection {
      featureTitle: title
      description
      items {
        title
        description
        link {
          ...LinkItemFields
        }
      }
    }
    ... on ComponentSectionsTradingSystemShowcaseSection {
      tradingTitle: title
      description
      platformName
      features
      screenshot {
        ...ImageFields
      }
    }
    ... on ComponentSectionsResearchListSection {
      researchTitle: title
      description
      limit
      featuredOnly
    }
    ... on ComponentSectionsNewsListSection {
      newsTitle: title
      description
      limit
      featuredOnly
    }
    ... on ComponentSectionsFaqSection {
      faqTitle: title
      description
      faqCategorySlug
      limit
    }
    ... on ComponentSectionsCtaSection {
      ctaTitle: title
      description
      primaryButton {
        ...ButtonFields
      }
      secondaryButton {
        ...ButtonFields
      }
    }
    ... on ComponentSectionsOfficeListSection {
      officeTitle: title
      description
      showMapPlaceholder
    }
    ... on ComponentSectionsTrustSignalSection {
      trustTitle: title
      description
      items {
        title
        description
        logo {
          ...ImageFields
        }
      }
    }
    ... on ComponentSectionsStatsSection {
      statsTitle: title
      items {
        label
        value
        note
      }
    }
  }
  ${BUTTON_FIELDS}
  ${LINK_ITEM_FIELDS}
  ${IMAGE_FIELDS}
`;

export const PAGE_SECTION_FIELDS = gql`
  fragment PageSectionFields on PageSectionsDynamicZone {
    __typename
    ... on ComponentSectionsHeroBlock {
      kicker
      heroTitle: title
      subtitle
      primaryButton {
        ...ButtonFields
      }
      secondaryButton {
        ...ButtonFields
      }
      backgroundImage {
        ...ImageFields
      }
    }
    ... on ComponentSectionsRichTextBlock {
      richTitle: title
      content
    }
    ... on ComponentSectionsFeatureCardSection {
      featureTitle: title
      description
      items {
        title
        description
        link {
          ...LinkItemFields
        }
      }
    }
    ... on ComponentSectionsStatsSection {
      statsTitle: title
      items {
        label
        value
        note
      }
    }
    ... on ComponentSectionsTimelineSection {
      timelineTitle: title
      items {
        year
        title
        description
      }
    }
    ... on ComponentSectionsQuoteSection {
      quote
      author
      role
    }
    ... on ComponentSectionsCtaSection {
      ctaTitle: title
      description
      primaryButton {
        ...ButtonFields
      }
      secondaryButton {
        ...ButtonFields
      }
    }
    ... on ComponentSectionsContactSection {
      contactTitle: title
      description
      phone
      email
      address
    }
    ... on ComponentSectionsDownloadListSection {
      downloadTitle: title
      description
      documentCategory
      limit
    }
    ... on ComponentSectionsTableBlock {
      tableTitle: title
      column1Label
      column2Label
      column3Label
      column4Label
      rows {
        col1
        col2
        col3
        col4
      }
    }
    ... on ComponentSectionsEmbedBlock {
      embedTitle: title
      embedUrl
      embedCode
    }
    ... on ComponentSectionsOfficeListSection {
      officeTitle: title
      description
      showMapPlaceholder
    }
    ... on ComponentSectionsRelatedContentSection {
      relatedTitle: title
      contentType {
        data {
          attributes {
            title
            slug
          }
        }
      }
      limit
    }
  }
  ${BUTTON_FIELDS}
  ${LINK_ITEM_FIELDS}
  ${IMAGE_FIELDS}
`;
