import type { ApiResponse, Info, Character, Episode } from 'rickmortyapi';

type RequestState = { isLoading: boolean; error: string | null };

export type CharacterEpisode = Episode & {
  id: number;
  name: string;
  url: string;
  created: string;
};

export type RequestCharacterState = RequestState & {
  results: ApiResponse<Info<Character[]>> | null;
};

export type RequestEpisodeState = RequestState & {
  results: ApiResponse<CharacterEpisode | CharacterEpisode[]> | null;
};
