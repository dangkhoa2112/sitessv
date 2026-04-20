import { HomeOpenAccount } from '@/components/home/HomeOpenAccount';
import { SHINHAN_BRAND_LINKS } from '@/lib/shinhan-links';
import { getAccountTrustItems, getOpenAccountCopy, getOpenAccountSectionCopy, type HomeLocale } from './home-legacy-content';

type HomeLegacyOpenAccountSectionProps = {
  locale: HomeLocale;
};

export function HomeLegacyOpenAccountSection({ locale }: HomeLegacyOpenAccountSectionProps) {
  const copy = getOpenAccountSectionCopy(locale);
  const openAccount = getOpenAccountCopy(locale);
  return (
    <HomeOpenAccount
      badge={copy.badge}
      title={copy.title}
      body={copy.body}
      ctaLabel={copy.ctaLabel}
      ctaHref={SHINHAN_BRAND_LINKS.trading.login}
      ctaSubLabel={openAccount.subLabel}
      ctaSubHref={openAccount.subHref}
      trustItems={getAccountTrustItems(locale)}
    />
  );
}
