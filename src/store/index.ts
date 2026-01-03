import { configureStore } from '@reduxjs/toolkit';
import { cityReducer } from './reducers/city-slice';
import { offersReducer } from './reducers/offers-slice';

export const store = configureStore({
  reducer: {
    city: cityReducer,
    offers: offersReducer,
  },
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
