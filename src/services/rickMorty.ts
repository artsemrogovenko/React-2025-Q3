import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  type ApiResponse,
  type Character,
  type CharacterFilter,
  getCharacters,
  type Info,
} from 'rickmortyapi';

export const rickMortyApi = createApi({
  reducerPath: 'rickMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      ApiResponse<Info<Character[]>> | null,
      CharacterFilter | undefined
    >({
      extraOptions: {},
      queryFn: async (filters: CharacterFilter | undefined) => {
        const response = await getCharacters(filters);
        return { data: response };
      },
    }),
    getCharacterById: builder.query<ApiResponse<Character>, number>({
      query: (id) => `character/${id}`,
    }),
  }),
});

export const { useGetCharacterByIdQuery, useGetCharactersQuery } = rickMortyApi;
