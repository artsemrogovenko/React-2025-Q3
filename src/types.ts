import type { ReactNode } from 'react';
import type { Character, Episode } from 'rickmortyapi';

export type RequestState<T> = {
  results: T | null;
  isLoading: boolean;
  error: string | null;
};

export type CharacterEpisode = Episode & {
  id: number;
  name: string;
  url: string;
  created: string;
};

export type AppProviderProps = {
  children: ReactNode;
};

export type AppContextType = {
  currentPage: number;
  character: Character | object;
  pages: CalculatedPages;
  updateCurrentPage: (value: number) => void;
  updateCharacter: (value: Character | object) => void;
  closeDetails: () => void;
  updatePages: (value: CalculatedPages) => void;
  resetUrl: () => void;
  query: string;
  updateQuery: (value: string) => void;
  isVisibleDetails: boolean;
};

export type InfoCharacter =
  | {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    }
  | undefined;

export type CalculatedPages = {
  pageNext: number | null;
  pagePrev: number | null;
};

export type SearchObj = {
  page: string | undefined;
  description: string | undefined;
};
