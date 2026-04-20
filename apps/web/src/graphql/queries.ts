import { gql } from '@apollo/client';
import {
  BUTTON_FIELDS,
  HOME_SECTION_FIELDS,
  IMAGE_FIELDS,
  LINK_ITEM_FIELDS,
  PAGE_SECTION_FIELDS,
  SEO_FIELDS
} from './fragments';

export const GET_LAYOUT = gql`
  query GetLayout($locale: I18NLocaleCode!) {
    globalSetting(locale: $locale) {
      data {
        attributes {
          siteName
          siteTagline
          siteDescription
          organizationName
          supportHotline
          supportEmail
          address
          logo {
            ...ImageFields
          }
          socialLinks {
            ...LinkItemFields
          }
          defaultSeo {
            ...SeoFields
          }
        }
      }
    }
    headerNavigation(locale: $locale) {
      data {
        attributes {
          items {
            ...LinkItemFields
          }
          primaryButton {
            ...ButtonFields
          }
          secondaryButton {
            ...ButtonFields
          }
        }
      }
    }
    footerNavigation(locale: $locale) {
      data {
        attributes {
          columns {
            ...LinkItemFields
          }
          legalLinks {
            ...LinkItemFields
          }
          copyrightText
        }
      }
    }
    seoDefault(locale: $locale) {
      data {
        attributes {
          siteUrl
          meta {
            ...SeoFields
          }
          defaultOgImage {
            ...ImageFields
          }
          organizationSchema
        }
      }
    }
  }
  ${IMAGE_FIELDS}
  ${LINK_ITEM_FIELDS}
  ${BUTTON_FIELDS}
  ${SEO_FIELDS}
`;

export const GET_HOMEPAGE = gql`
  query GetHomepage($locale: I18NLocaleCode!) {
    homepage(locale: $locale, publicationState: LIVE) {
      data {
        attributes {
          title
          summary
          hero {
            kicker
            title
            subtitle
            backgroundImage {
              ...ImageFields
            }
            primaryButton {
              ...ButtonFields
            }
            secondaryButton {
              ...ButtonFields
            }
          }
          sections {
            ...HomeSectionFields
          }
          seo {
            ...SeoFields
          }
          updatedAt
        }
      }
    }
  }
  ${HOME_SECTION_FIELDS}
  ${IMAGE_FIELDS}
  ${BUTTON_FIELDS}
  ${SEO_FIELDS}
`;

export const GET_BANNERS = gql`
  query GetBanners($locale: I18NLocaleCode!, $placement: String!) {
    banners(
      locale: $locale
      publicationState: LIVE
      sort: ["priority:asc", "createdAt:asc"]
      pagination: { page: 1, pageSize: 12 }
      filters: { placement: { slug: { eq: $placement } }, active: { eq: true } }
    ) {
      data {
        id
        attributes {
          title
          slug
          summary
          priority
          active
          placement {
            data {
              attributes {
                title
                slug
              }
            }
          }
          image {
            ...ImageFields
          }
          mobileImage {
            ...ImageFields
          }
          button {
            ...ButtonFields
          }
        }
      }
    }
  }
  ${IMAGE_FIELDS}
  ${BUTTON_FIELDS}
`;

export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: String!, $locale: I18NLocaleCode!) {
    pages(filters: { slug: { eq: $slug } }, locale: $locale, publicationState: LIVE) {
      data {
        id
        attributes {
          title
          slug
          locale
          summary
          pageType {
            data {
              attributes {
                title
                slug
              }
            }
          }
          coverImage {
            ...ImageFields
          }
          sections {
            ...PageSectionFields
          }
          breadcrumb {
            show
            customLabel
          }
          seo {
            ...SeoFields
          }
          localizations {
            data {
              attributes {
                locale
                slug
              }
            }
          }
          updatedAt
        }
      }
    }
  }
  ${PAGE_SECTION_FIELDS}
  ${IMAGE_FIELDS}
  ${SEO_FIELDS}
`;

const PAGINATION_INFO = `
  meta {
    pagination {
      page
      pageSize
      pageCount
      total
    }
  }
