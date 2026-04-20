import Link from 'next/link';

export function DownloadCard({
  title,
  summary,
  href
}: {
  title: string;
  summary?: string;
  href?: string;
}) {
  return (
    <article className="subpage-glass-card p-4">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      {summary ? <p className="mt-1.5 text-sm text-slate-600">{summary}</p> : null}
      {href ? (
        <Link href={href} className="mt-2.5 inline-flex text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-strong)]">
          Download
        </Link>
      ) : null}
    </article>
  );
}
