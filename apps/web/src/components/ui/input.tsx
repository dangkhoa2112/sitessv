import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type Ref } from 'react';
import { cn } from '@/lib/utils';

type BaseFieldProps = {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
};

type TextInputProps = BaseFieldProps &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: 'input';
  };

type TextareaProps = BaseFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: 'textarea';
  };

export type InputProps = TextInputProps | TextareaProps;

const fieldClass =
  'w-full rounded-xl border border-[#c8d7e8] bg-white/92 px-3.5 text-[15px] text-[#10233a] placeholder:text-[#6b7f95] transition duration-150 ease-out hover:border-[#98b7d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cf9c51]';

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(function Input(props, ref) {
  const { label, hint, error, className, inputClassName, as, ...fieldProps } = props;
  const isTextarea = as === 'textarea';

  return (
    <label className={cn('block', className)}>
      {label ? <span className="mb-1.5 block text-[13px] font-semibold text-[#2b435f]">{label}</span> : null}
      {isTextarea ? (
        <textarea
          {...(fieldProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          ref={ref as Ref<HTMLTextAreaElement>}
          className={cn(fieldClass, 'min-h-28 py-2.5 leading-relaxed', inputClassName)}
          aria-invalid={!!error}
        />
      ) : (
        <input
          {...(fieldProps as InputHTMLAttributes<HTMLInputElement>)}
          ref={ref as Ref<HTMLInputElement>}
          className={cn(fieldClass, 'h-11', inputClassName)}
          aria-invalid={!!error}
        />
      )}
      {error ? <span className="mt-1.5 block text-[12px] font-medium text-[#b42318]">{error}</span> : hint ? <span className="mt-1.5 block text-[12px] text-[#5b7188]">{hint}</span> : null}
    </label>
  );
});
