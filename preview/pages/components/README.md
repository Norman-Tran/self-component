# Component doc pages

One page per public component. Register each page in `preview/config/navigation.ts`.

## Layout pattern

Use the shared doc shell so every component page follows the same structure:

1. **Header** — title + short description (`ComponentDocLayout`)
2. **Compositions** — one `DocSection` per example, top to bottom (`DocSection`)
3. **Props table** — API reference at the bottom (`PropsTable`)

```tsx
import { ComponentDocLayout, DocSection, PropsTable, type PropDocRow } from '../../components/doc';
import { MyComponent } from '@/index';

const myComponentProps: PropDocRow[] = [
  {
    name: 'value',
    type: 'string',
    description: 'Controlled value.',
    notes: 'Optional note for edge cases.',
  },
];

export function MyComponentPage() {
  return (
    <ComponentDocLayout title="MyComponent" description={<p>Short intro.</p>}>
      <DocSection title="Default">
        <MyComponent />
      </DocSection>

      <DocSection title="Disabled" description="Optional section hint.">
        <MyComponent disabled />
      </DocSection>

      <PropsTable
        props={myComponentProps}
        relatedTypes={[
          {
            name: 'MyItem',
            description: 'Related type used in props.',
            fields: [
              /* PropDocRow[] */
            ],
          },
        ]}
      />
    </ComponentDocLayout>
  );
}
```

### PropDocRow fields

| Field         | Purpose                                    |
| ------------- | ------------------------------------------ |
| `name`        | Prop name                                  |
| `type`        | TypeScript type as string                  |
| `description` | What the prop does                         |
| `default`     | Default value if any                       |
| `required`    | Shows required badge                       |
| `notes`       | Extra context (controlled mode, CVA, etc.) |

Components live in `preview/components/doc/`. They are preview-only and not published.
