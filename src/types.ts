import type { ReactNode } from 'react';
import type { ApiResponse, Info, Character, Episode } from 'rickmortyapi';

type RequestState = { isLoading: boolean; error: string | null };

export type CharacterEpisode = Episode & {
  id: number;
  name: string;
  url: string;
  created: string;
};

export type searchCharacterState = RequestState & {
  results: ApiResponse<Info<Character[]>> | null;
};

export type RequestEpisodeState = RequestState & {
  results: ApiResponse<CharacterEpisode | CharacterEpisode[]> | null;
};

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
