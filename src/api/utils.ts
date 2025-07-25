import { useCallback, useState } from 'react';
import { getCharacter, type ApiResponse, type Character } from 'rickmortyapi';
import { SUCCESS, NOT_FOUND_MSG } from '../constants';
import type { CharacterEpisode, RequestState } from '../types';

export const getPrevQuery = (): string => {
  const stored = localStorage.getItem('previous');
  return stored ?? '';
};

export const setSearchQuery = (text: string): void => {
  localStorage.setItem('previous', text.trim());
};

export function useRequest<T>() {
  const [state, setState] = useState<RequestState<ApiResponse<T>>>({
    results: null,
    isLoading: false,
    error: null,
  });

  const requestData = useCallback(
    async (arg: () => Promise<ApiResponse<T>>): Promise<void> => {
      setState((prevState) => ({
        ...prevState,
        error: '',
      }));

      try {
        setState((prevState) => ({
          ...prevState,
          isLoading: true,
        }));
        const data = await arg();

        if (data.status !== SUCCESS) {
          setState((prevState) => ({
            ...prevState,
            error: NOT_FOUND_MSG,
          }));
          return;
        }
        setState((prevState) => ({
          ...prevState,
          results: data,
          error: null,
        }));
      } catch (error) {
        if (error instanceof Error)
          setState((prevState) => ({
            ...prevState,
            error: error.message,
            isLoading: false,
          }));
      } finally {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      }
    },
    []
  );
  return { ...state, requestData };
}

export const getCharacterDetails = async (
  id: number
): Promise<Character | undefined> => {
  const result = await getCharacter(id);
  return result.data;
};

export function ejectEpisodesIds(data: string[]): number[] {
  return [...data].map((episodeUrl) =>
    Number(episodeUrl.charAt(episodeUrl.length - 1))
  );
}

export function showEpisodesNames(
  data: CharacterEpisode | CharacterEpisode[]
): string {
  if (Array.isArray(data)) {
    return [...data]
      .map((n) => {
        return n.name;
      })
      .join(', ');
  }
  return data.name;
}
