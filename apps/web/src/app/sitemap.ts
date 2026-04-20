import type { MetadataRoute } from 'next';
import { LOCALES, SITE_URL } from '@/lib/constants';
import { getSitemapSource } from '@/lib/cms-api';
import { localizePathWithoutLocale } from '@/lib/localized-routes';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ['', '/about', '/services', '/news', '/events', '/research', '/faq', '/careers', '/contact', '/support', '/sitemap'];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of staticPaths) {
      const localizedPath = locale === 'vi' ? localizePathWithoutLocale(path || '/', 'vi') : path || '';
      entries.push({
        url: `${SITE_URL}/${locale}${localizedPath === '/' ? '' : localizedPath}`,
        changeFrequency: 'daily',
        priority: path === '' ? 1 : 0.7
      });
    }

    const source = await getSitemapSource(locale);

    for (const page of source?.pages?.data || []) {
      const slug = page?.attributes?.slug;
      const pageType = page?.attributes?.pageType?.data?.attributes?.slug;
      if (!slug || slug === 'about' || slug === 'support') continue;
      const path = pageType === 'legal' ? `/legal/${slug}` : `/${slug}`;
      const localizedPath = locale === 'vi' ? localizePathWithoutLocale(path, 'vi') : path;
      entries.push({
        url: `${SITE_URL}/${locale}${localizedPath}`,
        lastModified: page?.attributes?.updatedAt
      });
    }

    for (const service of source?.services?.data || []) {
      const path = `/services/${service?.attributes?.slug}`;
      const localizedPath = locale === 'vi' ? localizePathWithoutLocale(path, 'vi') : path;
      entries.push({
        url: `${SITE_URL}/${locale}${localizedPath}`,
        lastModified: service?.attributes?.updatedAt
      });
    }

    for (const news of source?.newsArticles?.data || []) {
      const path = `/news/${news?.attributes?.slug}`;
      const localizedPath = locale === 'vi' ? localizePathWithoutLocale(path, 'vi') : path;
      entries.push({
        url: `${SITE_URL}/${locale}${localizedPath}`,
        lastModified: news?.attributes?.updatedAt
      });
    }

    for (const event of source?.events?.data || []) {
      const path = `/events/${event?.attributes?.slug}`;
      const localizedPath = locale === 'vi' ? localizePathWithoutLocale(path, 'vi') : path;
      entries.push({
        url: `${SITE_URL}/${locale}${localizedPath}`,
        lastModified: event?.attributes?.updatedAt
      });
    }

    for (const report of source?.researchReports?.data || []) {
      const path = `/research/${report?.attributes?.slug}`;
      const localizedPath = locale === 'vi' ? localizePathWithoutLocale(path, 'vi') : path;
      entries.push({
        url: `${SITE_URL}/${locale}${localizedPath}`,
        lastModified: report?.attributes?.updatedAt
      });
    }

    for (const job of source?.careerJobs?.data || []) {
      const path = `/careers/${job?.attributes?.slug}`;
      const localizedPath = locale === 'vi' ? localizePathWithoutLocale(path, 'vi') : path;
      entries.push({
        url: `${SITE_URL}/${locale}${localizedPath}`,
        lastModified: job?.attributes?.updatedAt
      });
    }
  }

  return entries;
}
