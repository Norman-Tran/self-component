---
name: component-scaffold
description: Scaffold a new public component in self-component following 3-layer architecture and shadcn patterns. Use when adding a UI component, shadcn primitive, or composite like Combobox/DatePicker.
---

# Component Scaffold (self-component)

Use **shadcn-component-patterns** skill for CVA/compound rules.

## Workflow

1. **Primitive needed?** From repo root:

   ```bash
   npm run ui:add -- <shadcn-name>
   ```

   Skip if already in `src/ui/`.

2. **Create public API** in `src/components/`:
   - Simple: `src/components/<name>.tsx`
   - Composite: `src/components/<name>/` → `types.ts`, `*-variants.ts`, `<name>.tsx`, `index.ts`
   - Import `@/ui/*`, `@/lib/*` only — never reverse import from `ui/`

3. **Export** in `src/index.ts`:

   ```ts
   export { MyComponent } from './components/my-component';
   export type { MyComponentProps } from './components/my-component';
   ```

4. **Docs page** `preview/pages/components/<Name>Page.tsx`

5. **Register** in `preview/config/navigation.ts`:

   ```ts
   export const componentDemos = [
     { slug: 'my-component', title: 'My Component', Page: MyComponentPage },
   ];
   ```

6. **Changeset** if `src/` or public API changed: `npm run changeset`

7. **Verify**:

   ```bash
   npm run build
   npm run format:check
   ```

## Layers

| Layer | Path | Export? |
| --- | --- | --- |
| Primitives | `src/ui/` | No |
| Design system | `src/components/` | Yes via `index.ts` |
| Preview | `preview/` | No |

## Reference

- Composite scaffold: `src/components/combobox/`
- shadcn rules: `.cursor/rules/08-shadcn-patterns.mdc`
