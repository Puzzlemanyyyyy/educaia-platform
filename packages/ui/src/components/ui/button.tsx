import * as React from 'react';
import { clsx } from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline';
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium';
    const variants: Record<typeof variant, string> = {
      primary: 'bg-sky-600 text-white hover:bg-sky-700',
      outline: 'border border-sky-600 text-sky-600 hover:bg-sky-50'
    } as const;

    return (
      <button ref={ref} className={clsx(base, variants[variant], className)} {...props} />
    );
  }
);

Button.displayName = 'Button';
