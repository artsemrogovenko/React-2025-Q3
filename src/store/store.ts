import { configureStore } from '@reduxjs/toolkit';
import detailsSlice from './detailsSlice';
import favoritesSlice from './favoritesSlice';
import { enableMapSet } from 'immer';

enableMapSet();

export const store = configureStore({
  reducer: { details: detailsSlice, favorites: favoritesSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
