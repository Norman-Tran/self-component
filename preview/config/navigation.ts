import type { ComponentType } from 'react';

import { ComboboxPage } from '../pages/components/ComboboxPage';

export type ComponentDemoEntry = {
  slug: string;
  title: string;
  Page: ComponentType;
};

/**
 * Register component doc pages here as wrappers are completed.
 */
export const componentDemos: ComponentDemoEntry[] = [
  { slug: 'combobox', title: 'Combobox', Page: ComboboxPage },
];

export const componentNav = componentDemos.map(({ slug, title }) => ({
  title,
  href: `/components/${slug}`,
}));

export const routes = {
  introduction: '/',
  preview: '/preview',
  component: (slug: string) => `/components/${slug}`,
} as const;
