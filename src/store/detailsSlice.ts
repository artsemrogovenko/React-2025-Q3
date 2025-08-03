import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Character } from 'rickmortyapi';

interface DetailsState {
  value: Character | object;
  isVisible: boolean;
}

const initialState: DetailsState = {
  value: {},
  isVisible: false,
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    updateDetail: (state, action: PayloadAction<Character | object>) => {
      state.value = action.payload;
      state.isVisible = !!action.payload;
    },
    hideDetail: (state) => {
      state.isVisible = false;
    },
    showDetail: (state) => {
      state.isVisible = true;
    },
  },
});

export const { updateDetail, hideDetail, showDetail } = detailsSlice.actions;
export default detailsSlice.reducer;
