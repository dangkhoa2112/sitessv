import { permanentRedirect } from 'next/navigation';

export default async function SupportPromotionsHtmlAliasPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/support`);
}
