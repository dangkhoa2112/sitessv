function normalizeOrigin(value: string) {
  const trimmed = value.trim();

  try {
    return new URL(trimmed).origin;
  } catch {
    return trimmed;
  }
}

function parseOrigins(value: string | undefined, fallback: string[]) {
  const configured = value
    ?.split(',')
    .map((item) => normalizeOrigin(item))
    .filter(Boolean);

  return [...new Set([...fallback.map((item) => normalizeOrigin(item)), ...(configured || [])])];
}

export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          'connect-src': ["'self'", 'https:']
        }
      }
    }
  },
  {
    name: 'strapi::cors',
    config: {
      origin: parseOrigins(env('CORS_ORIGINS'), [
        env('PUBLIC_URL', 'http://localhost:1337'),
        env('WEB_URL', 'http://localhost:3000'),
        'http://localhost:3000',
        'http://127.0.0.1:3000'
      ]),
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      credentials: true
    }
  },
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public'
];
