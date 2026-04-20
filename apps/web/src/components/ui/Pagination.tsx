import Link from 'next/link';

export function Pagination({
  page,
  pageCount,
  basePath,
  query
}: {
  page: number;
  pageCount: number;
  basePath: string;
  query?: string;
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
      <Link
        href={page > 1 ? buildHref(page - 1) : '#'}
        className={`rounded-xl border px-3 py-1.5 text-sm ${page > 1 ? 'border-[#bfd7e9] bg-white/85 text-slate-700 hover:bg-[#eef5fb]' : 'pointer-events-none border-slate-200 text-slate-300'}`}
      >
        Prev
      </Link>
      <span className="rounded-xl border border-white/65 bg-white/85 px-3 py-1.5 text-sm font-medium text-slate-700">
        {page} / {pageCount}
      </span>
      <Link
        href={page < pageCount ? buildHref(page + 1) : '#'}
        className={`rounded-xl border px-3 py-1.5 text-sm ${page < pageCount ? 'border-[#bfd7e9] bg-white/85 text-slate-700 hover:bg-[#eef5fb]' : 'pointer-events-none border-slate-200 text-slate-300'}`}
      >
        Next
      </Link>
    </nav>
  );
}
