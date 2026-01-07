import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '..';
import { APIRoute } from '../../const/api';
import { createAPI } from '../../service/api';
import { dropToken, saveToken } from '../../service/token';
import { Offers } from '../../types/offer.type';
import { AuthData, User } from '../../types/user.type';

interface ThunkConfig {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const fetchOffers = createAsyncThunk<Offers, undefined, ThunkConfig>(
  'offer/fetchAllOffers',
  async (_, thunkAPI) => {
    try {
      const { data } = await createAPI().get<Offers>(`${APIRoute.Offers}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        'Не удалось загрузить предложения об аренде!'
      );
    }
  }
);

export const checkAuthAction = createAsyncThunk<User, undefined, ThunkConfig>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<User>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<
  User,
  AuthData,
  { extra: AxiosInstance }
>('user/login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<User>(APIRoute.Login, { email, password });
  saveToken(data.token);
  return data;
});

export const logoutAction = createAsyncThunk<void, undefined, ThunkConfig>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
