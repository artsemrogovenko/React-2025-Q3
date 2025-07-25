import { useCallback, useState } from 'react';
import {
  getCharacter,
  getCharacters,
  getEpisode,
  type Character,
} from 'rickmortyapi';
import { SUCCESS, NOT_FOUND_MSG } from '../constants';
import type {
  CharacterEpisode,
  searchCharacterState,
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
  const [state, setState] = useState<searchCharacterState>({
    results: null,
    isLoading: false,
    error: null,
  });

  const getCharacterDetails = async (
    id: number
  ): Promise<Character | undefined> => {
    // if (state.results?.data.results) {
    //   const characters = state.results?.data.results;
    //   if (characters.length > 0) {
    //     return characters.filter((c) => c.id === id).pop();
    //   }
    // }
    // return;
    const result = await getCharacter(id);
    return result.data;
  };

  const searchCharacter = useCallback(async (query: string): Promise<void> => {
    setState((prevState) => ({
      ...prevState,
      error: '',
    }));
    const searchQuery = query.trim();
    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      const characters = await getCharacters({ name: searchQuery });
      if (characters.status !== SUCCESS) {
        setState((prevState) => ({
          ...prevState,
          error: NOT_FOUND_MSG,
        }));
        return;
      }
      setState((prevState) => ({
        ...prevState,
        results: characters,
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
  }, []);
  return { ...state, searchCharacter, getCharacterDetails };
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
