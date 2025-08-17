import { createApi } from '@reduxjs/toolkit/query/react';
import {
  type ApiResponse,
  type Character,
  type CharacterFilter,
  getCharacters,
  getEpisode,
  type Info,
} from 'rickmortyapi';
import { fakeBaseQuery } from '@reduxjs/toolkit/query';
import { getCharacterDetails } from '../api/utils.ts';
import type { CharacterEpisode } from '../types.ts';
import { NOT_FOUND, NOT_FOUND_DETAIL, NOT_FOUND_MSG } from '../constants.ts';

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
        const response = await getCharacters(filters);
        if (response.status === NOT_FOUND) {
          return {
            error: { status: response.status, message: NOT_FOUND_MSG },
          };
        }
        return { data: response };
      },
      providesTags: (_result, _error, arg) => [
        { type: 'Characters', id: JSON.stringify(arg) },
        'Characters',
      ],
    }),
    getCharacterById: builder.query<Character | object, string | null>({
      queryFn: async (id: string | null) => {
        const response = await getCharacterDetails(id);
        if ('status' in response) {
          if (response.status === NOT_FOUND) {
            return {
              error: { status: response.status, message: NOT_FOUND_DETAIL },
            };
          }
          return { data: response.result };
        }
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
