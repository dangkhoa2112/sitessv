import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('shinhan-container', className)} />;
}

