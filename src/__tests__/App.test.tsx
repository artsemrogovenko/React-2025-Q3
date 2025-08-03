import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  type ApiResponse,
  type Info,
  type Character,
  getCharacters,
} from 'rickmortyapi';
import { vi } from 'vitest';
import {
  SUCCESS,
  NOT_FOUND,
  NOT_FOUND_MSG,
  APP_ROUTES,
  KEY_PREV_QUERY,
  DEFAULT_PAGE,
} from '../constants';
import { charactersResponse } from './__mock__/charatersData';
import { AppWrapper } from './__mock__/wrapper';

vi.mock('rickmortyapi');
vi.mock('../hooks/useRequest');
vi.spyOn(console, 'error').mockImplementation(() => {});

const mockResponse: ApiResponse<Info<Character[]>> = {
  status: SUCCESS,
  data: charactersResponse,
  statusMessage: '',
};

const errorResponse: ApiResponse<Info<Character[]>> = {
  status: NOT_FOUND,
  data: {},
  statusMessage: '',
};

describe('App initiation', () => {
  const errorMessage = 'Fetch failed';
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    vi.clearAllMocks();
    localStorage.setItem(KEY_PREV_QUERY, 'rick');
    vi.mocked(getCharacters).mockRejectedValue(new Error(errorMessage));

    await act(async () => {
      render(<AppWrapper basename={APP_ROUTES.home} />);
    });
  });

  test('Search inputs, results ', () => {
    const search = screen.getByTestId('character-search-form');
    const results = screen.getByTestId('search-results');
    expect(search).toBeInTheDocument();
    expect(results).toBeInTheDocument();
  });
  test('Request for mounting', async () => {
    await expect(getCharacters).toHaveBeenCalledWith({
      name: 'rick',
      page: DEFAULT_PAGE,
    });
  });

  test('Network error response', async () => {
    await expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});

describe('App interaction', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    vi.mocked(getCharacters).mockResolvedValue(errorResponse);

    await act(async () => {
      render(<AppWrapper basename={APP_ROUTES.home} />);
    });
  });

  test('Message for a negative request', () => {
    expect(screen.getByText(NOT_FOUND_MSG)).toBeInTheDocument();
  });
});

test('Accept data with a successful request', async () => {
  vi.mocked(getCharacters).mockReturnValue(Promise.resolve(mockResponse));
  const countCards = Number(mockResponse.data.results?.length).valueOf();

  await act(async () => {
    render(<AppWrapper basename={APP_ROUTES.home} />);
  });
  expect(screen.getAllByTestId('character-card').length).toBe(countCards);
});
