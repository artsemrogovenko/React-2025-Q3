import type { ApiResponse, Info, Character } from 'rickmortyapi';

export type AppProps = Record<string, never>;

export type AppState = {
  results: ApiResponse<Info<Character[]>> | null;
  isLoading: boolean;
  error: string | null;
  query: string;
  fall: boolean;
};
