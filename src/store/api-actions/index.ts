import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const/api';
import { createAPI } from '../../service/api';
import { Offers } from '../../types/offer.type';

export const fetchOffers = createAsyncThunk(
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
