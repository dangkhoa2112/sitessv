import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const viSeoRoutes = [
  ['about', 'gioi-thieu'],
  ['services', 'san-pham-dich-vu'],
  ['support', 'ho-tro-khach-hang'],
  ['contact', 'lien-he'],
  ['careers', 'nghe-nghiep'],
  ['news', 'tin-tuc'],
  ['events', 'su-kien'],
  ['faq', 'cau-hoi-thuong-gap'],
  ['search', 'tim-kiem'],
  ['sitemap', 'so-do-trang'],
  ['legal', 'phap-ly']
] as const;

function parseUrl(input?: string | null) {
  if (!input) return null;

  try {
    return new URL(input);
  } catch {
    return null;
  }
}

function buildRemotePatterns() {
  const fallbackOrigins = ['http://localhost:1337', 'http://127.0.0.1:1337'];
  const configuredOrigins = [
    process.env.NEXT_PUBLIC_STRAPI_URL,
    process.env.NEXT_PUBLIC_STRAPI_ASSET_URL,
    process.env.NEXT_PUBLIC_CDN_URL,
    process.env.ASSET_CDN_URL,
    process.env.STRAPI_PUBLIC_URL,
    process.env.PUBLIC_URL,
    ...fallbackOrigins
  ];

  const uniquePatterns = new Map<string, { protocol: 'http' | 'https'; hostname: string; port?: string; pathname: string }>();

  for (const origin of configuredOrigins) {
    const parsed = parseUrl(origin);
    if (!parsed) continue;

    const protocol = parsed.protocol === 'http:' ? 'http' : 'https';
    const key = `${protocol}://${parsed.hostname}:${parsed.port || ''}/uploads/**`;

    uniquePatterns.set(key, {
      protocol,
      hostname: parsed.hostname,
      port: parsed.port || undefined,
      pathname: '/uploads/**'
    });
  }

  return [...uniquePatterns.values()];
}

function buildSecurityHeaders() {
  const headers = [
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff'
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin'
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=()'
    },
    {
      key: 'X-Frame-Options',
      value: 'SAMEORIGIN'
    }
  ];

  if (process.env.NODE_ENV === 'production') {
    headers.push({
      key: 'Strict-Transport-Security',
      value: 'max-age=31536000; includeSubDomains'
    });
  }

  return headers;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: buildRemotePatterns()
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: buildSecurityHeaders()
      }
    ];
  },
  async redirects() {
    return viSeoRoutes.flatMap(([legacy, localized]) => [
      {
        source: `/vi/${legacy}`,
        destination: `/vi/${localized}`,
        permanent: true
      },
      {
        source: `/vi/${legacy}/:path*`,
        destination: `/vi/${localized}/:path*`,
        permanent: true
      }
    ]);
  },
  async rewrites() {
    const strapiOrigin = parseUrl(process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_PUBLIC_URL || 'http://localhost:1337')?.origin || 'http://localhost:1337';

    return [
      {
        source: '/uploads/:path*',
        destination: `${strapiOrigin}/uploads/:path*`
      },
      ...viSeoRoutes.flatMap(([legacy, localized]) => [
        {
          source: `/vi/${localized}`,
          destination: `/vi/${legacy}`
        },
        {
          source: `/vi/${localized}/:path*`,
          destination: `/vi/${legacy}/:path*`
        }
      ])
    ];
  }
};

export default withNextIntl(nextConfig);
