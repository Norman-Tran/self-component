'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

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
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  'data-testid'?: string;
} & ComboboxTriggerVariantProps;

function useControllableValue(
  value: string | undefined,
  defaultValue: string | undefined,
  onValueChange: ComboboxProps['onValueChange'],
) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolled;

  const setValue = (next: string | undefined) => {
    if (!isControlled) setUncontrolled(next);
    onValueChange?.(next);
  };

  return [current, setValue] as const;
}

export function Combobox({
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  emptyText = 'No results found.',
  disabled = false,
  className,
  triggerClassName,
  size,
  variant,
  'data-testid': dataTestId,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = useControllableValue(
    value,
    defaultValue,
    onValueChange,
  );

  const selectedLabel = items.find((item) => item.value === selectedValue)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          data-testid={dataTestId}
          className={cn(comboboxTriggerVariants({ size, variant }), triggerClassName, className)}
        >
          <span className="truncate">{selectedLabel ?? placeholder}</span>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
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
}

Combobox.displayName = 'Combobox';
