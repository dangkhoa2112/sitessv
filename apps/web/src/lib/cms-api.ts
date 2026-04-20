import {
  GET_CAREERS,
  GET_CAREER_DETAIL,
  GET_BANNERS,
  GET_CONTACT_PAGE,
  GET_EVENT_DETAIL,
  GET_EVENTS,
  GET_FAQS,
  GET_HOMEPAGE,
  GET_LAYOUT,
  GET_NEWS,
  GET_NEWS_DETAIL,
  GET_OFFICES,
  GET_PAGE_BY_SLUG,
  GET_RELATED_CONTENT,
  GET_RESEARCH,
  GET_RESEARCH_DETAIL,
  GET_SERVICE_DETAIL,
  GET_SERVICES,
  GET_SITEMAP_SOURCE
} from '@/graphql/queries';
import { cmsQuery } from './apollo';
import { REVALIDATE_TIME } from './constants';

type ListingInput = {
  locale: string;
  page?: number;
  pageSize?: number;
  search?: string;
};

export async function getLayout(locale: string) {
  const data = await cmsQuery<any>(GET_LAYOUT, { locale }, REVALIDATE_TIME);
  return {
    global: data?.globalSetting?.data?.attributes,
    header: data?.headerNavigation?.data?.attributes,
    footer: data?.footerNavigation?.data?.attributes,
    seoDefault: data?.seoDefault?.data?.attributes
  };
}

export async function getHomepage(locale: string) {
  const data = await cmsQuery<any>(GET_HOMEPAGE, { locale }, REVALIDATE_TIME);
  return data?.homepage?.data?.attributes ?? null;
}

export async function getHomepageBanners(locale: string, placement = 'home_hero') {
  const data = await cmsQuery<any>(GET_BANNERS, { locale, placement }, REVALIDATE_TIME);
  const banners = data?.banners?.data ?? [];
  return [...banners].sort((a: any, b: any) => {
    const priorityA = a?.attributes?.priority ?? 0;
    const priorityB = b?.attributes?.priority ?? 0;
    if (priorityA !== priorityB) return priorityA - priorityB;
    const createdA = new Date(a?.attributes?.createdAt || 0).getTime();
    const createdB = new Date(b?.attributes?.createdAt || 0).getTime();
    return createdA - createdB;
  });
}

export async function getPageBySlug(locale: string, slug: string) {
  const data = await cmsQuery<any>(GET_PAGE_BY_SLUG, { locale, slug }, REVALIDATE_TIME);
  return data?.pages?.data?.[0]?.attributes ?? null;
}

export async function listServices({ locale, page = 1, pageSize = 9, search = '' }: ListingInput) {
  const data = await cmsQuery<any>(GET_SERVICES, { locale, page, pageSize, search }, REVALIDATE_TIME);
  return {
    items: data?.services?.data ?? [],
    pagination: data?.services?.meta?.pagination
  };
}

export async function getServiceBySlug(locale: string, slug: string) {
  const data = await cmsQuery<any>(GET_SERVICE_DETAIL, { locale, slug }, REVALIDATE_TIME);
  return data?.services?.data?.[0]?.attributes ?? null;
}

export async function listNews({ locale, page = 1, pageSize = 9, search = '' }: ListingInput) {
  const data = await cmsQuery<any>(GET_NEWS, { locale, page, pageSize, search }, REVALIDATE_TIME);
  return {
    items: data?.newsArticles?.data ?? [],
    pagination: data?.newsArticles?.meta?.pagination
  };
}

export async function getNewsBySlug(locale: string, slug: string) {
  const data = await cmsQuery<any>(GET_NEWS_DETAIL, { locale, slug }, REVALIDATE_TIME);
  return data?.newsArticles?.data?.[0]?.attributes ?? null;
}

export async function listEvents({ locale, page = 1, pageSize = 9, search = '' }: ListingInput) {
  const data = await cmsQuery<any>(GET_EVENTS, { locale, page, pageSize, search }, REVALIDATE_TIME);
  return {
    items: data?.events?.data ?? [],
    pagination: data?.events?.meta?.pagination
  };
}

export async function getEventBySlug(locale: string, slug: string) {
  const data = await cmsQuery<any>(GET_EVENT_DETAIL, { locale, slug }, REVALIDATE_TIME);
  return data?.events?.data?.[0]?.attributes ?? null;
}

export async function listResearch({ locale, page = 1, pageSize = 9, search = '' }: ListingInput) {
  const data = await cmsQuery<any>(GET_RESEARCH, { locale, page, pageSize, search }, REVALIDATE_TIME);
  return {
    items: data?.researchReports?.data ?? [],
    pagination: data?.researchReports?.meta?.pagination
  };
}

export async function getResearchBySlug(locale: string, slug: string) {
  const data = await cmsQuery<any>(GET_RESEARCH_DETAIL, { locale, slug }, REVALIDATE_TIME);
  return data?.researchReports?.data?.[0]?.attributes ?? null;
}

export async function listFaqs(locale: string) {
  const data = await cmsQuery<any>(GET_FAQS, { locale }, REVALIDATE_TIME);
  return data?.faqCategories?.data ?? [];
}

export async function listCareers({ locale, page = 1, pageSize = 9, search = '' }: ListingInput) {
  const data = await cmsQuery<any>(GET_CAREERS, { locale, page, pageSize, search }, REVALIDATE_TIME);
  return {
    items: data?.careerJobs?.data ?? [],
    pagination: data?.careerJobs?.meta?.pagination
  };
}

export async function getCareerBySlug(locale: string, slug: string) {
  const data = await cmsQuery<any>(GET_CAREER_DETAIL, { locale, slug }, REVALIDATE_TIME);
  return data?.careerJobs?.data?.[0]?.attributes ?? null;
}

export async function listOffices(locale: string) {
  const data = await cmsQuery<any>(GET_OFFICES, { locale }, REVALIDATE_TIME);
  return data?.officeLocations?.data ?? [];
}

export async function getContactPage(locale: string) {
  const data = await cmsQuery<any>(GET_CONTACT_PAGE, { locale }, REVALIDATE_TIME);
  return data?.contactPageSetting?.data?.attributes ?? null;
}

export async function getRelatedContent(locale: string, limit = 3) {
  const data = await cmsQuery<any>(GET_RELATED_CONTENT, { locale, limit }, REVALIDATE_TIME);
  return {
    news: data?.newsArticles?.data ?? [],
    research: data?.researchReports?.data ?? []
  };
}

export async function getSitemapSource(locale: string) {
  const data = await cmsQuery<any>(GET_SITEMAP_SOURCE, { locale }, REVALIDATE_TIME);
  return data;
}
