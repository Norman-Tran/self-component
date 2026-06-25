---
name: component-scaffold
description: Scaffold a new public component in self-component following the 3-layer architecture. Use when adding a new UI component, shadcn primitive, or composite like Combobox/DatePicker.
---

# Component Scaffold (self-component)

## Workflow

1. **Primitive needed?** Run from repo root:
   ```bash
   npm run ui:add -- <shadcn-name>
   ```
   Skip if primitive already exists in `src/ui/`.

2. **Create wrapper** at `src/components/<name>.tsx`:
   - Import from `@/ui/*` and `@/lib/*`
   - Controlled + uncontrolled props where applicable
   - `data-testid`, label/error for form controls

3. **Export** in `src/index.ts`:
   ```ts
   export { MyComponent } from './components/my-component';
   export type { MyComponentProps } from './components/my-component';
   ```

4. **Demo** in `preview/App.tsx`.

5. **Verify**:
   ```bash
   npm run build
   ```

## Layer rules

- `src/ui/` — Radix + styling only
- `src/components/` — public API
- Never export from `src/ui/` in `index.ts`

## Reference implementations

- Simple wrapper: `src/components/button.tsx`
- Form field: `src/components/input.tsx`
- Composite: `src/components/combobox.tsx`
