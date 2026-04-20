import { permanentRedirect } from 'next/navigation';

export default async function BrokerageLandingRedirect({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/san-pham-dich-vu/moi-gioi-chung-khoan/san-pham.html`);
}
