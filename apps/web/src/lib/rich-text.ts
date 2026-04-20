import sanitizeHtml from 'sanitize-html';

export function sanitizeRichText(input?: string | null) {
  if (!input) return '';

  return sanitizeHtml(input, {
    allowedTags: [
      'p',
      'strong',
      'em',
      'ul',
      'ol',
      'li',
      'a',
      'h2',
      'h3',
      'h4',
      'blockquote',
      'br',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td'
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel']
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', {
        rel: 'noopener noreferrer'
      })
    }
  });
}
