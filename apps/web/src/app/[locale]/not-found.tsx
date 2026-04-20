import Link from 'next/link';

export default function LocaleNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-primary)]">404</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">Content not found</h1>
      <p className="mt-2 text-slate-600">The requested content may have been removed or unpublished.</p>
      <Link href="/vi" className="mt-6 rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-white">
        Return home
      </Link>
    </div>
  );
}
