'use client';

import { type ReactNode, useId } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export function SearchBar({
  action,
  search,
  placeholder,
  label,
  buttonLabel,
  children
}: {
  action: string;
  search?: string;
  placeholder: string;
  label?: string;
  buttonLabel?: string;
  children?: ReactNode;
}) {
  const searchId = useId();
  const resolvedLabel = label || 'Search';
  const resolvedButtonLabel = buttonLabel || 'Search';
  return (
    <Card tone="default" className="mb-6 rounded-2xl border-white/70 bg-white/76 p-3 backdrop-blur-sm">
      <form action={action} className="grid gap-2.5 md:grid-cols-[1fr_auto] md:items-center">
        <label className="sr-only" htmlFor={searchId}>
          {resolvedLabel}
        </label>
        <Input
          id={searchId}
          type="search"
          name="q"
          defaultValue={search || ''}
          placeholder={placeholder}
          inputClassName="h-10 text-[14px]"
        />
        <Button type="submit" size="md" className="h-10 rounded-xl px-4 text-sm">
          {resolvedButtonLabel}
        </Button>
        {children}
      </form>
    </Card>
  );
}
