import { permanentRedirect } from 'next/navigation';

export default async function LegacyAboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/about`);
}
