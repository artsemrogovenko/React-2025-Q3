import { useCallback, useState } from 'react';
import { getCharacters, getEpisode } from 'rickmortyapi';
import { SUCCESS, NOT_FOUND_MSG } from '../constants';
import type {
  CharacterEpisode,
  RequestCharacterState,
  RequestEpisodeState,
} from '../types';

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
    setState((prevState: RequestCharacterState) => ({
      ...prevState,
      error: '',
    }));
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

export function useRequestEpisode() {
  const [state, setState] = useState<RequestEpisodeState>({
    results: null,
    isLoading: false,
    error: null,
  });

  const requestEpisodes = useCallback(
    async (episodeIds: number[]): Promise<void> => {
      setState((prevState) => ({
        ...prevState,
        error: '',
      }));

      try {
        setState((prevState) => ({
          ...prevState,
          isLoading: true,
        }));
        const episodes = await getEpisode(episodeIds);

        if (episodes.status !== SUCCESS) {
          setState((prevState) => ({
            ...prevState,
            error: NOT_FOUND_MSG,
          }));
          return;
        }
        setState((prevState) => ({
          ...prevState,
          results: episodes,
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
  return { ...state, requestEpisodes };
}

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
