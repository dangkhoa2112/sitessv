import type { Metadata } from 'next';
import Link from 'next/link';
import { EditorialIntro } from '@/components/layout/EditorialIntro';
import { ContactForm } from '@/components/forms/ContactForm';
import { InsightRail } from '@/components/ui/InsightRail';
import { OfficeCard } from '@/components/ui/OfficeCard';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';
import { SHINHAN_BRAND_LINKS } from '@/lib/shinhan-links';
import { getContactPage, getPageBySlug, listOffices } from '@/lib/cms-api';
import { buildPageMetadata } from '@/lib/seo';
import { assetUrl } from '@/lib/urls';

function resolveOfficeTypeLabel(officeType?: any) {
  return officeType?.data?.attributes?.title || officeType?.data?.attributes?.slug || '';
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const contact = await getContactPage(locale);

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/contact`,
    seo: contact?.seo,
    fallback: {
      title: contact?.title,
      description: contact?.summary
    }
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const [contact, offices, page] = await Promise.all([getContactPage(locale), listOffices(locale), getPageBySlug(locale, 'contact')]);
  const vi = locale === 'vi';
  const contactLinks = vi
    ? [
        { label: 'Hotline', value: SHINHAN_BRAND_LINKS.contact.hotlineLabel, href: SHINHAN_BRAND_LINKS.contact.hotlineTel },
        { label: 'Email', value: SHINHAN_BRAND_LINKS.contact.email, href: SHINHAN_BRAND_LINKS.contact.emailHref },
        { label: 'Facebook', value: SHINHAN_BRAND_LINKS.contact.facebookLabel, href: SHINHAN_BRAND_LINKS.contact.facebook },
        { label: 'Zalo', value: SHINHAN_BRAND_LINKS.contact.zaloLabel, href: SHINHAN_BRAND_LINKS.contact.zalo }
      ]
    : [
        { label: 'Hotline', value: SHINHAN_BRAND_LINKS.contact.hotlineLabel, href: SHINHAN_BRAND_LINKS.contact.hotlineTel },
        { label: 'Email', value: SHINHAN_BRAND_LINKS.contact.email, href: SHINHAN_BRAND_LINKS.contact.emailHref },
        { label: 'Facebook', value: SHINHAN_BRAND_LINKS.contact.facebookLabel, href: SHINHAN_BRAND_LINKS.contact.facebook },
        { label: 'Zalo', value: SHINHAN_BRAND_LINKS.contact.zaloLabel, href: SHINHAN_BRAND_LINKS.contact.zalo }
      ];

  return (
    <>
      <EditorialIntro
        breadcrumbs={[
          { label: vi ? 'Trang chủ' : 'Home', href: `/${locale}` },
          { label: vi ? 'Liên hệ' : 'Contact', href: `/${locale}/contact` }
        ]}
        kicker={vi ? 'Kết nối với chúng tôi' : 'Contact us'}
        title={contact?.title || (vi ? 'Liên hệ Shinhan Securities Vietnam' : 'Contact Shinhan Securities Vietnam')}
        subtitle={contact?.summary}
        highlights={
          vi
            ? [`Hotline ${SHINHAN_BRAND_LINKS.contact.hotlineLabel}`, SHINHAN_BRAND_LINKS.contact.email, 'Văn phòng HCM và Hà Nội']
            : [`Hotline ${SHINHAN_BRAND_LINKS.contact.hotlineLabel}`, SHINHAN_BRAND_LINKS.contact.email, 'Ho Chi Minh City and Hanoi']
        }
        imageUrl={assetUrl(page?.coverImage?.data?.attributes?.url) || SHINHAN_VISUALS.about.overview}
        visualLabel={vi ? 'Contact center' : 'Contact center'}
        visualCopy={
          vi
            ? 'Kết nối nhanh tới bộ phận tư vấn, vận hành và mạng lưới văn phòng giao dịch.'
            : 'Quick access to advisory, operations, and office network touchpoints.'
        }
      />
      <div className="subpage-shell">
        <div className="subpage-content subpage-content--wide space-y-6 md:space-y-8">
          <section className="subpage-panel">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="max-w-3xl">
                <p className="subpage-eyebrow">{vi ? 'Kết nối với chúng tôi' : 'Reach us'}</p>
                <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                  {vi ? 'Các kênh liên hệ chính thức' : 'Official contact channels'}
                </h2>
              </div>
              <Link href={`/${locale}/support`} className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white">
                {vi ? 'Trung tâm hỗ trợ' : 'Support hub'}
              </Link>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="subpage-soft-card group flex flex-col p-4 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <p className="text-sm font-medium text-slate-500">{item.label}</p>
                  <p className="mt-2 text-[1rem] font-semibold text-slate-950">{item.value}</p>
                  <span className="mt-auto pt-4 text-sm font-semibold text-[var(--color-primary)] transition group-hover:translate-x-0.5">
                    {vi ? 'Mở kênh này' : 'Open channel'}
                  </span>
                </a>
              ))}
            </div>
          </section>

          <InsightRail
            eyebrow={locale === 'vi' ? 'Client Care' : 'Client Care'}
            title={vi ? 'Kết nối tư vấn và vận hành trong một kênh liên hệ' : 'Unified advisory and operations contact flow'}
            description={
              vi
                ? 'Thiết kế lại trải nghiệm liên hệ theo hướng rõ loại yêu cầu, rút ngắn thời gian xử lý và ưu tiên tư vấn đúng chuyên môn.'
                : 'Contact experience redesigned for request clarity, faster routing, and specialist-level advisory response.'
            }
            items={
              vi
                ? [
                    { meta: 'Routing', title: 'Phân luồng yêu cầu', description: 'Tự động nhận diện nhóm nghiệp vụ để điều phối tới đúng bộ phận phụ trách.' },
                    { meta: 'Coverage', title: 'Địa chỉ văn phòng', description: 'Thông tin trụ sở và chi nhánh giúp khách hàng chọn kênh hỗ trợ phù hợp.' },
                    { meta: 'AI Assist', title: 'Trợ lý tiền xử lý', description: 'AI chuẩn hóa thông tin ban đầu trước khi chuyển chuyên viên tiếp nhận.' }
                  ]
                : [
                    { meta: 'Routing', title: 'Request categorization', description: 'Automatically route requests to the right operational team.' },
                    { meta: 'Coverage', title: 'Office network visibility', description: 'Clear branch data for selecting the most suitable support channel.' },
                    { meta: 'AI Assist', title: 'Pre-intake assistant', description: 'AI normalizes initial information before human case handling.' }
                  ]
            }
          />
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <div>
              <ContactForm locale={locale} />
            </div>
            <div className="space-y-3">
              <h2 className="subpage-section-title">{vi ? 'Văn phòng' : 'Offices'}</h2>
              {offices.map((office: any) => (
                <OfficeCard
                  key={office.id}
                  name={office.attributes.name}
                  address={office.attributes.address}
                  city={office.attributes.city}
                  phone={office.attributes.phone}
                  email={office.attributes.email}
                  workingHours={office.attributes.workingHours}
                  officeType={resolveOfficeTypeLabel(office.attributes.officeType)}
                />
              ))}
            </div>
          </div>

          <section className="subpage-panel space-y-4">
            <div className="max-w-3xl">
              <p className="subpage-eyebrow">{vi ? 'Địa chỉ' : 'Address'}</p>
              <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                {vi ? 'Trụ sở chính và chi nhánh Hà Nội' : 'Head office and Hanoi branch'}
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                vi
                  ? 'Trụ sở chính: Tầng 18, Tháp B, Khu Thương Mại Dịch Vụ kết hợp nhà ở cao tầng tại lô đất 1-13 thuộc Khu chức năng số 1, Số 15 Đường Trần Bạch Đằng, Phường An Khánh, TP. Hồ Chí Minh.'
                  : 'Head office: 18th Floor, Tower B, Complex of commercial and residential development, Lot 1-13, Functional Area No. 1, 15 Tran Bach Dang Street, An Khanh Ward, Ho Chi Minh City.',
                vi
                  ? 'Chi nhánh Hà Nội: Tầng 2, Tòa nhà Leadvisors Place, 41A Lý Thái Tổ, Phường Hoàn Kiếm, TP. Hà Nội.'
                  : 'Hanoi Branch: 2nd Floor, Leadvisors Place Building, 41A Ly Thai To, Hoan Kiem Ward, Hanoi City.'
              ].map((text) => (
                <div key={text} className="subpage-soft-card p-4">
                  <p className="text-sm leading-7 text-slate-700">{text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
