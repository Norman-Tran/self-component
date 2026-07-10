import type { DocSectionProps } from './types';

export function DocSection({ title, description, children }: DocSectionProps) {
  return (
    <section className="space-y-4 rounded-xl border bg-card p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description ? (
          <div className="text-sm text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-foreground">
            {description}
          </div>
        ) : null}
      </div>
      {children}
    </section>
  );
}
