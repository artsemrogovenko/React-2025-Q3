import type { ReactNode } from 'react';

export type DetailsBlockType = {
  children: ReactNode;
};

export type NotFoundProps = {
  reason?: string;
  hideButton?: boolean;
};
