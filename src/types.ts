import type { ReactNode } from 'react';
import type { ApiResponse, Character, Episode, Info } from 'rickmortyapi';

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

export type searchCharacterState = RequestState<ApiResponse<Info<Character[]>>>;

export type RequestEpisodeState = RequestState<
  ApiResponse<CharacterEpisode | CharacterEpisode[]>
>;

export type AppProviderProps = {
  children: ReactNode;
};

export type AppContextType = {
  currentPage: number;
  character: Character | undefined;
  pages: CalculatedPages;
  updateCurrentPage: (value: number) => void;
  updateCharacter: (value: Character | undefined) => void;
  closeDetails: () => void;
  updatePages: (value: CalculatedPages) => void;
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
