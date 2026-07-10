import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Combobox trigger / surface variants.
 * Extend `variant` and other keys when design spec is provided.
 */
export const comboboxTriggerVariants = cva('w-full px-4 justify-between font-normal', {
  variants: {
    size: {
      sm: 'h-8 text-xs',
      md: 'h-9 text-sm',
      lg: 'h-10 text-sm',
    },
    variant: {
      default: '',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

export type ComboboxTriggerVariantProps = VariantProps<typeof comboboxTriggerVariants>;
