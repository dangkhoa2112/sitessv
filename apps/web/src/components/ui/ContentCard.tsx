import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export function ContentCard({
  title,
  href,
  summary,
  imageUrl,
  date,
  category,
  locale
}: {
  title: string;
  href: string;
  summary?: string;
  imageUrl?: string;
  date?: string;
  category?: string;
  locale: string;
}) {
  return (
    <article className="group subpage-glass-card overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[0_22px_38px_-28px_rgba(15,27,85,0.6)]">
      {imageUrl ? (
        <div className="relative h-40 overflow-hidden border-b border-slate-100/80">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </div>
      ) : null}
      <div className="space-y-2.5 p-4">
        <div className="flex flex-wrap gap-1.5 text-xs text-slate-500">
          {category ? <span className="rounded-full border border-[#c8ddee] bg-[#edf5fb] px-2 py-1 font-medium text-slate-700">{category}</span> : null}
          {date ? <time>{formatDate(date, locale === 'vi' ? 'vi-VN' : 'en-US')}</time> : null}
        </div>
        <h3 className="line-clamp-2 text-[1.02rem] font-semibold text-slate-900">
          <Link href={href} className="transition group-hover:text-[var(--color-primary)]">
            {title}
          </Link>
        </h3>
        {summary ? <p className="line-clamp-3 text-sm leading-6 text-slate-600">{summary}</p> : null}
      </div>
    </article>
  );
}
