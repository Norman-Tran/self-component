'use client';

import * as React from 'react';
import {
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
  useController,
} from 'react-hook-form';

import { Label } from '@/ui/label';
import { cn } from '@/lib/utils';

import { Combobox, type ComboboxProps } from './combobox';

type ComboboxFieldLayoutProps = {
  label?: string;
  hint?: string;
  errorMessage?: string;
  required?: boolean;
  id?: string;
  containerClassName?: string;
};

type ComboboxFieldManualProps = ComboboxFieldLayoutProps &
  ComboboxProps & {
    control?: undefined;
    rules?: undefined;
  };

type ComboboxFieldRHFProps<TFieldValues extends FieldValues> = ComboboxFieldLayoutProps &
  Omit<
    ComboboxProps,
    'value' | 'defaultValue' | 'onValueChange' | 'onBlur' | 'name' | 'invalid' | 'ref'
  > & {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
  };

export type ComboboxFieldProps<TFieldValues extends FieldValues = FieldValues> =
  | ComboboxFieldManualProps
  | ComboboxFieldRHFProps<TFieldValues>;

function ComboboxFieldLayout({
  label,
  hint,
  errorMessage,
  required,
  id,
  containerClassName,
  children,
}: ComboboxFieldLayoutProps & { children: React.ReactNode }) {
  return (
    <div className={cn('space-y-2', containerClassName)}>
      {label ? (
        <Label
          htmlFor={id}
          className={cn(required && "after:ml-0.5 after:text-destructive after:content-['*']")}
        >
          {label}
        </Label>
      ) : null}
      {children}
      {hint && !errorMessage ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
      {errorMessage ? (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

function ComboboxFieldManual({
  label,
  hint,
  errorMessage,
  required,
  id: idProp,
  containerClassName,
  invalid,
  ...comboboxProps
}: ComboboxFieldManualProps) {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;

  return (
    <ComboboxFieldLayout
      label={label}
      hint={hint}
      errorMessage={errorMessage}
      required={required}
      id={id}
      containerClassName={containerClassName}
    >
      <Combobox {...comboboxProps} id={id} invalid={invalid ?? Boolean(errorMessage)} />
    </ComboboxFieldLayout>
  );
}

function ComboboxFieldRHF<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  label,
  hint,
  errorMessage: errorMessageProp,
  required,
  id: idProp,
  containerClassName,
  disabled,
  ...comboboxProps
}: ComboboxFieldRHFProps<TFieldValues>) {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;

  const { field, fieldState } = useController({ control, name, rules, disabled });
  const errorMessage = errorMessageProp ?? fieldState.error?.message?.toString();
  const invalid = fieldState.invalid;

  return (
    <ComboboxFieldLayout
      label={label}
      hint={hint}
      errorMessage={errorMessage}
      required={required}
      id={id}
      containerClassName={containerClassName}
    >
      <Combobox
        {...comboboxProps}
        id={id}
        ref={field.ref}
        name={field.name}
        value={field.value as string | undefined}
        onValueChange={field.onChange}
        onBlur={field.onBlur}
        disabled={disabled ?? field.disabled}
        invalid={invalid}
      />
    </ComboboxFieldLayout>
  );
}

export function ComboboxField<TFieldValues extends FieldValues = FieldValues>(
  props: ComboboxFieldProps<TFieldValues>,
) {
  if ('control' in props && props.control) {
    return <ComboboxFieldRHF {...props} />;
  }

  return <ComboboxFieldManual {...props} />;
}

ComboboxField.displayName = 'ComboboxField';
