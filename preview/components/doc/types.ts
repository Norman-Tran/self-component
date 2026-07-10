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

export type DocSectionProps = {
  title: string;
  description?: ReactNode;
  children: ReactNode;
};

export type PropsTableProps = {
  props: PropDocRow[];
  /** Document related types (e.g. ComboboxItem) below the main props table */
  relatedTypes?: {
    name: string;
    description?: string;
    fields: PropDocRow[];
  }[];
};
