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

export const rickMortyApi = createApi({
  reducerPath: 'rickMortyApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Get'],
  endpoints: (builder) => ({
    getCharacters: builder.query<
      ApiResponse<Info<Character[]>>,
      CharacterFilter | undefined
    >({
      queryFn: async (filters: CharacterFilter | undefined) => {
        const response = await getCharacters(filters);
        return { data: response };
      },
    }),
    getCharacterById: builder.query<Character | object, string | null>({
      queryFn: async (id: string | null) => {
        const response = await getCharacterDetails(id);
        return { data: response };
      },
    }),
    getEpisodesNames: builder.query<
      ApiResponse<CharacterEpisode | CharacterEpisode[]> | null,
      number[]
    >({
      queryFn: async (numbers: number[]) => {
        const response = await getEpisode(numbers);
        return { data: response };
      },
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  useGetEpisodesNamesQuery,
} = rickMortyApi;
