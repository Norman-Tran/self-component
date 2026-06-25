export function IntroductionPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Introduction</h1>
        <p className="text-lg text-muted-foreground">
          Personal React component library built on shadcn/ui primitives.
        </p>
      </div>

      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          This preview app documents and demos public components from{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-foreground">src/components/</code>.
          Primitives in{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-foreground">src/ui/</code> stay
          internal.
        </p>
        <p>
          Use the <strong className="text-foreground">Components</strong> section for finished
          wrappers. Use <strong className="text-foreground">Preview</strong> to experiment before a
          component is ready for the sidebar.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-4 text-sm">
        <p className="font-medium text-foreground">Add a component to the sidebar</p>
        <ol className="mt-2 list-inside list-decimal space-y-1 text-muted-foreground">
          <li>
            Create wrapper in <code>src/components/&lt;name&gt;.tsx</code>
          </li>
          <li>
            Export from <code>src/index.ts</code>
          </li>
          <li>
            Add a page in <code>preview/pages/components/</code>
          </li>
          <li>
            Register in <code>preview/config/navigation.ts</code>
          </li>
        </ol>
      </div>
    </div>
  );
}
