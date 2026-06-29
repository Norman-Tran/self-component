import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

import { componentNav, routes } from '../config/navigation';
import { cn } from '@/lib/utils';

function SidebarNavLink({
  to,
  children,
  end,
}: {
  to: string;
  children: React.ReactNode;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'block rounded-md px-2 py-1.5 text-sm transition-colors',
          isActive
            ? 'bg-accent font-medium text-accent-foreground'
            : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
        )
      }
    >
      {children}
    </NavLink>
  );
}

export function AppSidebar() {
  const { pathname } = useLocation();
  const isComponentsActive = pathname.startsWith('/components');
  const [componentsOpen, setComponentsOpen] = useState(isComponentsActive);

  useEffect(() => {
    if (isComponentsActive) {
      setComponentsOpen(true);
    }
  }, [isComponentsActive]);

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background md:block">
      <nav className="sticky top-14 flex h-[calc(100vh-3.5rem)] flex-col gap-6 overflow-y-auto p-4">
        <div className="space-y-1">
          <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">Getting started</p>
          <SidebarNavLink to={routes.introduction} end>
            Introduction
          </SidebarNavLink>
        </div>

        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setComponentsOpen((open) => !open)}
            className={cn(
              'flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
              isComponentsActive
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            Components
            {componentsOpen ? (
              <ChevronDown className="size-4 shrink-0" />
            ) : (
              <ChevronRight className="size-4 shrink-0" />
            )}
          </button>

          {componentsOpen && (
            <div className="ml-2 space-y-0.5 border-l pl-2">
              {componentNav.length === 0 ? (
                <p className="px-2 py-1.5 text-xs text-muted-foreground">No components yet</p>
              ) : (
                componentNav.map((item) => (
                  <SidebarNavLink key={item.href} to={item.href}>
                    {item.title}
                  </SidebarNavLink>
                ))
              )}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">Development</p>
          <SidebarNavLink to={routes.preview}>Preview</SidebarNavLink>
        </div>
      </nav>
    </aside>
  );
}
