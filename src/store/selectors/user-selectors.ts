import { createSelector } from '@reduxjs/toolkit';
import { State } from '..';
import { AuthorizationStatus } from '../../const';
import { User } from '../../types/user.type';

const selectUserBase = (state: State) => state.user;

export const getUserData = createSelector(
  [selectUserBase],
  (userState): User | null => userState.user
);

export const getAuthorizationStatus = createSelector(
  [selectUserBase],
  (userState): AuthorizationStatus => userState.authorizationStatus
);

export const getIsAuth = createSelector(
  [getAuthorizationStatus],
  (status): boolean => status === AuthorizationStatus.Auth
);
