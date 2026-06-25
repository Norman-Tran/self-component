export function PreviewPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Preview</h1>
        <p className="text-muted-foreground">
          Sandbox for components under active development. Content here is not listed in Components
          until the wrapper is ready.
        </p>
      </div>

      <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Build your next component demo in{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-foreground">preview/App.tsx</code> or a
          dedicated file imported here.
        </p>
      </div>
    </div>
  );
}
