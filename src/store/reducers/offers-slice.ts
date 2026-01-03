import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferSortType } from '../../const/offer';
import { mockOffers } from '../../mocks/offers';
import { Offers } from '../../types/offer.type';

interface OffersState {
  offers: Offers;
  sortType: OfferSortType;
}

const initialState: OffersState = {
  offers: mockOffers,
  sortType: OfferSortType.Popular,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<Offers>) => {
      state.offers = action.payload;
    },
    changeSortType: (state, action: PayloadAction<OfferSortType>) => {
      state.sortType = action.payload;
    },
  },
});

export const { setOffers, changeSortType } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
