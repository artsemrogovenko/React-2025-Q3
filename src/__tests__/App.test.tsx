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
import { Home } from '../Home';
import { DetailsHandler } from '../details/DetailsHandler';

vi.mock('rickmortyapi');
vi.mock('../hooks/useRequest');

vi.spyOn(console, 'error').mockImplementation(() => {});

const mockResponse: ApiResponse<Info<Character[]>> = {
  status: SUCCESS,
  data: charactersResponse,
  statusMessage: '',
};
const characterResponse: ApiResponse<Character> = {
  status: SUCCESS,
  data: charactersResponse.results?.[0] as Character,
  statusMessage: '',
};

const errorResponse: ApiResponse<Info<Character[]>> = {
  status: NOT_FOUND,
  data: {},
  statusMessage: '',
};

const homeMock = {
  results: mockResponse,
  isLoading: false,
  error: null,
  requestData: vi.fn().mockResolvedValue(mockResponse),
};

const detailsMock = {
  results: characterResponse,
  isLoading: false,
  error: null,
  requestData: vi.fn().mockResolvedValue(characterResponse),
};

vi.mock('../hooks/useRequest', () => ({
  __esModule: true,
  default: vi.fn((component) => {
    if (component.type === Home) return homeMock;
    if (component.type === DetailsHandler) return detailsMock;
    return {};
  }),
}));

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
  afterEach(() => {
    vi.clearAllMocks();
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

describe('checking general functionality', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    vi.clearAllMocks();
    localStorage.setItem(KEY_PREV_QUERY, 'rick');
    vi.mocked(getCharacters).mockResolvedValue(mockResponse);
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
});
