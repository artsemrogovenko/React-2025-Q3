import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { getEpisode, type Character } from 'rickmortyapi';
import { vi, type MockedFunction } from 'vitest';
import * as utils from '../api/utils.ts';
import { NOT_FOUND_DETAIL, SUCCESS } from '../constants';
import { DetailsHandler } from '../details/DetailsHandler';
import { store } from '../store/store.ts';
import { charactersResponse } from './__mock__/charatersData';
import { episodesResponse } from './__mock__/episodeData.ts';

vi.mock('rickmortyapi', () => ({
  getEpisode: vi.fn(),
}));

const episodesMapper = vi.spyOn(utils, 'showEpisodesNames');
describe('DetailsHandler', () => {
  let mockedGetEpisode: MockedFunction<typeof getEpisode>;
  const mockCharacter = charactersResponse.results?.[0] as Character;
  beforeEach(() => {
    mockedGetEpisode = vi.mocked(getEpisode);
    vi.clearAllMocks();
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
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <DetailsHandler />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
  });

  test('renders NotFound when character is empty', async () => {
    vi.spyOn(utils, 'getCharacterDetails').mockResolvedValue({});

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/?details=1']}>
            <DetailsHandler />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(screen.getByText(NOT_FOUND_DETAIL)).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
  });

  test('renders Details, not loading', async () => {
    vi.spyOn(utils, 'getCharacterDetails').mockResolvedValue(mockCharacter);

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/?details=1']}>
            <DetailsHandler />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(screen.getByTestId('character-details')).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
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
        <Provider store={store}>
          <MemoryRouter initialEntries={['/?details=1']}>
            <DetailsHandler />
          </MemoryRouter>
        </Provider>
      );
    });
    expect(episodesMapper).toHaveBeenCalledWith(episodesResponse);
    expect(screen.getByText(/Episodes:/i)).toBeInTheDocument();
  });
});
