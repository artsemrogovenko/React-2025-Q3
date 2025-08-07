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

export const getCharacterDetails = async (
  id: string | null
): Promise<Character | object> => {
  if (id !== null) {
    try {
      const idSearch = Number(id);
      const result = await getCharacter(idSearch);
      return result.data;
    } catch {
      return EMPTY_OBJECT;
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
  const rows = characters
    .map((character) => Object.values(character).join(','))
    .join('\n');
  return `${header}\n${rows}`;
}

export function getErrorMessage(error: unknown): string | null {
  if (error === null) return null;
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && 'error' in error)
    return error?.error as string;
  if (error instanceof Error) return error.message;

  if (typeof error === 'object') {
    if ('status' in error && 'data' in error) {
      const fetchError = error as FetchBaseQueryError;
      if (typeof fetchError.data === 'string') return fetchError.data;
      if (typeof fetchError.data === 'object' && fetchError.data !== null) {
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
