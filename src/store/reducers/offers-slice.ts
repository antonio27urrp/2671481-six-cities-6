import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockOffers } from '../../mocks/offers';
import { Offers } from '../../types/offer.type';

interface OffersState {
  offers: Offers;
}

const initialState: OffersState = {
  offers: mockOffers,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<Offers>) => {
      state.offers = action.payload;
    },
  },
});

export const { setOffers } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
