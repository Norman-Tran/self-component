'use client';

import * as React from 'react';
import { Check, ChevronRight } from 'lucide-react';

import { Button } from '@/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { cn } from '@/lib/utils';

import { comboboxTriggerVariants, type ComboboxTriggerVariantProps } from './combobox-variants';
import type { ComboboxItem } from './types';

export type ComboboxProps = {
  items: ComboboxItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | undefined) => void;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  triggerClassName?: string;
  id?: string;
  name?: string;
  'data-testid'?: string;
} & ComboboxTriggerVariantProps;

function normalizeValue(value: string | undefined | null) {
  if (value === '' || value == null) return undefined;
  return value;
}

function useControllableValue(
  value: string | undefined,
  defaultValue: string | undefined,
  onValueChange: ComboboxProps['onValueChange'],
) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? normalizeValue(value) : uncontrolled;

  const setValue = (next: string | undefined) => {
    if (!isControlled) setUncontrolled(next);
    onValueChange?.(next);
  };

  return [current, setValue] as const;
}

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(function Combobox(
  {
    items,
    value,
    defaultValue,
    onValueChange,
    onBlur,
    placeholder = 'Select an option',
    searchPlaceholder = 'Search...',
    emptyText = 'No results found.',
    disabled = false,
    invalid = false,
    className,
    triggerClassName,
    id,
    name,
    size,
    variant,
    'data-testid': dataTestId,
  },
  ref,
) {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const setButtonRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const [selectedValue, setSelectedValue] = useControllableValue(
    value,
    defaultValue,
    onValueChange,
  );

  const selectedLabel = items.find((item) => item.value === selectedValue)?.label;

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) buttonRef.current?.blur();
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          ref={setButtonRef}
          type="button"
          variant="outline"
          role="combobox"
          id={id}
          name={name}
          aria-expanded={open}
          aria-invalid={invalid || undefined}
          disabled={disabled}
          data-testid={dataTestId}
          onBlur={onBlur}
          className={cn(
            comboboxTriggerVariants({ size, variant }),
            invalid && 'border-destructive focus-visible:ring-destructive',
            triggerClassName,
            className,
          )}
        >
          <span className="truncate">{selectedLabel ?? placeholder}</span>
          <ChevronRight
            className={cn(
              'ml-2 size-4 shrink-0 opacity-50 transition-transform duration-200 ease-in-out',
              open && 'rotate-90',
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={`${item.label} ${item.keywords ?? ''}`}
                  disabled={item.disabled}
                  onSelect={() => {
                    const next = item.value === selectedValue ? undefined : item.value;
                    setSelectedValue(next);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'size-4 shrink-0',
                      selectedValue === item.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

Combobox.displayName = 'Combobox';
