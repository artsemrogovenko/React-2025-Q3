import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ProfileType } from '../components/types';

const initialState: ProfileType = {
  age: '',
  name: '',
  email: '',
  password: '',
  gender: null,
  picture: '',
  country: '',
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ProfileType>) => ({
      ...state,
      ...action.payload,
    }),
  },
  selectors: {
    getData: (state) => state,
  },
});

export const { setData } = formSlice.actions;
export const { getData } = formSlice.selectors;
export default formSlice.reducer;
