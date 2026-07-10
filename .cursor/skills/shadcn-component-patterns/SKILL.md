---
name: shadcn-component-patterns
description: Build or refactor components following shadcn/ui open-code patterns (CVA, compound components, cn, forwardRef) and self-component form/doc conventions. Use when implementing ui primitives, design system wrappers, or composites like Combobox.
---

# shadcn Component Patterns

Read `.cursor/rules/08-shadcn-patterns.mdc` and `03-design-system-components.mdc` first.  
Doc pages: `09-preview-component-docs.mdc` + `component-scaffold` skill.

## Quick checklist

### Primitive (`src/ui/`)

- [ ] `'use client'` when Radix/cmdk/state
- [ ] `cn()` + CVA + `forwardRef` + `displayName`
- [ ] Semantic tokens only; spread `...props`
- [ ] Not exported from `src/index.ts`

### Public wrapper (`src/components/`)

- [ ] Controlled + uncontrolled value props
- [ ] `forwardRef`, `onBlur`, `name`, `id`, `invalid`, `disabled`, `data-testid`
- [ ] Variants in `*-variants.ts`; export `*Variants` + `VariantProps`
- [ ] Compound composition from `ui/` (not mega boolean props)
- [ ] Optional `*Field` for label/error/RHF (`react-hook-form` optional peer)

### Preview docs

- [ ] `DocSection` per variant with `id` + `code`
- [ ] `PropsTable` at bottom
- [ ] Registered in `preview/config/navigation.ts`

### Release

- [ ] Export `src/index.ts`
- [ ] `npm run changeset` if consumer API changed

## CVA template

```ts
import { cva, type VariantProps } from 'class-variance-authority';

export const myVariants = cva('base-classes...', {
  variants: {
    size: { sm: '...', md: '...', lg: '...' },
    variant: { default: '...' },
  },
  defaultVariants: { size: 'md', variant: 'default' },
});

export type MyVariantProps = VariantProps<typeof myVariants>;
```

## Combobox reference (this repo)

| Layer      | Path                                                              |
| ---------- | ----------------------------------------------------------------- |
| Primitives | `@/ui/popover`, `@/ui/command`, `@/ui/button`, `@/ui/label`       |
| Core       | `combobox.tsx` — Popover + Command, controlled hook, `forwardRef` |
| Variants   | `combobox-variants.ts`                                            |
| Field      | `combobox-field.tsx` — `useController`, label, errors             |
| Docs       | `ComboboxPage.tsx` — sections + code snippets + props table       |

## shadcn registry updates

```bash
npm run ui:add -- <name>
```

Review diff; preserve custom CVA keys; do not export raw `ui/` without a wrapper.
