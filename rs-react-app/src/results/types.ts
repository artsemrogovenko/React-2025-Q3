import type { Info, Character } from 'rickmortyapi';

export type ResultsProps = {
  data: Info<Character[]> | null;
  loading?: boolean;
  error?: string | null;
};
export type CardsContainerProps = {
  children: React.ReactNode;
};
