import type { Metadata } from 'next';
import { EditorialIntro } from '@/components/layout/EditorialIntro';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { InsightRail } from '@/components/ui/InsightRail';
import { JsonLd } from '@/components/ui/JsonLd';
import { getPageBySlug, listFaqs } from '@/lib/cms-api';
import { faqJsonLd } from '@/lib/json-ld';
import { buildPageMetadata } from '@/lib/seo';
import { assetUrl } from '@/lib/urls';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/faq`,
    fallback: {
      title: locale === 'vi' ? 'Câu hỏi thường gặp' : 'Frequently Asked Questions',
      description:
        locale === 'vi'
          ? 'Tổng hợp câu hỏi thường gặp về tài khoản, giao dịch, nộp rút tiền và dịch vụ hỗ trợ khách hàng.'
          : 'Common questions about onboarding, trading, fund transfers, and customer support.'
    }
  });
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const categories = await listFaqs(locale);
  const cmsPage = await getPageBySlug(locale, 'faq');

  const jsonLdData = categories.flatMap((category: any) =>
    (category.attributes.items?.data || []).map((item: any) => ({
      question: item.attributes.question,
      answer: item.attributes.answer.replace(/<[^>]+>/g, '')
    }))
  );

  return (
    <>
      <JsonLd data={faqJsonLd(jsonLdData)} />
      <EditorialIntro
        breadcrumbs={[
          { label: locale === 'vi' ? 'Trang chủ' : 'Home', href: `/${locale}` },
          { label: locale === 'vi' ? 'Câu hỏi thường gặp' : 'FAQ', href: `/${locale}/faq` }
        ]}
        kicker={locale === 'vi' ? 'Câu hỏi thường gặp' : 'FAQ'}
        title={locale === 'vi' ? 'Câu hỏi thường gặp' : 'Frequently Asked Questions'}
        subtitle={
          locale === 'vi'
            ? 'Tổng hợp câu hỏi phổ biến về tài khoản, giao dịch và dịch vụ hỗ trợ.'
            : 'Answers to common questions about onboarding, trading, and support services.'
        }
        highlights={locale === 'vi' ? ['Tài khoản', 'Nộp/rút tiền', 'Giao dịch & phí'] : ['Account setup', 'Fund transfer', 'Trading & fees']}
        imageUrl={assetUrl(cmsPage?.coverImage?.data?.attributes?.url) || SHINHAN_VISUALS.services.trading}
        visualLabel={locale === 'vi' ? 'Knowledge base' : 'Knowledge base'}
        visualCopy={
          locale === 'vi'
            ? 'Các câu hỏi được tổ chức theo hành trình sử dụng dịch vụ để người dùng tìm đúng nội dung nhanh hơn.'
            : 'Questions are grouped by service journey so users can find the right answer faster.'
        }
      />
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--narrow space-y-6">
          <InsightRail
            eyebrow={locale === 'vi' ? 'Knowledge Base' : 'Knowledge Base'}
            title={locale === 'vi' ? 'Bộ câu hỏi trọng yếu cho vận hành đầu tư hàng ngày' : 'Operational FAQ for daily investment workflow'}
            description={
              locale === 'vi'
                ? 'Cấu trúc theo các nhóm vấn đề phát sinh nhiều nhất từ hành trình khách hàng tại các công ty chứng khoán.'
                : 'Organized around highest-frequency issues across onboarding and execution journeys.'
            }
            items={
              locale === 'vi'
                ? [
                    { meta: 'Account', title: 'Định danh & tài khoản', description: 'Các điều kiện mở tài khoản, cập nhật thông tin và xác thực giao dịch.' },
                    { meta: 'Transfer', title: 'Nộp/rút tiền', description: 'Quy trình, thời gian xử lý và lưu ý khi chuyển tiền đầu tư.' },
                    { meta: 'Execution', title: 'Đặt lệnh & phí', description: 'Cơ chế khớp lệnh, hạn mức, biểu phí và các tình huống thường gặp.' }
                  ]
                : [
                    { meta: 'Account', title: 'Identity and account setup', description: 'Requirements for onboarding, profile updates, and transaction security.' },
                    { meta: 'Transfer', title: 'Deposit and withdrawal', description: 'Process, handling windows, and operational caveats for fund movement.' },
                    { meta: 'Execution', title: 'Orders and fee policy', description: 'Matching mechanics, limits, transaction costs, and common edge cases.' }
                  ]
            }
          />
          {categories.map((category: any) => (
            <section key={category.id}>
              <h2 className="subpage-section-title">{category.attributes.title}</h2>
              <FaqAccordion
                items={(category.attributes.items?.data || []).map((item: any) => ({
                  id: item.id,
                  question: item.attributes.question,
                  answer: item.attributes.answer
                }))}
              />
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
