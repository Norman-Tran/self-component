'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/button';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';

export interface ComboboxItem {
  label: string;
  value: string;
  disabled?: boolean;
  keywords?: string;
}

export interface ComboboxProps {
  items: ComboboxItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | undefined) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function Combobox({
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Chọn mục...',
  searchPlaceholder = 'Tìm kiếm...',
  emptyText = 'Không tìm thấy kết quả.',
  searchable = true,
  disabled = false,
  className,
  'data-testid': dataTestId,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  const selectedItem = React.useMemo(
    () => items.find((item) => item.value === selectedValue),
    [items, selectedValue],
  );

  const updateValue = (nextValue: string | undefined) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          data-testid={dataTestId}
          className={cn('w-[280px] justify-between font-normal', className)}
        >
          <span className={cn('truncate', !selectedItem && 'text-muted-foreground')}>
            {selectedItem?.label ?? placeholder}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          {searchable && <CommandInput placeholder={searchPlaceholder} />}
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                  keywords={item.keywords ? [item.keywords] : undefined}
                  onSelect={(currentValue) => {
                    const nextValue = currentValue === selectedValue ? undefined : currentValue;
                    updateValue(nextValue);
                    setOpen(false);
                  }}
                >
                  <span className="flex-1 truncate">{item.label}</span>
                  <Check
                    className={cn(
                      'ml-auto size-4',
                      selectedValue === item.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
