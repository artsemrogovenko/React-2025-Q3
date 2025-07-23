import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { getPrevQuery } from '../api/utils';
import {
  getCharacters,
  type ApiResponse,
  type Character,
  type Info,
} from 'rickmortyapi';
import { vi } from 'vitest';
import { charactersResponse } from './__mock__/charatersData';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { NOT_FOUND_MSG } from '../constants';

vi.mock('../api/utils');
vi.mock('rickmortyapi');
vi.mocked(getPrevQuery).mockReturnValue('gobo');
vi.spyOn(console, 'error').mockImplementation(() => {});

const mockResponse: ApiResponse<Info<Character[]>> = {
  status: 200,
  data: charactersResponse,
  statusMessage: '',
};

const errorResponse: ApiResponse<Info<Character[]>> = {
  status: 404,
  data: {},
  statusMessage: '',
};

describe('App initiation', () => {
  const errorMessage = 'Fetch failed';

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.mocked(getCharacters).mockReturnValue(
      Promise.reject(new Error(errorMessage))
    );
    await act(async () => {
      render(<App />);
    });
  });

  test('Search Render, results, test button', () => {
    const search = screen.getByTestId('character-search-form');
    const results = screen.getByTestId('search-results');
    const testButton = screen.getByRole('button', { name: /Error Button/i });
    expect(search).toBeInTheDocument();
    expect(results).toBeInTheDocument();
    expect(testButton).toBeInTheDocument();
  });
  test('Request for mounting', async () => {
    await expect(getCharacters).toHaveBeenCalledWith({ name: 'gobo' });
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
      render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );
    });
  });

  test('Checking the imitation of an error', async () => {
    const testBtn = screen.getByText('Error Button');
    await userEvent.click(testBtn);

    await waitFor(async () => {
      const resetError = screen.getByTestId('reset-error');
      expect(resetError).toBeInTheDocument();
      await userEvent.click(resetError);
      expect(resetError).not.toBeInTheDocument();
    });
  });

  test('Message for a negative request', () => {
    expect(screen.getByText(NOT_FOUND_MSG)).toBeInTheDocument();
  });
});

test('Accept data with a successful request', async () => {
  vi.mocked(getCharacters).mockResolvedValue(mockResponse);
  const countCards = Number(mockResponse.data.results?.length).valueOf();
  await act(async () => {
    render(<App />);
  });
  expect(screen.getAllByTestId('character-card').length).toBe(countCards);
});
