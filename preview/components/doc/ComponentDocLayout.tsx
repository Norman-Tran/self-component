import type { ComponentDocLayoutProps } from './types';

export function ComponentDocLayout({ title, description, children }: ComponentDocLayoutProps) {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <div className="text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-foreground">
          {description}
        </div>
      </header>

      <div className="space-y-8">{children}</div>
    </div>
  );
}
