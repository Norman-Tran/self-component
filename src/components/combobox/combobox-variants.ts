import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Combobox trigger / surface variants.
 * Extend `variant` and other keys when design spec is provided.
 */
export const comboboxTriggerVariants = cva('w-full justify-between font-normal', {
  variants: {
    size: {
      sm: 'h-8 px-2 text-xs',
      md: 'h-9 px-3 text-sm',
      lg: 'h-10 px-4 text-sm',
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
