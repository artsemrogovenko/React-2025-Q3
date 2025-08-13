import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { type Character, getEpisode } from 'rickmortyapi';
import { type MockedFunction, vi } from 'vitest';
import * as utils from '../api/utils.ts';
import { NOT_FOUND_DETAIL, SUCCESS } from '../constants';
import { DetailsHandler } from '../details/DetailsHandler';
import { charactersResponse } from './__mock__/charatersData';
import { episodesResponse } from './__mock__/episodeData.ts';
import { configureStore } from '@reduxjs/toolkit';
import { rickMortyApi } from '../services/rickMorty.ts';
import detailsSlice from '../store/detailsSlice.ts';
import favoritesSlice from '../store/favoritesSlice.ts';

vi.mock('rickmortyapi', () => ({
  getEpisode: vi.fn(),
}));

const episodesMapper = vi.spyOn(utils, 'showEpisodesNames');
describe('DetailsHandler', () => {
  let mockedGetEpisode: MockedFunction<typeof getEpisode> =
    vi.mocked(getEpisode);
  const mockCharacter = charactersResponse.results?.[0] as Character;
  let testStore: ReturnType<typeof configureStore>;

  beforeEach(() => {
    mockedGetEpisode = vi.mocked(getEpisode);
    testStore = configureStore({
      reducer: {
        details: detailsSlice,
        favorites: favoritesSlice,
        [rickMortyApi.reducerPath]: rickMortyApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rickMortyApi.middleware),
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders spinner when isLoading', () => {
    vi.spyOn(utils, 'getCharacterDetails').mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(mockCharacter), 500);
        })
    );
    render(
      <Provider store={testStore}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <DetailsHandler />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loading.tsx-spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
  });

  test('renders NotFound when character is empty', async () => {
    vi.spyOn(utils, 'getCharacterDetails').mockResolvedValue({});

    await act(async () => {
      render(
        <Provider store={testStore}>
          <MemoryRouter initialEntries={['/?details=1']}>
            <DetailsHandler />
          </MemoryRouter>
        </Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(NOT_FOUND_DETAIL)).toBeInTheDocument();
      expect(screen.getByText('Close')).toBeInTheDocument();
      expect(screen.queryByTestId('details')).not.toBeInTheDocument();
    });
  });

  test('renders Details, not loading.tsx', async () => {
    vi.spyOn(utils, 'getCharacterDetails').mockResolvedValue(mockCharacter);

    await act(async () => {
      render(
        <Provider store={testStore}>
          <MemoryRouter initialEntries={['/?details=1']}>
            <DetailsHandler />
          </MemoryRouter>
        </Provider>
      );
    });
    await waitFor(() => {
      expect(screen.getByTestId('character-details')).toBeInTheDocument();
      expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });

  test('Show episodes names', async () => {
    vi.spyOn(utils, 'getCharacterDetails').mockResolvedValue(mockCharacter);
    mockedGetEpisode.mockResolvedValue({
      data: episodesResponse,
      status: SUCCESS,
      statusMessage: '',
    });
    await act(async () => {
      render(
        <Provider store={testStore}>
          <MemoryRouter initialEntries={['/?details=1']}>
            <DetailsHandler />
          </MemoryRouter>
        </Provider>
      );
    });
    await waitFor(() => {
      expect(episodesMapper).toHaveBeenCalledWith(episodesResponse);
      expect(screen.getByText(/Episodes:/i)).toBeInTheDocument();
    });
    expect(getEpisode).toHaveBeenCalledTimes(1);
  });

  test('Test refresh buttons', async () => {
    vi.spyOn(utils, 'getCharacterDetails').mockResolvedValue(mockCharacter);
    mockedGetEpisode.mockResolvedValue({
      data: episodesResponse,
      status: SUCCESS,
      statusMessage: '',
    });
    await act(async () => {
      render(
        <Provider store={testStore}>
          <MemoryRouter initialEntries={['/?details=1']}>
            <DetailsHandler />
          </MemoryRouter>
        </Provider>
      );
    });
    const episodesIds = utils.ejectEpisodesIds(mockCharacter.episode);
    const storeIdEpisodes = episodesIds.map((id) => String(id)).join(',');
    const dispatchSpy = vi.spyOn(testStore, 'dispatch');

    await waitFor(() => {
      expect(episodesMapper).toHaveBeenCalledWith(episodesResponse);
      expect(
        screen.getByRole('heading', { name: /Episodes:/i })
      ).toBeInTheDocument();
    });

    const reloadEpisodes = screen.getByRole('button', {
      name: /Refresh episodes/i,
    });
    const reloadDetails = screen.getByRole('button', {
      name: /Refresh Details/i,
    });
    act(() => {
      reloadEpisodes.click();
      reloadDetails.click();
    });
    expect(dispatchSpy).toHaveBeenCalledWith(
      rickMortyApi.util.invalidateTags([
        { type: 'Episodes', id: storeIdEpisodes },
      ])
    );
    expect(dispatchSpy).toHaveBeenCalledWith(
      rickMortyApi.util.invalidateTags([
        { type: 'Details', id: mockCharacter.id },
      ])
    );
    expect(getEpisode).toHaveBeenCalledTimes(2);
  });
});
