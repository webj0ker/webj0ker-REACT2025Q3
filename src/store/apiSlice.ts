import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hp-api.onrender.com/api/' }),
  endpoints: (builder) => ({
    getSpells: builder.query({
      query: () => 'spells',
    }),
    getSpellByName: builder.query({
      query: (name: string) => `spells?name=${encodeURIComponent(name)}`,
    }),
  }),
});

export const { useGetSpellsQuery, useGetSpellByNameQuery } = apiSlice;
