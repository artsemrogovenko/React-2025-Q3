import { configureStore } from '@reduxjs/toolkit';
import detailsSlice from './detailsSlice';
import favoritesSlice from './favoritesSlice';
import { enableMapSet } from 'immer';
import { rickMortyApi } from '../services/rickMorty';

enableMapSet();

export const store = configureStore({
  reducer: {
    details: detailsSlice,
    favorites: favoritesSlice,
    [rickMortyApi.reducerPath]: rickMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickMortyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