`;

export const GET_SERVICES = gql`
  query GetServices($locale: I18NLocaleCode!, $page: Int!, $pageSize: Int!, $search: String) {
    services(
      locale: $locale
      publicationState: LIVE
      sort: ["publishDate:desc", "createdAt:desc"]
      pagination: { page: $page, pageSize: $pageSize }
      filters: { or: [{ title: { containsi: $search } }, { summary: { containsi: $search } }] }
    ) {
      data {
        id
        attributes {
          title
          slug
          summary
          publishDate
          featured
          coverImage {
            ...ImageFields
          }
          category {
            data {
              attributes {
                title
                slug
              }
            }
          }
          seo {
            ...SeoFields
          }
        }
      }
      ${PAGINATION_INFO}
    }
  }
  ${IMAGE_FIELDS}
  ${SEO_FIELDS}
`;

export const GET_SERVICE_DETAIL = gql`
  query GetServiceDetail($locale: I18NLocaleCode!, $slug: String!) {
    services(filters: { slug: { eq: $slug } }, locale: $locale, publicationState: LIVE) {
      data {
        id
        attributes {
          title
          slug
          locale
          summary
          description
          publishDate
          featured
          coverImage {
            ...ImageFields
          }
          advisorSectionTitle
          advisorSectionDescription
          advisorSectionBackgroundImage {
            ...ImageFields
          }
          advisors {
            name
            quote
            cert
            experience
            phone
            badge
            ctaLabel
            ctaHref
            avatar {
              ...ImageFields
            }
          }
          category {
            data {
              attributes {
                title
                slug
              }
            }
          }
          tags {
            data {
              id
              attributes {
                name
                slug
              }
            }
          }
          documents {
            data {
              id
              attributes {
                title
                slug
                summary
                documentCategory {
                  data {
                    attributes {
                      title
                      slug
                    }
                  }
                }
                document {
                  data {
                    attributes {
                      url
                      alternativeText
                    }
                  }
                }
              }
            }
          }
          seo {
            ...SeoFields
          }
          localizations {
            data {
              attributes {
                locale
                slug
              }
            }
          }
          updatedAt
        }
      }
    }
  }
  ${IMAGE_FIELDS}
  ${SEO_FIELDS}
`;

export const GET_NEWS = gql`
  query GetNews($locale: I18NLocaleCode!, $page: Int!, $pageSize: Int!, $search: String) {
    newsArticles(
      locale: $locale
      publicationState: LIVE
      sort: ["publishDate:desc", "createdAt:desc"]
      pagination: { page: $page, pageSize: $pageSize }
      filters: { or: [{ title: { containsi: $search } }, { summary: { containsi: $search } }] }
    ) {
      data {
        id
        attributes {
          title
          slug
          summary
          publishDate
          featured
          coverImage {
            ...ImageFields
          }
          category {
            data {
              attributes {
                title
                slug
              }
            }
          }
          author {
            data {
              attributes {
                name
                slug
              }
            }
          }
          seo {
            ...SeoFields
          }
        }
      }
      ${PAGINATION_INFO}
    }
  }
  ${IMAGE_FIELDS}
  ${SEO_FIELDS}
`;

export const GET_NEWS_DETAIL = gql`
  query GetNewsDetail($locale: I18NLocaleCode!, $slug: String!) {
    newsArticles(filters: { slug: { eq: $slug } }, locale: $locale, publicationState: LIVE) {
      data {
        id
        attributes {
          title
          slug
          locale
          summary
          content
          publishDate
          featured
          coverImage {
            ...ImageFields
          }
          category {
            data {
              attributes {
                title
                slug
              }
            }
          }
          author {
            data {
              attributes {
                name
                slug
                title
              }
            }
          }
          tags {
            data {
              attributes {
                name
                slug
              }
            }
          }
          seo {
            ...SeoFields
          }
          localizations {
            data {
              attributes {
                locale
                slug
              }
            }
          }
          updatedAt
        }
      }
    }
  }
  ${IMAGE_FIELDS}
  ${SEO_FIELDS}
