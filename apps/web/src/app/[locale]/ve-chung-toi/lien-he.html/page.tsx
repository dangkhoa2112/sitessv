import { permanentRedirect } from 'next/navigation';

export default async function LegacyContactHtmlPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/contact`);
}
