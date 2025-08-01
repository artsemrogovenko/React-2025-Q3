import { configureStore } from '@reduxjs/toolkit';
import detailsSlice from './detailsSlice';

export const store = configureStore({
  reducer: { details: detailsSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
