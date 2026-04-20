import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-primary)]">404</p>
      <h1 className="mt-3 text-4xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">The page may have moved or no longer exists.</p>
      <Link href="/vi" className="mt-6 rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-white">
        Go home
      </Link>
    </main>
  );
}
