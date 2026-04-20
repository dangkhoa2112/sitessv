import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type CtaSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function CtaSection({ eyebrow, title, description, actions, children, className }: CtaSectionProps) {
  return (
    <Card tone="tinted" className={cn('overflow-hidden rounded-3xl p-5 md:p-7', className)}>
      <div className={cn('grid gap-6 md:gap-7', children ? 'lg:grid-cols-[minmax(0,0.56fr)_minmax(0,0.44fr)] lg:items-start' : undefined)}>
        <div className="max-w-2xl">
          {eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7a5a2f]">{eyebrow}</p> : null}
          <h2 className="mt-2.5 text-[1.6rem] font-semibold leading-[1.16] tracking-tight text-[var(--color-primary)] md:text-[2rem]">{title}</h2>
          {description ? <p className="mt-3 text-[15px] leading-relaxed text-[#3d556d]">{description}</p> : null}
          {actions ? <div className="mt-5 flex flex-wrap gap-2.5">{actions}</div> : null}
        </div>
        {children ? <div className="lg:pl-2">{children}</div> : null}
      </div>
    </Card>
  );
}
