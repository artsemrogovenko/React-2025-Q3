import { type SyntheticEvent } from 'react';
import { type Character, getCharacter } from 'rickmortyapi';
import type {
  CalculatedPages,
  CharacterEpisode,
  InfoCharacter,
} from '../types';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { EMPTY_OBJECT } from '../constants.ts';
import type { DetailsResponse } from './types.ts';

export const getCharacterDetails = async (
  id: string | null
): Promise<DetailsResponse | typeof EMPTY_OBJECT> => {
  if (id !== null) {
    try {
      const idSearch = Number(id);
      const { data, status } = await getCharacter(idSearch);
      return { result: data, status: status };
    } catch (error) {
      if (error instanceof Error)
        return { result: EMPTY_OBJECT, status: error.message };
    }
  }
  return EMPTY_OBJECT;
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

export function stopEvent<T extends Event | SyntheticEvent>(event: T): T {
  event.preventDefault();
  event.stopPropagation();
  return event;
}

export function makeCsv(array: Character[]) {
  const data = formatData(array);
  return new Blob([data], { type: 'text/csv;charset=utf-8' });
}

export function formatData(characters: Character[]): string {
  const header = Object.keys(characters[0]).join(',');
  const clonedArray = characters.map((obj) => JSON.parse(JSON.stringify(obj)));
  const rows = clonedArray
    .map((character) => {
      const copy = { ...character };
      if ('episode' in copy) {
        Object.defineProperty(copy, 'episode', {
          value: `[${ejectEpisodesIds(copy.episode)}]`,
        });
      }
      if ('location' in copy)
        Object.defineProperty(copy, 'location', { value: copy.location.name });
      if ('origin' in copy)
        Object.defineProperty(copy, 'origin', { value: copy.origin.name });
      return copy;
    })
    .map((character) => Object.values(character).join(','))
    .join('\n');
  return `${header}\n${rows}`;
}

export const downloadCsv = (
  link: React.RefObject<HTMLAnchorElement | null>,
  favorites: Character[],
  count: number
) => {
  const blob = makeCsv(favorites);
  const url = URL.createObjectURL(blob);

  if (link.current) {
    link.current.href = url;
    link.current.download = `${count}_items.csv`;
    link.current.click();
  }
  URL.revokeObjectURL(url);
};

export function getErrorMessage(error: unknown): string | null {
  if (error === null) return null;
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && 'error' in error)
    return error.error as string;
  if (error instanceof Error) return error.message;

  if (typeof error === 'object') {
    if ('status' in error && 'data' in error) {
      const fetchError = error as FetchBaseQueryError;
      if (typeof fetchError.data === 'string') return fetchError.data;
      if (typeof fetchError.data === 'object' && !!fetchError.data) {
        return (
          (fetchError.data as { message?: string }).message || 'Unknown error'
        );
      }
      return `${fetchError.status}`;
    }
    if ('message' in error) {
      return (error as SerializedError).message || 'Unknown error';
    }
  }
  return null;
}
