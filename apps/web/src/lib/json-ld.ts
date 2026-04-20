import { SITE_NAME, SITE_URL } from './constants';
import { absoluteUrl, assetUrl } from './urls';

export function organizationJsonLd(locale: string, data?: Record<string, any>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data?.organizationName || SITE_NAME,
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
        text: item.answer
      }
    }))
  };
}
