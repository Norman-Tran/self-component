import { useState } from 'react';

import { Combobox } from '@/index';

const cities = [
  { label: 'Hanoi', value: 'hn', keywords: 'ha noi capital' },
  { label: 'Da Nang', value: 'dn' },
  { label: 'Ho Chi Minh City', value: 'hcm', keywords: 'sai gon' },
];

export function ComboboxPage() {
  const [value, setValue] = useState<string | undefined>('hn');

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Combobox</h1>
        <p className="text-muted-foreground">
          Single-select with search. Built from Popover + Command primitives (shadcn pattern).
          Custom variants — define in <code className="text-sm">combobox-variants.ts</code>.
        </p>
      </div>

      <section className="space-y-4 rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">Default</h2>
        <Combobox
          items={cities}
          value={value}
          onValueChange={setValue}
          placeholder="Select a city"
          data-testid="combobox-demo"
        />
        <p className="text-sm text-muted-foreground">Selected: {value ?? '(empty)'}</p>
      </section>

      <section className="space-y-4 rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">Sizes</h2>
        <div className="flex flex-col gap-3 max-w-sm">
          <Combobox items={cities} size="sm" placeholder="Small" />
          <Combobox items={cities} size="md" placeholder="Medium" />
          <Combobox items={cities} size="lg" placeholder="Large" />
        </div>
      </section>
    </div>
  );
}
