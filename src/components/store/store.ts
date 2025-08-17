import { configureStore } from '@reduxjs/toolkit';
import detailsSlice from './detailsSlice';
import favoritesSlice from './favoritesSlice';
import { rickMortyApi } from '../services/rickMorty';

export const makeStore = () => {
  return configureStore({
    reducer: {
      details: detailsSlice,
      favorites: favoritesSlice,
      [rickMortyApi.reducerPath]: rickMortyApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rickMortyApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
