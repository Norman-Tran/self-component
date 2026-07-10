import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Combobox, ComboboxField } from '@/index';

import { ComponentDocLayout, DocSection, PropsTable, type PropDocRow } from '../../components/doc';

const cities = [
  { label: 'Hanoi', value: 'hn', keywords: 'ha noi capital' },
  { label: 'Da Nang', value: 'dn' },
  { label: 'Ho Chi Minh City', value: 'hcm', keywords: 'sai gon' },
  { label: 'Can Tho', value: 'ct', disabled: true },
];

const comboboxProps: PropDocRow[] = [
  {
    name: 'items',
    type: 'ComboboxItem[]',
    required: true,
    description: 'Options rendered in the dropdown list.',
  },
  {
    name: 'value',
    type: 'string',
    description: 'Selected value in controlled mode.',
    notes: 'Pair with onValueChange. Omit for uncontrolled usage.',
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'Initial value when uncontrolled.',
  },
  {
    name: 'onValueChange',
    type: '(value: string | undefined) => void',
    description: 'Called when selection changes. Cleared selection passes undefined.',
    notes: 'Use with react-hook-form field.onChange via Controller or ComboboxField.',
  },
  {
    name: 'onBlur',
    type: 'FocusEventHandler<HTMLButtonElement>',
    description: 'Forwarded to the trigger button.',
    notes: 'Also fires when the popover closes (selection or dismiss).',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: '"Select an option"',
    description: 'Trigger label when nothing is selected.',
  },
  {
    name: 'searchPlaceholder',
    type: 'string',
    default: '"Search..."',
    description: 'Placeholder for the search input inside the popover.',
  },
  {
    name: 'emptyText',
    type: 'string',
    default: '"No results found."',
    description: 'Message when filter returns no matches.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the trigger button.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: 'Applies error styling and aria-invalid on the trigger.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Applied to the trigger; pairs with label htmlFor.',
  },
  {
    name: 'name',
    type: 'string',
    description: 'Native name on the trigger (react-hook-form field.name).',
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: 'Trigger height and typography.',
    notes: 'Defined in comboboxTriggerVariants (CVA).',
  },
  {
    name: 'variant',
    type: '"default"',
    default: '"default"',
    description: 'Visual variant for the trigger surface.',
    notes: 'Extend combobox-variants.ts for product-specific styles.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Extra classes on the trigger button.',
  },
  {
    name: 'triggerClassName',
    type: 'string',
    description: 'Alias for className on the trigger (same element).',
    notes: 'Merged with className via cn().',
  },
  {
    name: 'data-testid',
    type: 'string',
    description: 'Applied to the trigger for testing.',
  },
];

const comboboxFieldProps: PropDocRow[] = [
  {
    name: 'control',
    type: 'Control<TFieldValues>',
    description: 'react-hook-form control object.',
    notes: 'When set with name, uses useController internally.',
  },
  {
    name: 'name',
    type: 'FieldPath<TFieldValues>',
    description: 'Field name registered with the form.',
  },
  {
    name: 'rules',
    type: 'RegisterOptions',
    description: 'Validation rules (required, validate, etc.).',
  },
  {
    name: 'label',
    type: 'string',
    description: 'Visible label linked to the trigger via htmlFor.',
  },
  {
    name: 'hint',
    type: 'string',
    description: 'Helper text below the field when there is no error.',
  },
  {
    name: 'errorMessage',
    type: 'string',
    description: 'Error text; auto-filled from fieldState when using control.',
  },
  {
    name: 'required',
    type: 'boolean',
    description: 'Shows a required marker on the label.',
  },
  {
    name: 'containerClassName',
    type: 'string',
    description: 'Classes on the outer field wrapper.',
  },
];

const comboboxItemFields: PropDocRow[] = [
  {
    name: 'label',
    type: 'string',
    required: true,
    description: 'Display text in the list and trigger when selected.',
  },
  {
    name: 'value',
    type: 'string',
    required: true,
    description: 'Unique identifier stored as the selected value.',
  },
  {
    name: 'keywords',
    type: 'string',
    description: 'Extra search terms for filtering.',
    notes: 'Appended to label in Command item value.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Prevents selecting this option.',
  },
];

