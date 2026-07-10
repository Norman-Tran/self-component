import { cn } from '@/lib/utils';

import { DocExample } from './DocExample';
import { useRegisterDocTocItem } from './doc-page-context';
import { slugifySectionTitle } from './slugify';
import type { DocSectionProps } from './types';

export function DocSection({ id, title, description, code, children }: DocSectionProps) {
  const sectionId = id ?? slugifySectionTitle(title);

  useRegisterDocTocItem({ id: sectionId, title, level: 2 });

  const content = code ? <DocExample code={code}>{children}</DocExample> : children;

  return (
    <section id={sectionId} className={cn('scroll-mt-24 space-y-4 rounded-xl border bg-card p-6')}>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description ? (
          <div className="text-sm text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-foreground">
            {description}
          </div>
        ) : null}
      </div>
      {content}
    </section>
  );
}
