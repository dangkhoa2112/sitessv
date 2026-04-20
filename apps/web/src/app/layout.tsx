import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SkipLink } from '@/components/layout/SkipLink';
import { SITE_URL } from '@/lib/constants';

const shinhan = localFont({
  variable: '--font-sans',
  src: [
    { path: '../../public/shinhan/fonts/Shinhan-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/shinhan/fonts/Shinhan-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/shinhan/fonts/Shinhan-Bold.woff2', weight: '700', style: 'normal' }
  ]
});

const oneShinhan = localFont({
  variable: '--font-serif',
  src: [
    { path: '../../public/shinhan/fonts/OneShinhan-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/shinhan/fonts/OneShinhan-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/shinhan/fonts/OneShinhan-Bold.woff2', weight: '700', style: 'normal' }
  ]
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Shinhan Securities Vietnam',
    template: '%s | Shinhan Securities Vietnam'
  },
  description: 'Shinhan Securities Vietnam corporate website.',
  robots: 'index,follow'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className={`${shinhan.variable} ${oneShinhan.variable}`}>
      <body suppressHydrationWarning className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
