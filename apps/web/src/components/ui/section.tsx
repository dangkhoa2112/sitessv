import type { HTMLAttributes, ReactNode } from 'react';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  contained?: boolean;
  containerClassName?: string;
};

export function Section({ children, contained = true, className, containerClassName, ...props }: SectionProps) {
  return (
    <section {...props} className={cn(className)}>
      {contained ? <Container className={containerClassName}>{children}</Container> : children}
    </section>
  );
}

