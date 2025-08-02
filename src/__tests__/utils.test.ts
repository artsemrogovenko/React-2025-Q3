import { assert, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  calculatePages,
  ejectEpisodesIds,
  getCharacterDetails,
  showEpisodesNames,
} from '../api/utils';
import {
  charactersResponse,
  lastPageResponse,
  pageWithSearch,
  secondPageResponse,
} from './__mock__/charatersData';
import { episodesResponse } from './__mock__/episodeData';
import { type ApiResponse, type Character, getCharacter } from 'rickmortyapi';
import { KEY_PREV_PAGE, KEY_PREV_QUERY, SUCCESS } from '../constants';
import { useLocalStorage } from '../hooks/hooks';

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
    const { getStorageValue } = useLocalStorage();
    expect(getStorageValue(KEY_PREV_PAGE)).toBe('');
    expect(getStorageValue(KEY_PREV_QUERY)).toBe('');
    expect(localStorage.length).toBe(0);
  });

  it('Delete key in storage', () => {
    const { deleteStorageValue } = useLocalStorage();
    localStorage.setItem(KEY_PREV_PAGE, '5');
    expect(localStorage.length).toBe(1);
    deleteStorageValue(KEY_PREV_PAGE);
    expect(localStorage.length).toBe(0);
  });

  it('Clear localstorage', () => {
    localStorage.setItem('prevSearch', 'Rick');
    localStorage.setItem('prevPage', '5');
    const { clearStorageValues } = useLocalStorage();
    clearStorageValues();
    expect(localStorage.getItem('prevSearch')).toBe(null);
    expect(localStorage.getItem('prevPage')).toBe(null);
  });

  it('Verification of successful conservation of a request', () => {
    localStorage.setItem('prevSearch', 'Rick');
    localStorage.setItem('prevPage', '5');
    const { getStorageValue } = useLocalStorage();
    expect(getStorageValue(KEY_PREV_QUERY)).toBe('Rick');
    expect(getStorageValue(KEY_PREV_PAGE)).toBe('5');
    expect(localStorage.getItem).toHaveBeenCalledWith('prevSearch');
    expect(localStorage.getItem).toHaveBeenCalledWith('prevPage');
  });

  it('The old value is successfully overwritten', () => {
    const { setStorageValue, getStorageValue } = useLocalStorage();
    setStorageValue(KEY_PREV_QUERY, 'Gobo');
    expect(localStorage.getItem('prevSearch')).toBe('Gobo');
    setStorageValue(KEY_PREV_QUERY, 'Dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('prevSearch', 'Dark');
    expect(getStorageValue(KEY_PREV_QUERY)).toBe('Dark');
    expect(localStorage.getItem('prevSearch')).not.toBe('Gobo');
    expect(localStorage.getItem('prevSearch')).toBe('Dark');
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
  test('calculate page if search param name include', () => {
    const lastPageObj = calculatePages(pageWithSearch.info);
    expect(lastPageObj.pageNext).toBe(21);
    expect(lastPageObj.pagePrev).toBe(null);
  });
});

test('get character by id', async () => {
  vi.mocked(getCharacter).mockResolvedValue(mockCharacter);
  const result = await getCharacterDetails('1');
  expect(result).toEqual(mockCharacter.data);
  expect(getCharacter).toHaveBeenCalledWith(1);
});
