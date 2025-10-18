import * as React from 'react';
import { clsx } from 'clsx';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('rounded-lg border border-slate-200 bg-white p-6 shadow-sm', className)} {...props} />
  )
);

Card.displayName = 'Card';
