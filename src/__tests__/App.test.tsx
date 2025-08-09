import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  type ApiResponse,
  type Character,
  getCharacters,
  type Info,
} from 'rickmortyapi';
import { vi } from 'vitest';
import {
  APP_ROUTES,
  DEFAULT_PAGE,
  KEY_PREV_QUERY,
  NOT_FOUND,
  NOT_FOUND_MSG,
  SUCCESS,
} from '../constants';
import { charactersResponse } from './__mock__/charatersData';
import { AppWrapper } from './__mock__/wrapper';
import { store } from '../store/store';
import { rickMortyApi } from '../services/rickMorty';

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

const mockSearchParams = {
  name: 'rick',
  page: DEFAULT_PAGE,
};
afterEach(() => {
  vi.clearAllMocks();
});

describe('App initiation', () => {
  const errorMessage = 'Fetch failed';

  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    localStorage.setItem(KEY_PREV_QUERY, mockSearchParams.name);
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
    await expect(getCharacters).toHaveBeenCalledWith(mockSearchParams);
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
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Message for a negative request', async () => {
    await waitFor(() => {
      expect(screen.getByText(NOT_FOUND_MSG)).toBeInTheDocument();
    });
  });
});

test('Accept data with a successful request', async () => {
  vi.mocked(getCharacters).mockReturnValue(Promise.resolve(mockResponse));
  const countCards = Number(mockResponse.data.results?.length).valueOf();

  await act(async () => {
    render(<AppWrapper basename={APP_ROUTES.home} />);
  });
  await waitFor(() => {
    expect(screen.getAllByTestId('character-card').length).toBe(countCards);
  });
});

describe('Checking general functionality', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    localStorage.setItem(KEY_PREV_QUERY, mockSearchParams.name);
    vi.mocked(getCharacters).mockResolvedValue(mockResponse);
    store.dispatch(rickMortyApi.util.resetApiState());
    await act(async () => {
      render(<AppWrapper basename={APP_ROUTES.home} />);
    });
  });

  test('test checkboxes and modal', async () => {
    vi.mocked(getCharacters).mockReturnValue(Promise.resolve(mockResponse));
    const countCards = Number(mockResponse.data.results?.length).valueOf();
    let checkboxes: HTMLInputElement[] = [];
    await waitFor(() => {
      checkboxes = screen.getAllByTestId('mark-favorite') as HTMLInputElement[];
    });
    expect(checkboxes.every((c) => c.checked)).toBe(false);
    expect(checkboxes.length).toBe(countCards);

    expect(screen.queryByTestId('favorites-modal')).not.toBeInTheDocument();

    await waitFor(() => {
      checkboxes.forEach((c) => c.click());
    });

    expect(screen.queryByTestId('favorites-modal')).toBeInTheDocument();
    const modal = screen.queryByTestId('favorites-modal') as HTMLDivElement;
    expect(modal).toHaveTextContent(`${countCards} items selected`);
  });

  test('Test refresh button', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    await waitFor(() => {});
    const reloadPage = screen.getAllByRole('button', {
      name: /Refresh page/i,
    })[0];

    act(() => reloadPage.click());
    expect(dispatchSpy).toHaveBeenCalledWith(
      rickMortyApi.util.invalidateTags([
        { type: 'Characters', id: JSON.stringify(mockSearchParams) },
      ])
    );
    expect(getCharacters).toHaveBeenCalledTimes(2);
  });
});
