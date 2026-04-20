import { permanentRedirect } from 'next/navigation';

export default async function InvestmentBankingHtmlRedirect({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/services/ngan-hang-dau-tu`);
}
