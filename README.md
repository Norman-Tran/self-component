# self-component

Thư viện React component cá nhân, xây trên [shadcn/ui](https://ui.shadcn.com) với kiến trúc 3 lớp gọn và dễ mở rộng.

## Mục tiêu

- Sở hữu toàn bộ source (fork shadcn primitives, không phụ thuộc npm package shadcn)
- Tách rõ **primitives** (`ui/`) và **design system** (`components/`)
- Hỗ trợ **shadcn CLI** để thêm primitive mới nhanh chóng
- Publish qua GitHub để tái sử dụng ở nhiều dự án

## Cấu trúc source

```text
self-component/
├── components.json          # Cấu hình shadcn CLI (aliases, tailwind, style)
├── package.json             # Scripts, exports, peerDependencies
├── tailwind.config.ts       # Tailwind content paths
├── tsconfig.json            # TypeScript cho dev + preview
├── tsconfig.build.json      # Build library → dist/
├── vite.config.ts           # Preview app (root: preview/)
├── preview/                 # App demo nội bộ, không publish
│   ├── App.tsx
│   ├── main.tsx
│   └── index.html
└── src/
    ├── index.ts             # Public API — chỉ export components/
    ├── lib/
    │   ├── utils.ts         # cn() helper
    │   └── tokens.ts        # Design tokens (size, variant)
    ├── styles/
    │   └── globals.css      # CSS variables + Tailwind v4
    ├── ui/                  # Lớp 1: shadcn primitives (nội bộ)
    │   ├── button.tsx
    │   ├── input.tsx
    │   ├── popover.tsx
    │   ├── command.tsx
    │   └── label.tsx
    ├── components/          # Lớp 2: design system (public)
    │   ├── button.tsx
    │   ├── input.tsx
    │   └── combobox.tsx
    └── hooks/               # Custom hooks (dành cho shadcn CLI alias)
```
 
### Quy tắc tổ chức code

| Lớp           | Thư mục           | Trách nhiệm                                      | Export ra ngoài?    |
| ------------- | ----------------- | ------------------------------------------------ | ------------------- |
| Primitives    | `src/ui/`         | Radix + Tailwind, styling cơ bản                 | Không               |
| Design system | `src/components/` | API sử dụng, label, validation, controlled state | Có (`src/index.ts`) |
| Preview       | `preview/`        | Demo và phát triển trực quan                     | Không               |

**Nguyên tắc clean code:**

1. Không thêm business logic vào `src/ui/`
2. Mỗi component public nằm trong một file ở `src/components/`
3. Chỉ export qua `src/index.ts`
4. Thêm primitive mới bằng shadcn CLI, không copy thủ công nếu có thể

## Yêu cầu

- Node.js 20+
- npm hoặc yarn

## Clone và phát triển

```bash
git clone https://github.com/<username>/self-component.git
cd self-component
npm install
npm run dev
```

Mở trình duyệt tại địa chỉ Vite in ra (thường là `http://localhost:5173`).

### Scripts

| Script                     | Mô tả                               |
| -------------------------- | ----------------------------------- |
| `npm run dev`              | Chạy preview app                    |
| `npm run build`            | Build library vào `dist/`           |
| `npm run build:clean`      | Xóa `dist/` rồi build lại           |
| `npm run ui:add -- <name>` | Thêm shadcn primitive vào `src/ui/` |
| `npm run format`           | Format code với Prettier            |
| `npm run changeset`              | Tạo changeset cho changelog              |
| `npm run changeset:status`       | Kiểm tra thiếu changeset (so với `dev`)  |
| `npm run changeset:status:main`  | Kiểm tra trước PR `dev` → `main`         |

## Thêm component shadcn bằng CLI

Repo đã cấu hình `components.json` với alias:

- `@/ui` → `src/ui`
- `@/components` → `src/components`
- `@/lib/utils` → `src/lib/utils`

Ví dụ thêm Dialog:

```bash
npm run ui:add -- dialog
```

Sau đó tạo wrapper ở `src/components/dialog.tsx` nếu cần API riêng, rồi export trong `src/index.ts`.

## Build library

```bash
npm run build
```

Output:

- `dist/index.js` — ESM bundle
- `dist/index.d.ts` — TypeScript types
- `src/styles/globals.css` — stylesheet (import trực tiếp)

## Cài vào dự án khác

### Cách 1: Cài từ GitHub (khuyến nghị)

Push repo lên GitHub, rồi trong dự án consumer:

```bash
npm install github:<username>/self-component#main
```

Hoặc với tag/release:

```bash
npm install github:<username>/self-component#v0.1.0
```

### Cách 2: npm link (phát triển local)

Trong repo `self-component`:

```bash
npm run build
npm link
```

Trong dự án consumer:

```bash
npm link self-component
```

### Cách 3: file path (monorepo / local)

```json
{
  "dependencies": {
    "self-component": "file:../self-component"
  }
}
```

## Tích hợp vào dự án React

### 1. Cài peer dependencies

```bash
npm install react react-dom tailwindcss @tailwindcss/postcss \
  @radix-ui/react-slot @radix-ui/react-popover @radix-ui/react-label \
  class-variance-authority clsx tailwind-merge cmdk lucide-react
```

(Cài thêm Radix package tương ứng khi bạn thêm component mới.)

### 2. Import CSS

Trong entry file của app (ví dụ `main.tsx`):

```tsx
import 'self-component/styles.css';
```

### 3. Cấu hình Tailwind

Đảm bảo Tailwind quét source của thư viện:

```ts
// tailwind.config.ts
export default {
  content: ['./src/**/*.{ts,tsx}', './node_modules/self-component/dist/**/*.{js,ts,tsx}'],
};
```

Với Tailwind v4, thêm `@source` nếu cần:

```css
@import 'tailwindcss';
@source "../node_modules/self-component/dist";
```

### 4. Sử dụng component

```tsx
import { Button, Combobox, Input } from 'self-component';

export function Example() {
  return (
    <div className="space-y-4">
      <Input label="Tên" placeholder="Nhập tên" />
      <Button variant="solid">Lưu</Button>
      <Combobox
        items={[
          { label: 'Option A', value: 'a' },
          { label: 'Option B', value: 'b' },
        ]}
        onValueChange={(value) => console.log(value)}
      />
    </div>
  );
}
```

## Public API hiện tại

| Export                    | Mô tả                                                         |
| ------------------------- | ------------------------------------------------------------- |
| `Button`                  | Button design system (variant: solid, secondary, ghost, link) |
| `Input`                   | Input có label, hint, error                                   |
| `Combobox`                | Single select có search, controlled/uncontrolled              |
| `cn`                      | Utility merge class Tailwind                                  |
| `SizeType`, `VariantType` | Design tokens                                                 |

## Quy trình thêm component mới

1. Thêm primitive: `npm run ui:add -- <component>`
2. Tạo wrapper: `src/components/<name>.tsx`
3. Export: `src/index.ts`
4. Demo: `preview/App.tsx`
5. Build: `npm run build`

## So với 247-components-ui

Cải tiến chính:

- **Một namespace duy nhất** — không chia v1/v2 song song
- **`ui/` vs `components/` rõ ràng** — tránh duplicate primitives
- **Controlled API chuẩn** — Combobox hỗ trợ `value` / `onValueChange`
- **README + folder README** — quy tắc từng lớp được ghi rõ
- **Không phụ thuộc preset nội bộ** — dùng CSS variables chuẩn shadcn

## License

MIT

## Đóng góp

Quy trình Git (`feature/` / `fix/` → `dev` → `main`), PR và changelog: [CONTRIBUTING.md](./CONTRIBUTING.md).

Lịch sử thay đổi: [CHANGELOG.md](./CHANGELOG.md).
