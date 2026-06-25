'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { DEFAULT_SIZE, type SizeType, type VariantType } from '@/lib/tokens';
import { cn } from '@/lib/utils';
import { Button as UiButton } from '@/ui/button';

const dsButtonVariants = cva('', {
  variants: {
    dsSize: {
      sm: '',
      md: '',
      lg: '',
    },
    dsVariant: {
      solid: '',
      secondary: '',
      ghost: '',
      link: '',
    },
  },
  defaultVariants: {
    dsSize: DEFAULT_SIZE,
    dsVariant: 'solid',
  },
});

const sizeMap: Record<SizeType, 'sm' | 'default' | 'lg'> = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
};

const variantMap: Record<
  VariantType,
  'default' | 'secondary' | 'ghost' | 'link' | 'destructive' | 'outline'
> = {
  solid: 'default',
  secondary: 'secondary',
  ghost: 'ghost',
  link: 'link',
};

export interface ButtonProps
  extends
    Omit<React.ComponentProps<typeof UiButton>, 'size' | 'variant'>,
    VariantProps<typeof dsButtonVariants> {
  size?: SizeType;
  variant?: VariantType;
  'data-testid'?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, size = DEFAULT_SIZE, variant = 'solid', 'data-testid': dataTestId, ...props },
    ref,
  ) => {
    return (
      <UiButton
        ref={ref}
        data-testid={dataTestId}
        size={sizeMap[size]}
        variant={variantMap[variant]}
        className={cn(dsButtonVariants({ dsSize: size, dsVariant: variant }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
