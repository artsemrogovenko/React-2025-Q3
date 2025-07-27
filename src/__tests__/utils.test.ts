import { assert, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  calculatePages,
  ejectEpisodesIds,
  getCharacterDetails,
  showEpisodesNames,
  useLocalStorage,
} from '../api/utils';
import { act, renderHook } from '@testing-library/react';
import { useEffect } from 'react';
import {
  charactersResponse,
  lastPageResponse,
  secondPageResponse,
} from './__mock__/charatersData';
import { episodesResponse } from './__mock__/episodeData';
import { type ApiResponse, type Character, getCharacter } from 'rickmortyapi';
import { SUCCESS } from '../constants';

vi.mock('rickmortyapi');
const character = charactersResponse.results?.[0] as Character;
const mockCharacter: ApiResponse<Character> = {
  status: SUCCESS,
  data: character,
  statusMessage: '',
};

describe('localStorage utils', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem');
    vi.spyOn(Storage.prototype, 'setItem');
    localStorage.clear();
  });

  it('Initially, there are no value', () => {
    const { result } = renderHook(() => useLocalStorage());
    expect(result.current.prevSearch).toBe('');
    expect(result.current.prevPage).toBe('');
  });

  it('Verification of successful conservation of a request', () => {
    localStorage.setItem('prevSearch', 'Rick');
    localStorage.setItem('prevPage', '5');
    const { result } = renderHook(() => useLocalStorage());
    expect(localStorage.getItem).toHaveBeenCalledWith('prevSearch');
    expect(localStorage.getItem).toHaveBeenCalledWith('prevPage');
    expect(result.current.prevSearch).toBe('Rick');
    expect(result.current.prevPage).toBe('5');
  });

  it('The old value is successfully overwritten', () => {
    const { result } = renderHook(() => useLocalStorage());
    act(() => {
      result.current.updatePrevSearch('Gobo');
    });
    expect(localStorage.getItem('prevSearch')).toBe('Gobo');

    act(() => {
      result.current.updatePrevSearch('Dark');
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('prevSearch', 'Dark');
    expect(result.current.prevSearch).toBe('Dark');
    expect(localStorage.getItem('prevSearch')).not.toBe('Gobo');
    expect(localStorage.getItem('prevSearch')).toBe('Dark');
  });

  test('should handle NaN values correctly', () => {
    const { result } = renderHook(() => useLocalStorage());
    act(() => {
      result.current.updatePrevPage(5);
    });
    expect(localStorage.getItem('prevPage')).toBe('5');

    act(() => {
      result.current.updatePrevPage(NaN);
    });
    expect(result.current.prevPage).toBe('');
    expect(localStorage.getItem('prevPage')).toBe('');
  });

  test('should reset to new value after rerender', () => {
    const { result, rerender } = renderHook(
      ({ number }) => {
        const hook = useLocalStorage();
        useEffect(() => {
          hook.updatePrevPage(number);
        }, [number]);
        return hook;
      },
      { initialProps: { number: 1 } }
    );
    expect(result.current.prevPage).toBe('1');
    expect(localStorage.getItem('prevPage')).toBe('1');

    rerender({ number: 10 });

    expect(result.current.prevPage).toBe('10');
    expect(localStorage.getItem('prevPage')).toBe('10');
  });
});

describe('Mapper utils', () => {
  test('should get episodes number from url', () => {
    const urlsEpisodes = charactersResponse?.results?.[0].episode;
    const countUrls = urlsEpisodes?.length;
    const numberArray = ejectEpisodesIds(urlsEpisodes as string[]);

    assert.isArray(numberArray);
    expect(countUrls).toBe(numberArray.length);
  });

  test('should join names episodes if array', () => {
    const episodes = episodesResponse;
    const text = showEpisodesNames(episodes);
    const countCommas = text.match(/,/g)?.length as number;

    expect(countCommas).toBe(episodes.length - 1);
    expect(text.length).greaterThan(countCommas);
  });

  test('show name episodes one episode(no array)', () => {
    const episode = episodesResponse[0];
    const text = showEpisodesNames(episode);
    expect(text).not.include(',');
    expect(text.length).toBeGreaterThan(0);
  });
});

describe('pagination utils', () => {
  test('calculate on first page ', () => {
    const firstPageObj = calculatePages(charactersResponse.info);
    expect(firstPageObj.pagePrev).toBe(null);
    expect(firstPageObj.pageNext).toBe(2);
  });
  test('calculate on second page', () => {
    const secondPageObj = calculatePages(secondPageResponse.info);
    expect(secondPageObj.pagePrev).toBe(1);
    expect(secondPageObj.pageNext).toBe(3);
  });
  test('calculate on last page', () => {
    const lastPageObj = calculatePages(lastPageResponse.info);
    expect(lastPageObj.pagePrev).toBe(41);
    expect(lastPageObj.pageNext).toBe(null);
  });
  test('calculate if there is no info', () => {
    const firstPageObj = calculatePages(undefined);
    expect(firstPageObj.pagePrev).toBe(null);
    expect(firstPageObj.pageNext).toBe(null);
  });
});

test('get character by id', async () => {
  vi.mocked(getCharacter).mockResolvedValue(mockCharacter);
  const result = await getCharacterDetails(1);
  expect(result).toEqual(mockCharacter.data);
  expect(getCharacter).toHaveBeenCalledWith(1);
});
