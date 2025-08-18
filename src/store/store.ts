import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import selectedReducer from './selectedSlice'; // добавьте этот импорт

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    selected: selectedReducer, // добавьте редьюсер selected
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;