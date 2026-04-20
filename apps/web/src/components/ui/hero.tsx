import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type HeroProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  meta?: ReactNode;
  className?: string;
};

export function Hero({ kicker, title, subtitle, actions, meta, className }: HeroProps) {
  return (
    <div className={cn('rounded-3xl border border-white/26 bg-[#0b2a61]/40 p-5 text-white backdrop-blur-xl md:p-7', className)}>
      {kicker ? <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#f1d6aa]">{kicker}</p> : null}
      <h1 className="mt-3 max-w-2xl text-[2rem] font-semibold leading-[1.06] tracking-tight md:text-[2.55rem]">{title}</h1>
      {subtitle ? <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/88 md:text-[16px]">{subtitle}</p> : null}
      {meta ? <div className="mt-4 flex flex-wrap gap-2">{meta}</div> : null}
      {actions ? <div className="mt-5 flex flex-wrap gap-2.5">{actions}</div> : null}
    </div>
  );
}
