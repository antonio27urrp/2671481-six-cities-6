import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferSortType } from '../../const/offer';
import { Offers } from '../../types/offer.type';
import { fetchOffers } from '../api-actions';

interface OffersState {
  offers: Offers;
  sortType: OfferSortType;
  isLoading: boolean;
  error: string;
}

const initialState: OffersState = {
  offers: [],
  sortType: OfferSortType.Popular,
  isLoading: false,
  error: '',
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeSortType: (state, action: PayloadAction<OfferSortType>) => {
      state.sortType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchOffers.fulfilled,
        (state, action: PayloadAction<Offers>) => {
          state.isLoading = false;
          state.error = '';
          state.offers = action.payload;
        }
      )
      .addCase(fetchOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { changeSortType } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
