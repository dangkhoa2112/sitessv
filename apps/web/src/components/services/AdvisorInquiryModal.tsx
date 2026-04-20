'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSubmissionSchema, type ContactSubmission } from '@/lib/contact';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

type AdvisorInquiryProps = {
  locale: string;
  advisorName: string;
  advisorPhone?: string | null;
  advisorBadge?: string | null;
  advisorAvatarUrl?: string | null;
  triggerLabel: string;
};

export function AdvisorInquiryModal({
  locale,
  advisorName,
  advisorPhone,
  advisorBadge,
  advisorAvatarUrl,
  triggerLabel
}: AdvisorInquiryProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState<string | null>(null);
  const isVi = locale === 'vi';
  const advisorImage = advisorAvatarUrl || SHINHAN_VISUALS.home.openAccount;
  const subject = useMemo(
    () => (isVi ? `Tư vấn đầu tư - ${advisorName}` : `Investment advisory - ${advisorName}`),
    [advisorName, isVi]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactSubmission>({
    resolver: zodResolver(contactSubmissionSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject,
      message: advisorPhone
        ? (isVi
            ? `Tôi muốn được tư vấn bởi ${advisorName}. Số điện thoại tham khảo: ${advisorPhone}.`
            : `I would like to be contacted by ${advisorName}. Reference phone: ${advisorPhone}.`)
        : (isVi
            ? `Tôi muốn được tư vấn bởi ${advisorName}.`
            : `I would like to be contacted by ${advisorName}.`),
      companyWebsite: '',
      locale: locale === 'vi' || locale === 'en' ? locale : 'vi'
    }
  });

  useEffect(() => {
    if (!open) return;
    reset({
      fullName: '',
      email: '',
      phone: '',
      subject,
      message: advisorPhone
        ? (isVi
            ? `Tôi muốn được tư vấn bởi ${advisorName}. Số điện thoại tham khảo: ${advisorPhone}.`
            : `I would like to be contacted by ${advisorName}. Reference phone: ${advisorPhone}.`)
        : (isVi
            ? `Tôi muốn được tư vấn bởi ${advisorName}.`
            : `I would like to be contacted by ${advisorName}.`),
      companyWebsite: '',
      locale: locale === 'vi' || locale === 'en' ? locale : 'vi'
    });
    setStatus('idle');
    setFeedback(null);
  }, [advisorName, advisorPhone, isVi, locale, open, reset, subject]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  const onSubmit = async (values: ContactSubmission) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          subject: values.subject || subject,
          message: `${values.message}\n\n${isVi ? 'Chuyên viên đã chọn' : 'Selected advisor'}: ${advisorName}`,
          locale
        })
      });
      const result = (await response.json().catch(() => null)) as { message?: string; error?: string } | null;
      if (!response.ok) {
        throw new Error(result?.error || 'Request failed');
      }
      setStatus('success');
      setFeedback(result?.message || null);
      reset({
        fullName: '',
        email: '',
        phone: '',
        subject,
        message: '',
        companyWebsite: '',
        locale: locale === 'vi' || locale === 'en' ? locale : 'vi'
      });
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error ? error.message : null);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_-18px_rgba(36,69,140,0.6)] transition hover:-translate-y-0.5"
      >
        {triggerLabel}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-6">
          <button
            type="button"
            aria-label={isVi ? 'Đóng' : 'Close'}
            className="absolute inset-0 bg-slate-950/72"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[1.75rem] bg-white shadow-[0_30px_80px_-36px_rgba(8,18,48,0.62)] md:grid-cols-[1.05fr_0.95fr]">
            <button
              type="button"
              aria-label={isVi ? 'Đóng' : 'Close'}
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-slate-950/85 text-white transition hover:bg-slate-900"
            >
              <span className="text-2xl leading-none">×</span>
            </button>

            <div className="space-y-6 px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 lg:px-12">
              <div>
                <p className="text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                  {isVi ? 'Vui lòng viết yêu cầu của bạn tại đây' : 'Please write your request here'}
                </p>
                <h2 className="mt-3 text-[1.65rem] font-semibold tracking-tight text-[var(--color-primary)] md:text-[2.3rem]">
                  {isVi ? 'Chuyên viên tư vấn của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất' : 'Our advisors will contact you as soon as possible'}
                </h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
                  <div className="space-y-4">
                    <Field label={isVi ? 'Họ và tên' : 'Full name'} error={errors.fullName?.message}>
                      <input {...register('fullName')} className="field h-14 rounded-[0.8rem] border border-[#cad5e4] bg-white px-5 text-[1rem] outline-none transition focus:border-[var(--color-primary)]" />
                    </Field>
                    <Field label={isVi ? 'Địa chỉ email' : 'Email address'} error={errors.email?.message}>
                      <input type="email" {...register('email')} className="field h-14 rounded-[0.8rem] border border-[#cad5e4] bg-white px-5 text-[1rem] outline-none transition focus:border-[var(--color-primary)]" />
                    </Field>
                    <Field label={isVi ? 'Chuyên viên đã chọn' : 'Selected advisor'}>
                      <input value={advisorName} readOnly className="field h-14 rounded-[0.8rem] border border-[#cad5e4] bg-[#f7f9fc] px-5 text-[1rem] font-semibold text-slate-800 outline-none" />
                    </Field>
                    <div className="rounded-[0.8rem] border border-[#e0e7f1] bg-[#f9fbfe] px-4 py-3 text-sm text-slate-500">
                      {isVi ? '(* ) Thông tin bắt buộc' : '(* ) Required fields'}
                    </div>
                  </div>

                  <Field label={isVi ? 'Mối quan tâm của bạn' : 'Your interests'} error={errors.message?.message}>
                    <textarea
                      {...register('message')}
                      className="field min-h-[248px] rounded-[0.8rem] border border-[#cad5e4] bg-white px-5 py-4 text-[1rem] outline-none transition focus:border-[var(--color-primary)]"
                    />
                  </Field>
                </div>

                <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register('companyWebsite')} />
                <input type="hidden" {...register('subject')} />
                <input type="hidden" {...register('locale')} />

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-14 min-w-40 items-center justify-center rounded-[0.9rem] bg-[var(--color-primary)] px-8 text-[1rem] font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (isVi ? 'Đang gửi...' : 'Sending...') : isVi ? 'Gửi yêu cầu' : 'Submit request'}
                  </button>
                  {status === 'success' ? (
                    <p className="text-sm font-medium text-emerald-700">
                      {feedback || (isVi ? 'Yêu cầu đã được ghi nhận. Chúng tôi sẽ phản hồi sớm.' : 'Your request has been submitted. We will get back to you shortly.')}
                    </p>
                  ) : null}
                  {status === 'error' ? (
                    <p className="text-sm font-medium text-red-700">
                      {feedback || (isVi ? 'Không thể gửi yêu cầu. Vui lòng thử lại.' : 'Unable to submit request. Please try again.')}
                    </p>
                  ) : null}
                </div>
              </form>
            </div>

            <div className="relative isolate min-h-[280px] overflow-hidden bg-[linear-gradient(180deg,#f9fcff_0%,#eef5ff_48%,#e2ecfb_100%)] md:min-h-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.88),rgba(225,236,251,0.76)_38%,rgba(211,225,247,0.96)_100%)]" />
              <Image
                src={advisorImage}
                alt=""
                fill
                className="object-cover object-center opacity-90 mix-blend-normal"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(15,27,85,0.32))]" />
              <div className="absolute inset-x-6 bottom-6 rounded-[1.5rem] border border-white/60 bg-white/78 p-4 shadow-[0_18px_36px_-24px_rgba(8,18,48,0.4)] backdrop-blur">
                <p className="text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                  {advisorBadge || (isVi ? 'Tư vấn viên đã chọn' : 'Selected advisor')}
                </p>
                <h3 className="mt-2 text-[1.15rem] font-semibold text-slate-950">{advisorName}</h3>
                {advisorPhone ? (
                  <a href={`tel:${advisorPhone.replace(/[^\d+]/g, '')}`} className="mt-2 inline-flex text-sm font-semibold text-[var(--color-primary)]">
                    {advisorPhone}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="block text-[1rem] text-slate-700">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
