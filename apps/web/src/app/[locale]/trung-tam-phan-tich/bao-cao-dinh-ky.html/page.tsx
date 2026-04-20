import { permanentRedirect } from 'next/navigation';

export default async function ResearchPeriodicAliasPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/research/bao-cao-dinh-ky.html`);
}
