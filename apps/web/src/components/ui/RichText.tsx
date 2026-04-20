import { sanitizeRichText } from '@/lib/rich-text';

export function RichText({ html }: { html?: string | null }) {
  if (!html) return null;

  return (
    <div
      className="rich-text max-w-none leading-7"
      dangerouslySetInnerHTML={{
        __html: sanitizeRichText(html)
      }}
    />
  );
}
