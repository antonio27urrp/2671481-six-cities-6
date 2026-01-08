import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '..';
import { APIRoute } from '../../const/api';
import { createAPI } from '../../service/api';
import { dropToken, saveToken } from '../../service/token';
import { FullOffer, Offer, Offers } from '../../types/offer.type';
import { IReview } from '../../types/review.type';
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

export const fetchFullOfferAction = createAsyncThunk<
  FullOffer,
  string,
  ThunkConfig
>('offer/fetchFullOffer', async (offerId, { extra: api }) => {
  const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
  return data;
});

export const fetchNearbyAction = createAsyncThunk<Offers, string, ThunkConfig>(
  'offer/fetchNearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offers>(
      `${APIRoute.Offers}/${offerId}/nearby`
    );
    return data;
  }
);

export const fetchCommentsAction = createAsyncThunk<
  IReview[],
  string,
  ThunkConfig
>('offer/fetchComments', async (offerId, { extra: api }) => {
  const { data } = await api.get<IReview[]>(`${APIRoute.Comments}/${offerId}`);
  return data;
});

export const postCommentAction = createAsyncThunk<
  IReview,
  { offerId: string; comment: string; rating: number },
  ThunkConfig
>('offer/postComment', async ({ offerId, comment, rating }, { extra: api }) => {
  const { data } = await api.post<IReview>(`${APIRoute.Comments}/${offerId}`, {
    comment,
    rating,
  });
  return data;
});

export const fetchFavoritesAction = createAsyncThunk<
  Offers,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavorites', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offers>(APIRoute.Favorite);
  return data;
});

export const toggleFavoriteStatusAction = createAsyncThunk<
  Offer,
  { id: string; status: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/toggleFavoriteStatus', async ({ id, status }, { extra: api }) => {
  const { data } = await api.post<Offer>(
    `${APIRoute.Favorite}/${id}/${status}`
  );
  return data;
});
