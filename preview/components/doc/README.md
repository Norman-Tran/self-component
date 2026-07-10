# Doc shell (`preview/components/doc/`)

Preview-only building blocks for component documentation pages. Not published with the library.

## Components

| Export                | Role                                                       |
| --------------------- | ---------------------------------------------------------- |
| `ComponentDocLayout`  | Page shell: header, content column, TOC column             |
| `DocSection`          | One composition block; optional `code` → Preview/Code tabs |
| `DocExample`          | Preview / Code tab UI + Copy button (used by `DocSection`) |
| `DocTableOfContents`  | Sticky right sidebar; hash links; active section highlight |
| `PropsTable`          | Props API table + optional related types                   |
| `slugifySectionTitle` | Fallback anchor from title                                 |

## Context

`DocPageProvider` (inside `ComponentDocLayout`) collects TOC entries when `DocSection` / `PropsTable` mount.

## DocSection

```tsx
<DocSection
  id="controlled"
  title="Controlled"
  description="Optional hint."
  code={`import { Combobox } from 'self-component';
// ...`}
>
  {/* Preview tab content */}
</DocSection>
```

Without `code`, children render directly (no tabs).

## PropsTable

```tsx
<PropsTable
  id="props"
  title="Props"
  props={propRows}
  relatedTypes={[{ name: 'MyItem', fields: itemRows }]}
/>
```

## Hash navigation

- Sections need `id` on the DOM (`scroll-mt-24` offset for sticky header)
- TOC links: `#<id>`
- `useHashScroll` scrolls on load / hash change
- `useActiveSection` highlights TOC while scrolling

## Adding a new doc primitive

Keep preview-only. Do not export from `src/index.ts`. Document in `.cursor/rules/09-preview-component-docs.mdc`.
