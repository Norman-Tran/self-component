# Design system components

Public-facing components exported from `src/index.ts`.

## Rules

- Compose primitives from `../ui/`
- Add controlled props, labels, validation UI, test ids
- One component per file, named exports

## Getting started

1. Add a primitive if needed: `npm run ui:add -- <name>`
2. Create a wrapper: `src/components/<name>.tsx`
3. Export in `src/index.ts`
4. Demo in `preview/App.tsx`
