import { useState } from 'react';

import { Button, Combobox, Input } from '@/index';

const comboboxItems = [
  { label: 'Hà Nội', value: 'hn', keywords: 'ha noi capital' },
  { label: 'Đà Nẵng', value: 'dn', keywords: 'da nang' },
  { label: 'TP. Hồ Chí Minh', value: 'hcm', keywords: 'sai gon ho chi minh' },
  { label: 'Cần Thơ', value: 'ct', keywords: 'can tho' },
];

export default function App() {
  const [city, setCity] = useState<string | undefined>('hn');
  const [email, setEmail] = useState('');

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 p-8">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">self-component preview</p>
        <h1 className="text-3xl font-semibold tracking-tight">Component playground</h1>
        <p className="text-muted-foreground">
          Preview app dùng để phát triển và kiểm tra component trước khi publish.
        </p>
      </header>

      <section className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Button</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="solid">Solid</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Input</h2>
        <Input
          label="Email"
          required
          hint="Dùng email công ty của bạn."
          placeholder="name@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </section>

      <section className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Combobox</h2>
        <Combobox
          items={comboboxItems}
          value={city}
          onValueChange={setCity}
          placeholder="Chọn thành phố"
        />
        <p className="text-sm text-muted-foreground">Giá trị đã chọn: {city ?? '(trống)'}</p>
      </section>
    </main>
  );
}
