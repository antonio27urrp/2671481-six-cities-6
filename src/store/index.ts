import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../service/api';
import { cityReducer } from './reducers/city-slice';
import { offersReducer } from './reducers/offers-slice';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    city: cityReducer,
    offers: offersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
