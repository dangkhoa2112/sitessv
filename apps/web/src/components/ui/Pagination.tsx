import Link from 'next/link';

export function Pagination({
  page,
  pageCount,
  basePath,
  query,
  previousLabel = 'Prev',
  nextLabel = 'Next'
}: {
  page: number;
  pageCount: number;
  basePath: string;
  query?: string;
  previousLabel?: string;
  nextLabel?: string;
}) {
  if (pageCount <= 1) return null;

  const buildHref = (nextPage: number) => {
    const params = new URLSearchParams();
    params.set('page', String(nextPage));
    if (query) params.set('q', query);
    return `${basePath}?${params.toString()}`;
  };

  return (
    <nav className="mt-6 flex items-center justify-center gap-2.5" aria-label="Pagination">
      {page > 1 ? (
        <Link href={buildHref(page - 1)} className="rounded-xl border border-[#bfd7e9] bg-white/85 px-3 py-1.5 text-sm text-slate-700 hover:bg-[#eef5fb]">
          {previousLabel}
        </Link>
      ) : (
        <span aria-disabled="true" className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm text-slate-300">
          {previousLabel}
        </span>
      )}
      <span className="rounded-xl border border-white/65 bg-white/85 px-3 py-1.5 text-sm font-medium text-slate-700">
        {page} / {pageCount}
      </span>
      {page < pageCount ? (
        <Link href={buildHref(page + 1)} className="rounded-xl border border-[#bfd7e9] bg-white/85 px-3 py-1.5 text-sm text-slate-700 hover:bg-[#eef5fb]">
          {nextLabel}
        </Link>
      ) : (
        <span aria-disabled="true" className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm text-slate-300">
          {nextLabel}
        </span>
      )}
    </nav>
  );
}
