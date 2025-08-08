import type { Character, Info } from 'rickmortyapi';

export type ResultsProps = {
  data: Info<Character[]> | null;
  loading?: boolean;
  error?: string | null;
  searchParams: {
    name: string;
    page: number;
  };
};
export type CardsContainerProps = {
  children: React.ReactNode;
  style?: string;
};
