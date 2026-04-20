import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
  children: ReactNode;
};

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
  };

type AnchorButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
    href: string;
  };

export type ButtonProps = NativeButtonProps | AnchorButtonProps;

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'text-[var(--color-accent)] border border-[color:var(--color-accent)] bg-[linear-gradient(135deg,#004797_0%,#00397f_58%,#002a5d_100%)] shadow-[0_12px_24px_-14px_rgba(0,47,104,0.68)] hover:border-[#ddb574] hover:text-[#f1cd8f] hover:shadow-[0_16px_28px_-14px_rgba(0,47,104,0.75)]',
  secondary:
    'text-[var(--color-accent)] border border-[color:var(--color-accent)] bg-white/95 hover:border-[#b88743] hover:bg-[#fff9ef] hover:text-[#b88743]',
  ghost: 'text-[var(--color-accent)] border border-transparent bg-transparent hover:border-[#cf9c51]/35 hover:bg-[#cf9c51]/10',
  link: 'text-[var(--color-accent)] bg-transparent underline-offset-4 hover:text-[#b88743] hover:underline shadow-none px-0'
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-6 text-[16px]'
};

const baseClass =
  'inline-flex items-center justify-center rounded-full font-semibold tracking-[0.01em] transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cf9c51] disabled:pointer-events-none disabled:opacity-45';

function composeClass(props: CommonProps) {
  const { variant = 'primary', size = 'md', fullWidth = false, className } = props;
  return cn(baseClass, variantClass[variant], sizeClass[size], fullWidth && 'w-full', className);
}

function contentNode(children: ReactNode, loading?: boolean) {
  return (
    <>
      {loading ? <span className="mr-2 inline-flex h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
      {children}
    </>
  );
}

function AnchorButton(props: AnchorButtonProps) {
  const { as, variant, size, fullWidth, loading, className, children, ...anchorProps } = props;
  void as;
  return (
    <a {...anchorProps} className={composeClass({ variant, size, fullWidth, className, children, loading })} aria-busy={loading || undefined}>
      {contentNode(children, loading)}
    </a>
  );
}

function NativeButton(props: NativeButtonProps) {
  const { as, variant, size, fullWidth, loading, className, children, disabled, ...buttonProps } = props;
  void as;
  return (
    <button
      {...buttonProps}
      className={composeClass({ variant, size, fullWidth, className, children, loading })}
      disabled={loading || disabled}
      aria-busy={loading || undefined}
    >
      {contentNode(children, loading)}
    </button>
  );
}

export function Button(props: ButtonProps) {
  if (props.as === 'a') {
    return <AnchorButton {...props} />;
  }
  return <NativeButton {...props} />;
}
