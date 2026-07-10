import * as React from 'react';
import { useLocation } from 'react-router-dom';

const SCROLL_OFFSET = 96;

function scrollToHash(hash: string, behavior: ScrollBehavior = 'smooth') {
  const id = hash.replace(/^#/, '');
  if (!id) return;

  const element = document.getElementById(id);
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior });
}

export function useHashScroll(sectionIds: string[]) {
  const location = useLocation();

  React.useEffect(() => {
    if (!location.hash) return;

    const frame = window.requestAnimationFrame(() => {
      scrollToHash(location.hash, location.hash ? 'auto' : 'smooth');
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, sectionIds.join(',')]);

  React.useEffect(() => {
    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
}

export function useActiveSection(sectionIds: string[]) {
  const location = useLocation();
  const [activeId, setActiveId] = React.useState<string | undefined>(() =>
    location.hash ? location.hash.replace(/^#/, '') : undefined,
  );

  React.useEffect(() => {
    if (!sectionIds.length) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element != null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -55% 0px', threshold: [0, 0.25, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds.join(',')]);

  React.useEffect(() => {
    if (location.hash) {
      setActiveId(location.hash.replace(/^#/, ''));
    }
  }, [location.hash]);

  return activeId;
}
