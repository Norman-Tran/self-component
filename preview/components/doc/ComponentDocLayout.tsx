import type { ComponentDocLayoutProps } from './types';
import { DocPageProvider } from './doc-page-context';
import { DocTableOfContents } from './DocTableOfContents';

export function ComponentDocLayout({ title, description, children }: ComponentDocLayoutProps) {
  return (
    <DocPageProvider>
      <div className="flex items-start gap-10 xl:gap-14">
        <div className="min-w-0 flex-1 space-y-10">
          <header className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            <div className="text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-foreground">
              {description}
            </div>
          </header>

          <div className="space-y-8">{children}</div>
        </div>

        <DocTableOfContents />
      </div>
    </DocPageProvider>
  );
}
