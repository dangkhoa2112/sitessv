import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type CardTone = 'default' | 'elevated' | 'tinted' | 'dark';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: CardTone;
};

const toneClass: Record<CardTone, string> = {
  default: 'border-[#d8e3ef] bg-white/92 shadow-[0_14px_30px_-24px_rgba(0,57,127,0.35)]',
  elevated: 'border-[#c9d9ea] bg-white shadow-[0_20px_42px_-24px_rgba(0,57,127,0.42)]',
  tinted: 'border-[#dfc8a2] bg-[linear-gradient(160deg,#fffaf2_0%,#f5f9ff_62%,#edf4fc_100%)] shadow-[0_18px_36px_-24px_rgba(0,57,127,0.35)]',
  dark: 'border-white/16 bg-[#00397f]/86 text-white shadow-[0_18px_42px_-28px_rgba(0,0,0,0.55)]'
};

export function Card({ tone = 'default', className, ...props }: CardProps) {
  return <div {...props} className={cn('rounded-2xl border backdrop-blur-[2px]', toneClass[tone], className)} />;
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('px-5 pt-5', className)} />;
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('px-5 pb-5', className)} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...props} className={cn('text-[1.15rem] font-semibold leading-tight tracking-tight text-[var(--color-primary)]', className)} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className={cn('mt-2 text-[14px] leading-relaxed text-[#445a71]', className)} />;
}

