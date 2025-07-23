import { useCallback, useState } from 'react';
import { getCharacters } from 'rickmortyapi';
import { SUCCESS, NOT_FOUND_MSG } from '../constants';
import type { AppState as RequestCharacterState } from '../types';

export const getPrevQuery = (): string => {
  const stored = localStorage.getItem('previous');
  return stored ?? '';
};

export const setSearchQuery = (text: string): void => {
  localStorage.setItem('previous', text.trim());
};

export function useRequestCharacter() {
  const [state, setState] = useState<RequestCharacterState>({
    results: null,
    isLoading: false,
    error: null,
  });

  const requestCharacter = useCallback(async (query: string): Promise<void> => {
    const searchQuery = query.trim();
    try {
      setState((prevState: RequestCharacterState) => ({
        ...prevState,
        isLoading: true,
      }));
      const characters = await getCharacters({ name: searchQuery });
      if (characters.status !== SUCCESS) {
        setState((prevState: RequestCharacterState) => ({
          ...prevState,
          error: NOT_FOUND_MSG,
        }));
        return;
      }
      setState((prevState: RequestCharacterState) => ({
        ...prevState,
        results: characters,
        error: null,
      }));
    } catch (error) {
      if (error instanceof Error)
        setState((prevState: RequestCharacterState) => ({
          ...prevState,
          error: error.message,
          isLoading: false,
        }));
    } finally {
      setState((prevState: RequestCharacterState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }, []);
  return { ...state, requestCharacter };
}
