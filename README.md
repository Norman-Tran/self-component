# self-component

A personal React component library built on [shadcn/ui](https://ui.shadcn.com) with a clean, extensible three-layer architecture.

## Goals

- Own the full source (fork shadcn primitives, no dependency on an npm shadcn package)
- Separate **primitives** (`ui/`) from the **design system** (`components/`)
- Support the **shadcn CLI** for adding new primitives quickly
- Publish via GitHub for reuse across projects

## Source structure

```text
self-component/
├── components.json          # shadcn CLI config (aliases, tailwind, style)
├── package.json             # Scripts, exports, peerDependencies
├── tailwind.config.ts       # Tailwind content paths
├── tsconfig.json            # TypeScript for dev + preview
├── tsconfig.build.json      # Build library → dist/
├── vite.config.ts           # Preview app (root: preview/)
├── preview/                 # Internal demo app, not published
│   ├── App.tsx
│   ├── main.tsx
│   └── index.html
└── src/
    ├── index.ts             # Public API — exports components/ only
    ├── lib/
    │   ├── utils.ts         # cn() helper
    │   └── tokens.ts        # Design tokens (size, variant)
    ├── styles/
    │   └── globals.css      # CSS variables + Tailwind v4
    ├── ui/                  # Layer 1: shadcn primitives (internal)
    │   ├── button.tsx
    │   ├── input.tsx
    │   ├── popover.tsx
    │   ├── command.tsx
    │   └── label.tsx
    ├── components/          # Layer 2: design system (public)
    │   ├── button.tsx
    │   ├── input.tsx
    │   └── combobox.tsx
    └── hooks/               # Custom hooks (shadcn CLI alias)
```

### Code organization rules

| Layer         | Directory         | Responsibility                                    | Exported?            |
| ------------- | ----------------- | ------------------------------------------------- | -------------------- |
| Primitives    | `src/ui/`         | Radix + Tailwind, base styling                    | No                   |
| Design system | `src/components/` | Consumer API, label, validation, controlled state | Yes (`src/index.ts`) |
| Preview       | `preview/`        | Demo and visual development                       | No                   |

**Clean code principles:**

1. Do not add business logic to `src/ui/`
2. Each public component lives in one file under `src/components/`
3. Export only through `src/index.ts`
4. Add new primitives via shadcn CLI when possible, avoid manual copy

## Requirements

- Node.js 20+
- npm or yarn

## Clone and develop

```bash
git clone https://github.com/<username>/self-component.git
cd self-component
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Scripts

| Script                          | Description                          |
| ------------------------------- | ------------------------------------ |
| `npm run dev`                   | Run preview app                      |
| `npm run build`                 | Build library to `dist/`             |
| `npm run build:clean`           | Remove `dist/` then rebuild          |
| `npm run ui:add -- <name>`      | Add shadcn primitive to `src/ui/`    |
| `npm run format`                | Format code with Prettier            |
| `npm run changeset`             | Create a changeset for the changelog |
| `npm run changeset:status`      | Check missing changesets (vs `dev`)  |
| `npm run changeset:status:main` | Check before PR `dev` → `main`       |

## Add shadcn components via CLI

`components.json` is configured with aliases:

- `@/ui` → `src/ui`
- `@/components` → `src/components`
- `@/lib/utils` → `src/lib/utils`

Example — add Dialog:

```bash
npm run ui:add -- dialog
```

Then create a wrapper at `src/components/dialog.tsx` if you need a custom API, and export it in `src/index.ts`.

## Build library

```bash
npm run build
```

Output:

- `dist/index.js` — ESM bundle
- `dist/index.d.ts` — TypeScript types
- `src/styles/globals.css` — stylesheet (import directly)

## Install in another project

### Option 1: Install from GitHub (recommended)

Push the repo to GitHub, then in the consumer project:

```bash
npm install github:<username>/self-component#main
```

Or with a tag/release:

```bash
npm install github:<username>/self-component#v0.1.0
```

### Option 2: npm link (local development)

In `self-component`:

```bash
npm run build
npm link
```

In the consumer project:

```bash
npm link self-component
```

### Option 3: file path (monorepo / local)

```json
{
  "dependencies": {
    "self-component": "file:../self-component"
  }
}
```

## Integrate into a React project

### 1. Install peer dependencies

```bash
npm install react react-dom tailwindcss @tailwindcss/postcss \
  @radix-ui/react-slot @radix-ui/react-popover @radix-ui/react-label \
  class-variance-authority clsx tailwind-merge cmdk lucide-react
```

(Install additional Radix packages when you add new components.)

### 2. Import CSS

In your app entry file (e.g. `main.tsx`):

```tsx
import 'self-component/styles.css';
```

### 3. Configure Tailwind

Ensure Tailwind scans the library source:

```ts
// tailwind.config.ts
export default {
  content: ['./src/**/*.{ts,tsx}', './node_modules/self-component/dist/**/*.{js,ts,tsx}'],
};
```

For Tailwind v4, add `@source` if needed:

```css
@import 'tailwindcss';
@source "../node_modules/self-component/dist";
```

### 4. Use components

```tsx
import { Button, Combobox, Input } from 'self-component';

export function Example() {
  return (
    <div className="space-y-4">
      <Input label="Name" placeholder="Enter name" />
      <Button variant="solid">Save</Button>
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

## Current public API

| Export                    | Description                                                    |
| ------------------------- | -------------------------------------------------------------- |
| `Button`                  | Design system button (variants: solid, secondary, ghost, link) |
| `Input`                   | Input with label, hint, and error                              |
| `Combobox`                | Single select with search, controlled/uncontrolled             |
| `cn`                      | Tailwind class merge utility                                   |
| `SizeType`, `VariantType` | Design tokens                                                  |

## Add a new component

1. Add primitive: `npm run ui:add -- <component>`
2. Create wrapper: `src/components/<name>.tsx`
3. Export: `src/index.ts`
4. Demo: `preview/App.tsx`
5. Build: `npm run build`

## Compared to 247-components-ui

Key improvements:

- **Single namespace** — no parallel v1/v2
- **Clear `ui/` vs `components/` split** — avoids duplicate primitives
- **Standard controlled API** — Combobox supports `value` / `onValueChange`
- **README + per-folder README** — layer rules documented
- **No internal preset dependency** — standard shadcn CSS variables

## License

MIT

## Contributing

Git workflow (`feature/` / `fix/` → `dev` → `main`), PRs, and changelog: [CONTRIBUTING.md](./CONTRIBUTING.md).

Changelog: [CHANGELOG.md](./CHANGELOG.md).
