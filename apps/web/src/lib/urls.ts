import { SITE_URL, STRAPI_URL } from './constants';

export function absoluteUrl(path: string, baseUrl = SITE_URL) {
  return new URL(path, baseUrl).toString();
}

export function assetUrl(path?: string | null, baseUrl = STRAPI_URL) {
  if (!path) return undefined;

  try {
    const resolved = new URL(path, baseUrl);
    const base = new URL(baseUrl);

    if (resolved.origin === base.origin) {
      return `${resolved.pathname}${resolved.search}${resolved.hash}`;
    }

    return resolved.toString();
  } catch {
    return path;
  }
}
