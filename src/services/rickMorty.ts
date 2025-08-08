import { createApi } from '@reduxjs/toolkit/query/react';
import {
  type ApiResponse,
  type Character,
  type CharacterFilter,
  getCharacters,
  getEpisode,
  type Info,
} from 'rickmortyapi';
import {
  fakeBaseQuery,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { getCharacterDetails, getErrorMessage } from '../api/utils.ts';
import type { CharacterEpisode } from '../types.ts';
import { NOT_FOUND_MSG, SUCCESS } from '../constants.ts';

export const rickMortyApi = createApi({
  reducerPath: 'rickMortyApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Characters', 'Details', 'Episodes'],
  endpoints: (builder) => ({
    getCharacters: builder.query<
      ApiResponse<Info<Character[]>>,
      CharacterFilter | undefined
    >({
      queryFn: async (filters?: CharacterFilter) => {
        try {
          const response = await getCharacters(filters);
          if (response.status !== SUCCESS) {
            throw {
              status: response.status,
              data: NOT_FOUND_MSG,
            } as FetchBaseQueryError;
          }
          return { data: response };
        } catch (error) {
          return {
            error: {
              status: 'FETCH_ERROR',
              error: getErrorMessage(error),
            },
          };
        }
      },
      providesTags: (_result, _error, arg) => [
        { type: 'Characters', id: JSON.stringify(arg) },
        'Characters',
      ],
    }),
    getCharacterById: builder.query<Character | object, string | null>({
      queryFn: async (id: string | null) => {
        const response = await getCharacterDetails(id);
        return { data: response };
      },
      providesTags: (_result, _error, arg) =>
        arg ? [{ type: 'Details', id: arg }, 'Details'] : ['Details'],
    }),
    getEpisodesNames: builder.query<
      ApiResponse<CharacterEpisode | CharacterEpisode[]> | null,
      number[]
    >({
      queryFn: async (numbers: number[]) => {
        const response = await getEpisode(numbers);
        return { data: response };
      },
      providesTags: (_result, _error, arg) =>
        arg
          ? [
              {
                type: 'Episodes',
                id: arg.map((id) => String(id)).join(','),
              },
              'Episodes',
            ]
          : ['Episodes'],
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  useGetEpisodesNamesQuery,
} = rickMortyApi;
