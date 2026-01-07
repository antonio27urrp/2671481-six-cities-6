import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { User } from '../../types/user.type';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

interface IUserState {
  user: User | null;
  authorizationStatus: AuthorizationStatus;
}

const initialState: IUserState = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});

export const userReducer = userSlice.reducer;