`;

export const GET_EVENTS = gql`
  query GetEvents($locale: I18NLocaleCode!, $page: Int!, $pageSize: Int!, $search: String) {
    events(
      locale: $locale
      publicationState: LIVE
      sort: ["startDate:asc", "publishDate:desc"]
      pagination: { page: $page, pageSize: $pageSize }
      filters: { or: [{ title: { containsi: $search } }, { summary: { containsi: $search } }] }
    ) {
      data {
        id
        attributes {
          title
          slug
          summary
          publishDate
          startDate
          endDate
          location
          isOnline
          status
          coverImage {
            ...ImageFields
          }
          category {
            data {
              attributes {
                title
                slug
              }
            }
          }
          seo {
            ...SeoFields
          }
        }
      }
      ${PAGINATION_INFO}
    }
  }
  ${IMAGE_FIELDS}
  ${SEO_FIELDS}
`;

export const GET_EVENT_DETAIL = gql`
  query GetEventDetail($locale: I18NLocaleCode!, $slug: String!) {
    events(filters: { slug: { eq: $slug } }, locale: $locale, publicationState: LIVE) {
      data {
        id
        attributes {
          title
          slug
          locale
          summary
          content
          publishDate
          startDate
          endDate
          location
          isOnline
          registrationUrl
          status
          coverImage {
            ...ImageFields
          }
          category {
            data {
              attributes {
                title
                slug
              }
            }
          }
          tags {
            data {
              attributes {
                name
                slug
              }
            }
          }
          seo {
            ...SeoFields
          }
          localizations {
            data {
              attributes {
                locale
                slug
              }
            }
          }
          updatedAt
        }
      }
    }
  }
  ${IMAGE_FIELDS}
  ${SEO_FIELDS}
`;

export const GET_RESEARCH = gql`
  query GetResearch($locale: I18NLocaleCode!, $page: Int!, $pageSize: Int!, $search: String) {
    researchReports(
      locale: $locale
      publicationState: LIVE
      sort: ["publishDate:desc", "createdAt:desc"]
      pagination: { page: $page, pageSize: $pageSize }
      filters: { or: [{ title: { containsi: $search } }, { summary: { containsi: $search } }] }
    ) {
      data {
        id
        attributes {
          title
          slug
          summary
          reportType {
            data {
              attributes {
                title
                slug
              }
            }
          }
          publishDate
          featured
          coverImage {
            ...ImageFields
          }
          category {
            data {
              attributes {
                title
                slug
              }
            }
          }
          author {
            data {
              attributes {
                name
                slug
              }
            }
          }
          seo {
            ...SeoFields
          }
        }
      }
      ${PAGINATION_INFO}
    }
  }
  ${IMAGE_FIELDS}
  ${SEO_FIELDS}
`;

export const GET_RESEARCH_DETAIL = gql`
  query GetResearchDetail($locale: I18NLocaleCode!, $slug: String!) {
    researchReports(filters: { slug: { eq: $slug } }, locale: $locale, publicationState: LIVE) {
      data {
        id
        attributes {
          title
          slug
          locale
          summary
          content
          reportType {
            data {
              attributes {
                title
                slug
              }
            }
          }
          publishDate
          featured
          coverImage {
            ...ImageFields
          }
          category {
            data {
              attributes {
                title
                slug
              }
            }
          }
          author {
            data {
              attributes {
                name
                slug
                title
              }
            }
          }
          tags {
            data {
              attributes {
                name
                slug
              }
            }
          }
          documents {
            data {
              id
              attributes {
                title
                slug
                summary
                documentCategory {
                  data {
                    attributes {
                      title
                      slug
                    }
                  }
                }
                document {
                  data {
                    attributes {
                      url
                      alternativeText
                    }
                  }
                }
              }
            }
          }
          seo {
            ...SeoFields
          }
          localizations {
            data {
              attributes {
                locale
                slug
              }
            }
          }
          updatedAt
        }
      }
    }
  }
  ${IMAGE_FIELDS}
  ${SEO_FIELDS}
