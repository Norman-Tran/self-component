import type { ReactNode } from 'react';

export type PropDocRow = {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
  notes?: string;
};

export type ComponentDocLayoutProps = {
  title: string;
  description: ReactNode;
  children: ReactNode;
};

export type DocExampleProps = {
  /** Source snippet shown in the Code tab (copyable) */
  code: string;
  children: ReactNode;
};

export type DocSectionProps = {
  /** URL hash anchor, e.g. `controlled` → `#controlled` */
  id?: string;
  title: string;
  description?: ReactNode;
  /** When set, wraps children in Preview / Code tabs */
  code?: string;
  children: ReactNode;
};

export type PropsTableProps = {
  /** URL hash anchor for the props section. Defaults to `props`. */
  id?: string;
  /** TOC label. Defaults to `Props`. */
  title?: string;
  props: PropDocRow[];
  /** Document related types (e.g. ComboboxItem) below the main props table */
  relatedTypes?: {
    name: string;
    description?: string;
    fields: PropDocRow[];
  }[];
};
