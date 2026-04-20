import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export { absoluteUrl } from './urls';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input?: string | null, locale = 'vi-VN') {
  if (!input) return '';
  const date = new Date(input);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }).format(date);
}
