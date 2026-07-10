import type { PropDocRow, PropsTableProps } from './types';

function PropTable({
  title,
  description,
  rows,
}: {
  title: string;
  description?: string;
  rows: PropDocRow[];
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <h3 className="text-base font-semibold">{title}</h3>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 font-medium text-foreground">Prop</th>
              <th className="px-4 py-3 font-medium text-foreground">Type</th>
              <th className="px-4 py-3 font-medium text-foreground">Default</th>
              <th className="px-4 py-3 font-medium text-foreground">Description</th>
              <th className="px-4 py-3 font-medium text-foreground">Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-b last:border-b-0">
                <td className="px-4 py-3 align-top font-mono text-xs text-foreground">
                  {row.name}
                  {row.required ? (
                    <span className="ml-1.5 rounded bg-destructive/10 px-1 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-destructive">
                      required
                    </span>
                  ) : null}
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                  {row.type}
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                  {row.default ?? '—'}
                </td>
                <td className="px-4 py-3 align-top text-muted-foreground">{row.description}</td>
                <td className="px-4 py-3 align-top text-muted-foreground">{row.notes ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PropsTable({ props, relatedTypes }: PropsTableProps) {
  return (
    <section className="space-y-6 rounded-xl border bg-card p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Props</h2>
        <p className="text-sm text-muted-foreground">
          Public API for this component. Types mirror exports from <code>src/index.ts</code>.
        </p>
      </div>

      <PropTable title="Component props" rows={props} />

      {relatedTypes?.map((related) => (
        <PropTable
          key={related.name}
          title={related.name}
          description={related.description}
          rows={related.fields}
        />
      ))}
    </section>
  );
}
