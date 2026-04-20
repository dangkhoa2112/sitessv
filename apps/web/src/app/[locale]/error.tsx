'use client';

export default function LocaleError({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Unexpected Error</h1>
      <p className="mt-3 text-sm text-slate-600">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-5 rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </div>
  );
}
