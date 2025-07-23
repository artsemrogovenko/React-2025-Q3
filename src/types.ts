import type { ApiResponse, Info, Character } from 'rickmortyapi';

export type AppState = {
  results: ApiResponse<Info<Character[]>> | null;
  isLoading: boolean;
  error: string | null;
};
