'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSubmissionSchema, type ContactSubmission } from '@/lib/contact';

export function ContactForm({ locale }: { locale: string }) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactSubmission>({
    resolver: zodResolver(contactSubmissionSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      companyWebsite: ''
    }
  });

  const onSubmit = async (values: ContactSubmission) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...values, locale })
      });

      const result = (await response.json().catch(() => null)) as { message?: string; error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error || 'Request failed');
      }

      setStatus('success');
      setFeedback(result?.message || null);
      reset();
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error ? error.message : null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="subpage-glass-card space-y-3 p-4"
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Field label={locale === 'vi' ? 'Họ và tên' : 'Full name'} error={errors.fullName?.message}>
          <input {...register('fullName')} className="field" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input type="email" {...register('email')} className="field" />
        </Field>
        <Field label={locale === 'vi' ? 'Số điện thoại' : 'Phone'} error={errors.phone?.message}>
          <input {...register('phone')} className="field" />
        </Field>
        <Field label={locale === 'vi' ? 'Tiêu đề' : 'Subject'} error={errors.subject?.message}>
          <input {...register('subject')} className="field" />
        </Field>
      </div>

      <Field label={locale === 'vi' ? 'Nội dung' : 'Message'} error={errors.message?.message}>
        <textarea {...register('message')} className="field min-h-32" />
      </Field>

      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register('companyWebsite')} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-10 items-center rounded-full bg-[var(--color-primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-strong)] disabled:opacity-60"
      >
        {isSubmitting ? (locale === 'vi' ? 'Đang gửi...' : 'Sending...') : locale === 'vi' ? 'Gửi yêu cầu' : 'Submit request'}
      </button>

      {status === 'success' ? (
        <p className="text-sm text-emerald-700">
          {locale === 'vi'
            ? feedback || 'Yêu cầu đã được ghi nhận. Chúng tôi sẽ phản hồi sớm.'
            : feedback || 'Your request has been submitted. We will get back to you shortly.'}
        </p>
      ) : null}
      {status === 'error' ? (
        <p className="text-sm text-red-700">
          {feedback ||
            (locale === 'vi' ? 'Không thể gửi yêu cầu. Vui lòng thử lại.' : 'Unable to submit request. Please try again.')}
        </p>
      ) : null}
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="text-[13px] font-medium text-slate-700">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
