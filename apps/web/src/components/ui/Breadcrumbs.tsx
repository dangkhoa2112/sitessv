import Link from 'next/link';
import { SITE_URL } from '@/lib/constants';
import { breadcrumbJsonLd } from '@/lib/json-ld';
import { JsonLd } from './JsonLd';

export function Breadcrumbs({
  items
}: {
  items: Array<{
    label: string;
    href: string;
  }>;
}) {
  const jsonLdItems = items.map((item) => ({
    name: item.label,
    url: item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}`
  }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(jsonLdItems)} />
      <nav aria-label="Breadcrumb" className="py-2">
        <ol className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/65 bg-white/78 px-3 py-1.5 text-[13px] text-slate-500 backdrop-blur-sm">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 ? <span aria-hidden="true" className="text-slate-400">/</span> : null}
              {index === items.length - 1 ? (
                <span className="font-semibold text-slate-900">{item.label}</span>
              ) : (
                <Link href={item.href} className="transition hover:text-slate-900">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
