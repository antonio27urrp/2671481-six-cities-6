import { combineReducers } from '@reduxjs/toolkit';
import { cityReducer } from './reducers/city-slice';
import { offersReducer } from './reducers/offers-slice';
import { userReducer } from './reducers/user-slice';

export const rootReducer = combineReducers({
  user: userReducer,
  city: cityReducer,
  offers: offersReducer,
});
