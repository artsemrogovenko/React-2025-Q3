import { createSlice } from '@reduxjs/toolkit';
import { countries } from '../constants';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: countries,
  reducers: {},
  selectors: {
    getCountries: (state) => state,
  },
});

export const { getCountries } = countriesSlice.selectors;