`;

export const GET_FAQS = gql`
  query GetFaqs($locale: I18NLocaleCode!) {
    faqCategories(locale: $locale, publicationState: LIVE, sort: ["sortOrder:asc"]) {
      data {
        id
        attributes {
          title
          slug
          summary
          items(sort: ["sortOrder:asc"]) {
            data {
              id
              attributes {
                question
                slug
                answer
                featured
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_CAREERS = gql`
  query GetCareers($locale: I18NLocaleCode!, $page: Int!, $pageSize: Int!, $search: String) {
    careerJobs(
      locale: $locale
      publicationState: LIVE
      sort: ["publishDate:desc"]
      pagination: { page: $page, pageSize: $pageSize }
      filters: { or: [{ title: { containsi: $search } }, { summary: { containsi: $search } }] }
    ) {
      data {
        id
        attributes {
          title
          slug
          summary
          department
          location
          employmentType {
            data {
              attributes {
                title
                slug
              }
            }
          }
          salaryRange
          applicationDeadline
          status
          publishDate
          featured
          seo {
            ...SeoFields
          }
        }
      }
      ${PAGINATION_INFO}
    }
  }
  ${SEO_FIELDS}
`;

export const GET_CAREER_DETAIL = gql`
  query GetCareerDetail($locale: I18NLocaleCode!, $slug: String!) {
    careerJobs(filters: { slug: { eq: $slug } }, locale: $locale, publicationState: LIVE) {
      data {
        id
        attributes {
          title
          slug
          locale
          summary
          description
          department
          location
          employmentType {
            data {
              attributes {
                title
                slug
              }
            }
          }
          salaryRange
          applicationDeadline
          status
          publishDate
          applyUrl
          seo {
            ...SeoFields
          }
          localizations {
            data {
              attributes {
                locale
                slug
              }
            }
          }
          updatedAt
        }
      }
    }
  }
  ${SEO_FIELDS}
`;

export const GET_OFFICES = gql`
  query GetOffices($locale: I18NLocaleCode!) {
    officeLocations(locale: $locale, publicationState: LIVE, sort: ["sortOrder:asc"]) {
      data {
        id
        attributes {
          name
          slug
          address
          city
          phone
          email
          officeType {
            data {
              attributes {
                title
                slug
              }
            }
          }
          workingHours
          mapUrl
          featured
        }
      }
    }
  }
`;

export const GET_CONTACT_PAGE = gql`
  query GetContactPage($locale: I18NLocaleCode!) {
    contactPageSetting(locale: $locale, publicationState: LIVE) {
      data {
        attributes {
          title
          summary
          recipientEmail
          mapEmbedUrl
          supportChannels {
            ...LinkItemFields
          }
          seo {
            ...SeoFields
          }
          updatedAt
        }
      }
    }
  }
  ${LINK_ITEM_FIELDS}
  ${SEO_FIELDS}
`;

export const GET_SITEMAP_SOURCE = gql`
  query GetSitemapSource($locale: I18NLocaleCode!) {
    pages(locale: $locale, publicationState: LIVE, pagination: { page: 1, pageSize: 200 }) {
      data {
        attributes {
          slug
          pageType {
            data {
              attributes {
                slug
              }
            }
          }
          updatedAt
        }
      }
    }
    services(locale: $locale, publicationState: LIVE, pagination: { page: 1, pageSize: 200 }) {
      data {
        attributes {
          slug
          updatedAt
        }
      }
    }
    newsArticles(locale: $locale, publicationState: LIVE, pagination: { page: 1, pageSize: 200 }) {
      data {
        attributes {
          slug
          updatedAt
        }
      }
    }
    events(locale: $locale, publicationState: LIVE, pagination: { page: 1, pageSize: 200 }) {
      data {
        attributes {
          slug
          updatedAt
        }
      }
    }
    researchReports(locale: $locale, publicationState: LIVE, pagination: { page: 1, pageSize: 200 }) {
      data {
        attributes {
          slug
          updatedAt
        }
      }
    }
    careerJobs(locale: $locale, publicationState: LIVE, pagination: { page: 1, pageSize: 200 }) {
      data {
        attributes {
          slug
          updatedAt
        }
      }
    }
  }
`;

export const GET_RELATED_CONTENT = gql`
  query GetRelatedContent($locale: I18NLocaleCode!, $limit: Int!) {
    newsArticles(locale: $locale, publicationState: LIVE, sort: ["publishDate:desc"], pagination: { page: 1, pageSize: $limit }) {
      data {
        attributes {
          title
          slug
          summary
          publishDate
        }
      }
    }
    researchReports(locale: $locale, publicationState: LIVE, sort: ["publishDate:desc"], pagination: { page: 1, pageSize: $limit }) {
      data {
        attributes {
          title
          slug
          summary
          publishDate
        }
      }
    }
  }
`;
