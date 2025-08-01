import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Character } from 'rickmortyapi';

type Favorite = { id: number; value: Character };

interface FavoritesState {
  values: Character[];
}

const initialState: FavoritesState = {
  values: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<Favorite>) => {
      const { id, value } = action.payload;
      const founded = state.values.find((c) => c.id === id);
      if (founded) {
        const newValues = [...state.values].filter(
          (c: Character) => c.id !== founded.id
        );
        state.values = newValues;
      } else {
        state.values.push(value);
      }
    },
    unselectAll: (state) => {
      state.values = [];
    },
  },
  selectors: {
    hasSelected: (state) => (id: number) =>
      state.values.some((c) => c.id === id),
    getFavorites: (state) => state.values,
  },
});

export const { toggle, unselectAll } = favoritesSlice.actions;
export const { hasSelected, getFavorites } = favoritesSlice.selectors;
export default favoritesSlice.reducer;
