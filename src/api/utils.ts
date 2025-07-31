import { type SyntheticEvent, useCallback, useState } from 'react';
import { type ApiResponse, type Character, getCharacter } from 'rickmortyapi';
import { NOT_FOUND_MSG, SUCCESS } from '../constants';
import type {
  CalculatedPages,
  CharacterEpisode,
  InfoCharacter,
  RequestState,
} from '../types';
import { useSearchParams } from 'react-router';

export function useLocalStorage() {
  const [prevSearch, setPrevSearch] = useState<string>(
    () => localStorage.getItem('prevSearch') ?? ''
  );
  const [prevPage, setPrevPage] = useState<string>(
    () => localStorage.getItem('prevPage') ?? ''
  );

  const updatePrevSearch = useCallback((text: string) => {
    const value = text.trim();
    setPrevSearch(() => {
      localStorage.setItem('prevSearch', value);
      return value;
    });
  }, []);
  const updatePrevPage = useCallback((page: string | number) => {
    let value: string = '';
    if (typeof page === 'number') {
      value = !isNaN(page) ? page.toString() : '';
    } else value = page;

    setPrevPage(() => {
      localStorage.setItem('prevPage', value);
      return value;
    });
  }, []);
  return { prevSearch, prevPage, updatePrevPage, updatePrevSearch };
}

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
  id: string | null
): Promise<Character | undefined> => {
  console.log(id);
  const empty = undefined;
  if (id !== null) {
    try {
      const idSearch = Number(id);
      const result = await getCharacter(idSearch);
      return result.data;
    } catch {
      return empty;
    }
  }
  return empty;
};

export function ejectEpisodesIds(data: string[]): number[] {
  return [...data].map((episodeUrl) => {
    const indexSlash = episodeUrl.lastIndexOf('/');
    return Number(episodeUrl.slice(indexSlash + 1));
  });
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
  const keyword = 'page=';
  const delimiter = '&';
  const getPage = (url: string) => {
    const indexPageNumber = url.indexOf(keyword) + keyword.length;
    const delimiterIndex = url.indexOf(delimiter);
    return delimiterIndex < indexPageNumber
      ? url.slice(indexPageNumber)
      : url.slice(indexPageNumber, url.indexOf(delimiter));
  };
  if (info) {
    const { next, prev } = info;
    if (next !== null) pages.pageNext = Number(getPage(next));
    if (prev !== null) pages.pagePrev = Number(getPage(prev));
  }
  return pages;
}

export function useUpdateLocation() {
  const [searchParams, setSearchParams] = useSearchParams();
  let page: string | null = null;
  let details: string | null = null;

  const updateParam = (param: string, value: string) => {
    const copyParams = new URLSearchParams(searchParams);
    copyParams.set(param, value);
    setSearchParams(copyParams);
  };

  const removeParam = useCallback((param: string) => {
    const copyParams = new URLSearchParams(searchParams);
    copyParams.delete(param);
    setSearchParams(copyParams);
  }, []);

  if (page !== searchParams.get('page')) page = searchParams.get('page');

  if (details !== searchParams.get('details'))
    details = searchParams.get('details');

  return { searchParams, updateParam, page, details, removeParam };
}

export function stopEvent<T extends Event | SyntheticEvent>(event: T): T {
  event.preventDefault();
  event.stopPropagation();
  return event;
}
