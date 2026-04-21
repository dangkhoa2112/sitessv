'use client';

import { useEffect } from 'react';

export function LocaleLangSync({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'vi';
  }, [locale]);

  return null;
}
