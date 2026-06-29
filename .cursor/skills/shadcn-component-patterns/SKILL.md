---
name: shadcn-component-patterns
description: Build or refactor components following shadcn/ui open-code patterns (CVA, compound components, cn, forwardRef). Use when implementing ui primitives, design system wrappers, or composites like Combobox.
---

# shadcn Component Patterns

Read `.cursor/rules/08-shadcn-patterns.mdc` first. Use with `component-scaffold` skill for full workflow.

## Quick checklist

- [ ] Primitive in `src/ui/` — Radix + `cn()` + CVA + `forwardRef`
- [ ] Public wrapper in `src/components/` — controlled API, labels/errors if form field
- [ ] Variants in CVA file; `defaultVariants` set
- [ ] Compound exports for complex UI (not 20 boolean props)
- [ ] Semantic Tailwind tokens only
- [ ] Demo page + `preview/config/navigation.ts` entry
- [ ] Export `src/index.ts` + `npm run changeset` if consumer API changed

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

## Compound component template

```tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const Root = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={cn(className)} {...props} />
);

const Part = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
  ({ className, ...props }, ref) => (
    <button ref={ref} className={cn('...', className)} {...props} />
  ),
);
Part.displayName = 'MyComponentPart';

export { Root, Part };
```

## Combobox in this repo

- Primitives: `@/ui/popover`, `@/ui/command`, `@/ui/button`
- Public: `src/components/combobox/` — variants in `combobox-variants.ts` (customize per design spec)
- Pattern: Popover trigger + Command list (shadcn classic); extend when user defines variants

## shadcn registry updates

```bash
npm run ui:add -- <name>
```

Diff review — merge styling, preserve custom CVA keys.
