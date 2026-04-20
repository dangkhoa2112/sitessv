import { permanentRedirect } from 'next/navigation';

export default async function ResearchAnalystAliasPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/research/phan-tich-vien.html`);
}
