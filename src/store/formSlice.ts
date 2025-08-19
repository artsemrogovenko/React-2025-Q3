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
    addData: (state, action: PayloadAction<ProfileType>) => {
      state = { ...state, ...action.payload };
    },
  },
  selectors: {
    getData: (state) => state,
  },
});

export const { addData } = formSlice.actions;
export const { getData } = formSlice.selectors;
export default formSlice.reducer;
