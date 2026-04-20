import { permanentRedirect } from 'next/navigation';

export default async function ResearchMacroAliasPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/research/bao-cao-vi-mo.html`);
}
