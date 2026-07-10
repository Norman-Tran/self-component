# Design system components

Public-facing components exported from `src/index.ts`.

## Layers

```text
src/ui/           → primitives (internal)
src/components/   → consumer API (exported)
preview/          → docs + demos (imports @/index)
```

## Add a component

1. Primitive if needed: `npm run ui:add -- <name>`
2. Create wrapper under `src/components/` (see layout below)
3. Export from `src/index.ts`
4. Doc page: `preview/pages/components/<Name>Page.tsx` — see `preview/pages/components/README.md`
5. Register in `preview/config/navigation.ts`
6. `npm run changeset` when public API changes

## File layout

**Simple:** `src/components/button.tsx`

**Composite:** folder per feature — reference `combobox/`:

| File                   | Purpose                                                |
| ---------------------- | ------------------------------------------------------ |
| `types.ts`             | `ComboboxItem`, shared types                           |
| `combobox-variants.ts` | CVA trigger variants                                   |
| `combobox.tsx`         | Core component (`forwardRef`, controlled/uncontrolled) |
| `combobox-field.tsx`   | Label + error + optional `react-hook-form`             |
| `index.ts`             | Public exports for this feature                        |

## Form control checklist

- [ ] `value` / `defaultValue` / `onValueChange`
- [ ] `forwardRef` on focusable element
- [ ] `onBlur`, `name`, `id`
- [ ] `invalid` + `aria-invalid`
- [ ] `disabled`, `data-testid`
- [ ] Optional `*Field` with label, hint, error, RHF `control` + `name`

## Rules

- Import `@/ui/*` and `@/lib/*` only — never the reverse
- One public surface per feature; named exports
- `displayName` on `forwardRef` components
- Product variants in CVA files, semantic tokens only

Detailed rules: `.cursor/rules/03-design-system-components.mdc`
