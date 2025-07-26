import { useCallback, useState } from 'react';
import { type ApiResponse, type Character, getCharacter } from 'rickmortyapi';
import { NOT_FOUND_MSG, SUCCESS } from '../constants';
import type {
  CalculatedPages,
  CharacterEpisode,
  InfoCharacter,
  RequestState,
} from '../types';
import { useSearchParams } from 'react-router';

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
        console.log(data);
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

export function calculatePages(info: InfoCharacter): CalculatedPages {
  const pages: CalculatedPages = { pageNext: null, pagePrev: null };
  console.log(info);
  if (info) {
    const { next, prev } = info;

    if (next !== null) {
      pages.pageNext = Number(next[next.length - 1]);
    }
    if (prev !== null) {
      pages.pagePrev = Number(prev[prev.length - 1]);
    }
  }
  return pages;
}

export function useUpdateLocation() {
  const [searchParams, setSearchParams] = useSearchParams();
  let page: string | null = null;
  let details: string | null = null;

  const updateParam = useCallback((param: string, value: string) => {
    const copyParams = new URLSearchParams(searchParams);
    copyParams.set(param, value);
    setSearchParams(copyParams);
  }, []);
  if (page !== searchParams.get('page')) page = searchParams.get('page');

  if (details !== searchParams.get('details'))
    details = searchParams.get('details');

  return { searchParams, updateParam, page, details };
}
