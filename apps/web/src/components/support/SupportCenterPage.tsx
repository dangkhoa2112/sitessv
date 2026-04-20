import { EditorialIntro } from '@/components/layout/EditorialIntro';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { assetUrl } from '@/lib/urls';

type SupportCenterPageProps = {
  locale: string;
  page: {
    title?: string | null;
    summary?: string | null;
    coverImage?: any;
    sections?: Array<any> | null;
  } | null;
};

function isVi(locale: string) {
  return locale === 'vi';
}

export function SupportCenterPage({ locale, page }: SupportCenterPageProps) {
  const vi = isVi(locale);

  return (
    <>
      <EditorialIntro
        breadcrumbs={[
          { label: vi ? 'Trang chủ' : 'Home', href: `/${locale}` },
          { label: vi ? 'Hỗ trợ khách hàng' : 'Support', href: `/${locale}/support` }
        ]}
        kicker={vi ? 'Hỗ trợ' : 'Support'}
        title={page?.title || (vi ? 'Hỗ trợ khách hàng' : 'Customer Support')}
        subtitle={
          page?.summary ||
          (vi
            ? 'Tổng hợp hướng dẫn sử dụng, mở tài khoản, quy định giao dịch và các tài liệu hỗ trợ nhà đầu tư.'
            : 'A support hub for onboarding, trading guides, market rules, and investor help docs.')
        }
        highlights={vi ? ['Mở tài khoản', 'Hướng dẫn giao dịch', 'Câu hỏi thường gặp'] : ['Account opening', 'Trading guides', 'FAQ']}
        imageUrl={assetUrl(page?.coverImage?.data?.attributes?.url) || SHINHAN_VISUALS.support.hero}
        visualLabel={vi ? 'Customer support' : 'Customer support'}
        visualCopy={
          vi
            ? 'Sắp xếp theo hành trình nhà đầu tư để người dùng đi thẳng tới đúng hướng dẫn cần thiết.'
            : 'Structured around the investor journey so users can jump straight to the right guide.'
        }
      />

      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
          {page?.sections?.length ? <SectionRenderer sections={page.sections} /> : null}
        </div>
      </div>
    </>
  );
}
