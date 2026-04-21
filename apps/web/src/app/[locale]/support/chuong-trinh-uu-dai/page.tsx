import { permanentRedirect } from 'next/navigation';

export default async function SupportPromotionsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/support`);
}
