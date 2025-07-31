import { type SyntheticEvent } from 'react';
import { type Character, getCharacter } from 'rickmortyapi';
import type {
  CalculatedPages,
  CharacterEpisode,
  InfoCharacter,
} from '../types';

export const getCharacterDetails = async (
  id: string | null
): Promise<Character | object> => {
  const empty = {};
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

export function stopEvent<T extends Event | SyntheticEvent>(event: T): T {
  event.preventDefault();
  event.stopPropagation();
  return event;
}
