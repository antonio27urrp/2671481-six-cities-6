import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../service/api';
import { cityReducer } from './reducers/city-slice';
import { offersReducer } from './reducers/offers-slice';
import { userReducer } from './reducers/user-slice';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    user: userReducer,
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
