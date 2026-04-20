export type StrapiEntity<T> = {
  id: number;
  attributes: T;
};

export type StrapiImage = {
  data?: {
    attributes?: {
      url: string;
      alternativeText?: string | null;
      width?: number;
      height?: number;
    };
  } | null;
};

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type SeoMeta = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  metaRobots?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  twitterCard?: string | null;
  ogImage?: StrapiImage;
};
