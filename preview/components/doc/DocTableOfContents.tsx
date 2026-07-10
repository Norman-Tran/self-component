import { cn } from '@/lib/utils';

import { useDocPage } from './doc-page-context';
import { useActiveSection, useHashScroll } from './use-hash-scroll';

export function DocTableOfContents() {
  const { tocItems } = useDocPage();
  const sectionIds = tocItems.map((item) => item.id);

  useHashScroll(sectionIds);
  const activeId = useActiveSection(sectionIds);

  if (!tocItems.length) return null;

  return (
    <aside className="hidden w-52 shrink-0 self-start xl:sticky xl:top-16 xl:block">
      <nav
        aria-label="On this page"
        className="max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain pb-8"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          On this page
        </p>
        <ul className="space-y-1 border-l">
          {tocItems.map((item) => {
            const isActive = activeId === item.id;

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    '-ml-px block border-l py-1 pl-3 text-sm transition-colors',
                    isActive
                      ? 'border-primary font-medium text-foreground'
                      : 'border-transparent text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground',
                    item.level === 3 && 'pl-5',
                  )}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
