# Component doc pages

One page per public component. Register in `preview/config/navigation.ts`.

Full doc shell reference: `preview/components/doc/README.md`  
Cursor rule: `.cursor/rules/09-preview-component-docs.mdc`

## Page anatomy

```text
ComponentDocLayout
├── header (title, description)
├── DocSection × N          ← compositions (Preview / Code tabs)
└── PropsTable              ← API reference (always last)
    └── DocTableOfContents  ← sticky right sidebar (automatic)
```

## Minimal template

```tsx
import { ComponentDocLayout, DocSection, PropsTable, type PropDocRow } from '../../components/doc';
import { MyComponent } from '@/index';

const myComponentProps: PropDocRow[] = [
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the control.',
  },
];

export function MyComponentPage() {
  return (
    <ComponentDocLayout title="MyComponent" description={<p>Short intro.</p>}>
      <DocSection
        id="default"
        title="Default"
        code={`import { MyComponent } from 'self-component';

export function Example() {
  return <MyComponent />;
}`}
      >
        <MyComponent />
      </DocSection>

      <PropsTable id="props" props={myComponentProps} />
    </ComponentDocLayout>
  );
}
```

## Section checklist (per variant)

| Item          | Notes                                                  |
| ------------- | ------------------------------------------------------ |
| `id`          | Explicit kebab-case (`react-hook-form`, not auto-slug) |
| `title`       | Matches TOC label                                      |
| `description` | When behavior is not obvious                           |
| `code`        | Copyable snippet; import `'self-component'`            |
| `children`    | Live demo; keep in sync with code                      |

## URL anchors

```text
/components/<slug>#<section-id>
/components/combobox#props
```

Share links work on load; TOC highlights active section while scrolling.

## PropDocRow

| Field         | Purpose                         |
| ------------- | ------------------------------- |
| `name`        | Prop name                       |
| `type`        | TypeScript type as string       |
| `description` | What it does                    |
| `default`     | Default value if any            |
| `required`    | Shows badge                     |
| `notes`       | RHF, CVA, controlled mode, etc. |

Use `relatedTypes` on `PropsTable` for item types and `*Field`-only props.

## Recommended section order

**Form controls:** Controlled → React Hook Form → Uncontrolled → Sizes → Disabled → Edge cases → Props

**Display:** Default → Variants → States → Props

## Before PR

- [ ] Every `DocSection` has `id` + `code`
- [ ] Props table matches `src/index.ts` exports
- [ ] `npm run dev` — TOC sticky, hash scroll, Copy button
- [ ] Changeset if `src/` API changed
