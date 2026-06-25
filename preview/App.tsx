export default function App() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 p-8">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">self-component preview</p>
        <h1 className="text-3xl font-semibold tracking-tight">Component playground</h1>
        <p className="text-muted-foreground">
          No public components yet. Add wrappers in <code className="text-sm">src/components/</code>{' '}
          and demo them here.
        </p>
      </header>
    </main>
  );
}
