import { permanentRedirect } from 'next/navigation';

export default async function BrokerageLandingHtmlRedirect({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/services/moi-gioi-chung-khoan`);
}
