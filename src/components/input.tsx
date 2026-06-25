'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input as UiInput } from '@/ui/input';
import { Label } from '@/ui/label';

export interface InputProps extends Omit<React.ComponentProps<typeof UiInput>, 'size'> {
  label?: string;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  containerClassName?: string;
  'data-testid'?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      errorMessage,
      required,
      className,
      containerClassName,
      id,
      'data-testid': dataTestId,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? React.useId();

    return (
      <div className={cn('flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <Label htmlFor={inputId} className="text-foreground">
            {label}
            {required && <span className="ml-0.5 text-destructive">*</span>}
          </Label>
        )}
        <UiInput
          ref={ref}
          id={inputId}
          data-testid={dataTestId}
          aria-invalid={error || undefined}
          className={cn(error && 'border-destructive focus-visible:ring-destructive', className)}
          {...props}
        />
        {(errorMessage || hint) && (
          <p
            className={cn(
              'text-xs',
              error || errorMessage ? 'text-destructive' : 'text-muted-foreground',
            )}
          >
            {error ? errorMessage : hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
