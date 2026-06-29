import type { ComponentType } from 'react';

export type ComponentDemoEntry = {
  slug: string;
  title: string;
  Page: ComponentType;
};

/**
 * Register component doc pages here as wrappers are completed.
 * Sidebar and routes are derived from this list.
 *
 * @example
 * import { ButtonPage } from '../pages/components/ButtonPage';
 * export const componentDemos = [
 *   { slug: 'button', title: 'Button', Page: ButtonPage },
 * ];
 */
export const componentDemos: ComponentDemoEntry[] = [];

export const componentNav = componentDemos.map(({ slug, title }) => ({
  title,
  href: `/components/${slug}`,
}));

export const routes = {
  introduction: '/',
  preview: '/preview',
  component: (slug: string) => `/components/${slug}`,
} as const;
