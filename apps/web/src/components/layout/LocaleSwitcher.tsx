'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function LocaleSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();

  const getPath = (targetLocale: string) => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${targetLocale}`;
    if (segments[0] === 'vi' || segments[0] === 'en') {
      segments[0] = targetLocale;
      return `/${segments.join('/')}`;
    }
    return `/${targetLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-300 p-1 text-xs font-semibold">
      <Link
        href={getPath('vi')}
        className={`rounded-full px-2 py-1 transition ${locale === 'vi' ? 'bg-slate-900 text-white' : 'text-slate-700'}`}
        aria-current={locale === 'vi' ? 'page' : undefined}
      >
        VI
      </Link>
      <Link
        href={getPath('en')}
        className={`rounded-full px-2 py-1 transition ${locale === 'en' ? 'bg-slate-900 text-white' : 'text-slate-700'}`}
        aria-current={locale === 'en' ? 'page' : undefined}
      >
        EN
      </Link>
    </div>
  );
}
