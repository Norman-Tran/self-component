---
name: component-scaffold
description: Scaffold a new public component in self-component following 3-layer architecture, form-control contract, and preview doc pages. Use when adding a UI component, shadcn primitive, or composite like Combobox/DatePicker.
---

# Component Scaffold (self-component)

Use **shadcn-component-patterns** for CVA/compound rules.  
Rules: `03-design-system-components.mdc`, `09-preview-component-docs.mdc`.

## Workflow

1. **Primitive needed?**

   ```bash
   npm run ui:add -- <shadcn-name>
   ```

   Skip if already in `src/ui/`.

2. **Public API** in `src/components/`:
   - Simple: `src/components/<name>.tsx`
   - Composite: `src/components/<name>/` → `types.ts`, `*-variants.ts`, `<name>.tsx`, optional `<name>-field.tsx`, `index.ts`
   - Form controls: `forwardRef`, controlled/uncontrolled, `onBlur`, `invalid`, optional `*Field` + RHF

3. **Export** in `src/index.ts`

4. **Doc page** `preview/pages/components/<Name>Page.tsx`:
   - `ComponentDocLayout` + `DocSection` (each with `id`, `code`) + `PropsTable`
   - See `preview/pages/components/README.md`

5. **Register** `preview/config/navigation.ts`

6. **Changeset** if `src/` or public API changed: `npm run changeset`

7. **Verify**

   ```bash
   npm run check
   npm run dev
   ```

## Layers

| Layer         | Path                        | Export?            |
| ------------- | --------------------------- | ------------------ |
| Primitives    | `src/ui/`                   | No                 |
| Design system | `src/components/`           | Yes via `index.ts` |
| Doc shell     | `preview/components/doc/`   | No                 |
| Doc pages     | `preview/pages/components/` | No                 |

## Reference implementations

| Topic             | Path                                         |
| ----------------- | -------------------------------------------- |
| Composite + CVA   | `src/components/combobox/`                   |
| RHF field wrapper | `src/components/combobox/combobox-field.tsx` |
| Doc page          | `preview/pages/components/ComboboxPage.tsx`  |
| Doc shell         | `preview/components/doc/`                    |

## Doc page quick checklist

- [ ] Explicit `id` on every `DocSection` and `PropsTable`
- [ ] `code` string per section (import `'self-component'`)
- [ ] `PropDocRow[]` + `relatedTypes` for nested types / `*Field`
- [ ] TOC + hash + Copy verified in dev
