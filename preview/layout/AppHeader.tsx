import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            SC
          </span>
          <span className="hidden sm:inline">self-component</span>
        </Link>
        <div className="flex-1" />
        <span className="text-xs text-muted-foreground">Preview · internal</span>
      </div>
    </header>
  );
}
