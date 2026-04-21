import { SITE_NAME, SITE_URL } from './constants';
import { absoluteUrl, assetUrl } from './urls';

function stripHtml(value?: string) {
  return value?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function organizationJsonLd(locale: string, data?: Record<string, any>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: data?.logo?.data?.attributes?.url ? absoluteUrl(assetUrl(data.logo.data.attributes.url) || data.logo.data.attributes.url) : undefined,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: locale === 'vi' ? 'Hỗ trợ khách hàng' : 'Customer support',
        telephone: data?.supportHotline,
        email: data?.supportEmail
      }
    ],
    address: data?.address
  };
}

export function websiteJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/${locale}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function webPageJsonLd(input: {
  name: string;
  description?: string;
  url: string;
  inLanguage?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.name,
    description: stripHtml(input.description),
    url: input.url,
    inLanguage: input.inLanguage
  };
}

export function articleJsonLd(input: {
  headline: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: input.authorName
      ? {
          '@type': 'Person',
          name: input.authorName
        }
      : undefined,
    image: input.imageUrl,
    mainEntityOfPage: input.url
  };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripHtml(item.answer)
      }
    }))
  };
}

export function serviceJsonLd(input: {
  name: string;
  description?: string;
  url: string;
  providerName?: string;
  imageUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: stripHtml(input.description),
    url: input.url,
    provider: input.providerName
      ? {
          '@type': 'Organization',
          name: input.providerName
        }
      : undefined,
    image: input.imageUrl
  };
}

export function eventJsonLd(input: {
  name: string;
  description?: string;
  url: string;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
  locationName?: string;
  locationAddress?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: input.name,
    description: stripHtml(input.description),
    url: input.url,
    startDate: input.startDate,
    endDate: input.endDate,
    image: input.imageUrl,
    location: input.locationName || input.locationAddress
      ? {
          '@type': 'Place',
          name: input.locationName,
          address: input.locationAddress
        }
      : undefined
  };
}

export function jobPostingJsonLd(input: {
  title: string;
  description?: string;
  url: string;
  datePosted?: string;
  validThrough?: string;
  employmentType?: string;
  hiringOrganizationName?: string;
  jobLocation?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: input.title,
    description: stripHtml(input.description),
    url: input.url,
    datePosted: input.datePosted,
    validThrough: input.validThrough,
    employmentType: input.employmentType,
    hiringOrganization: input.hiringOrganizationName
      ? {
          '@type': 'Organization',
          name: input.hiringOrganizationName
        }
      : undefined,
    jobLocation: input.jobLocation
      ? {
          '@type': 'Place',
          address: input.jobLocation
        }
      : undefined
  };
}