function ControlledDemo() {
  const [value, setValue] = useState<string | undefined>('hn');

  return (
    <>
      <Combobox
        items={cities}
        value={value}
        onValueChange={setValue}
        placeholder="Select a city"
        data-testid="combobox-controlled"
      />
      <p className="text-sm text-muted-foreground">Selected: {value ?? '(empty)'}</p>
    </>
  );
}

type CityFormValues = {
  city: string | undefined;
};

function ReactHookFormDemo() {
  const form = useForm<CityFormValues>({
    defaultValues: { city: undefined },
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit((data) => {
    window.alert(`Submitted: ${data.city ?? '(empty)'}`);
  });

  return (
    <form className="max-w-sm space-y-4" onSubmit={onSubmit} noValidate>
      <ComboboxField
        control={form.control}
        name="city"
        label="City"
        hint="Required — validated on blur"
        required
        items={cities}
        placeholder="Select a city"
        rules={{ required: 'Please select a city' }}
      />

      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          Submit
        </button>
        <button
          type="button"
          className="inline-flex h-9 items-center rounded-md border px-4 text-sm"
          onClick={() => form.reset()}
        >
          Reset
        </button>
      </div>

      <p className="text-sm text-muted-foreground">
        Watched value: {form.watch('city') ?? '(empty)'}
      </p>
    </form>
  );
}

export function ComboboxPage() {
  return (
    <ComponentDocLayout
      title="Combobox"
      description={
        <p>
          Single-select with search. Composed from Popover + Command + Button (shadcn pattern).
          Custom trigger variants live in <code>combobox-variants.ts</code>.
        </p>
      }
    >
      <DocSection
        title="Controlled"
        description="Pass value and onValueChange — typical for forms and react-hook-form."
      >
        <div className="max-w-sm">
          <ControlledDemo />
        </div>
      </DocSection>

      <DocSection
        title="React Hook Form"
        description={
          <>
            Use <code>ComboboxField</code> with <code>control</code> + <code>name</code>, or wire{' '}
            <code>Combobox</code> manually via <code>Controller</code>. Peer dep:{' '}
            <code>react-hook-form</code>.
          </>
        }
      >
        <ReactHookFormDemo />
      </DocSection>

      <DocSection
        title="Uncontrolled"
        description="Use defaultValue without value for local state inside the component."
      >
        <div className="max-w-sm">
          <Combobox items={cities} defaultValue="dn" placeholder="Select a city" />
        </div>
      </DocSection>

      <DocSection title="Sizes" description="size maps to CVA variants on the trigger.">
        <div className="flex max-w-sm flex-col gap-3">
          <Combobox items={cities} size="sm" placeholder="Small (sm)" />
          <Combobox items={cities} size="md" placeholder="Medium (md)" />
          <Combobox items={cities} size="lg" placeholder="Large (lg)" />
        </div>
      </DocSection>

      <DocSection title="Disabled" description="Trigger cannot open the popover.">
        <div className="max-w-sm">
          <Combobox items={cities} disabled placeholder="Disabled" />
        </div>
      </DocSection>

      <DocSection
        title="Custom copy"
        description="Override placeholder, search, and empty-state text."
      >
        <div className="max-w-sm">
          <Combobox
            items={[{ label: 'Alpha', value: 'a' }]}
            placeholder="Pick one"
            searchPlaceholder="Filter options…"
            emptyText="Nothing matched your search."
          />
        </div>
      </DocSection>

      <PropsTable
        props={comboboxProps}
        relatedTypes={[
          {
            name: 'ComboboxItem',
            description: 'Shape of each entry in the items array.',
            fields: comboboxItemFields,
          },
          {
            name: 'ComboboxField',
            description: 'All Combobox props plus layout and react-hook-form wiring.',
            fields: comboboxFieldProps,
          },
        ]}
      />
    </ComponentDocLayout>
  );
}
