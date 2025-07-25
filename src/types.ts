import type { ReactNode } from 'react';
import type { ApiResponse, Info, Character, Episode } from 'rickmortyapi';

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
  page: number;
  character: Character | undefined;
  updatePage: (value: number) => void;
  updateCharacter: (value: Character | undefined) => void;
  closeDetails: () => void;
};
