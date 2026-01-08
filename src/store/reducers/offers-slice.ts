import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferSortType } from '../../const/offer';
import { FullOffer, Offers } from '../../types/offer.type';
import { IReview } from '../../types/review.type';
import {
  fetchCommentsAction,
  fetchFavoritesAction,
  fetchFullOfferAction,
  fetchNearbyAction,
  fetchOffers,
  postCommentAction,
  toggleFavoriteStatusAction,
} from '../api-actions';

interface OffersState {
  offers: Offers;
  fullOffer: FullOffer | null;
  nearbyOffers: Offers;
  comments: IReview[];
  favoritesOffers: Offers;
  sortType: OfferSortType;
  isLoading: boolean;
  isFullOfferLoading: boolean;
  hasError: boolean;
}

const initialState: OffersState = {
  offers: [],
  fullOffer: null,
  nearbyOffers: [],
  comments: [],
  favoritesOffers: [],
  sortType: OfferSortType.Popular,
  isLoading: false,
  isFullOfferLoading: false,
  hasError: false,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeSortType: (state, action: PayloadAction<OfferSortType>) => {
      state.sortType = action.payload;
    },
    clearOffer: (state) => {
      state.fullOffer = null;
      state.nearbyOffers = [];
      state.comments = [];
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
          state.hasError = false;
          state.offers = action.payload;
        }
      )
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(fetchFullOfferAction.pending, (state) => {
        state.isFullOfferLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFullOfferAction.fulfilled, (state, action) => {
        state.fullOffer = action.payload;
        state.isFullOfferLoading = false;
        state.hasError = false;
      })
      .addCase(fetchFullOfferAction.rejected, (state) => {
        state.isFullOfferLoading = false;
        state.hasError = true;
      })
      .addCase(fetchNearbyAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favoritesOffers = action.payload;
      })
      .addCase(toggleFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const index = state.offers.findIndex((o) => o.id === updatedOffer.id);

        if (index !== -1) {
          state.offers[index].isFavorite = updatedOffer.isFavorite;
        }

        if (state.fullOffer && state.fullOffer.id === updatedOffer.id) {
          state.fullOffer.isFavorite = updatedOffer.isFavorite;
        }

        const nearbyIndex = state.nearbyOffers.findIndex(
          (o) => o.id === updatedOffer.id
        );

        if (nearbyIndex !== -1) {
          state.nearbyOffers[nearbyIndex].isFavorite = updatedOffer.isFavorite;
        }

        if (updatedOffer.isFavorite) {
          state.favoritesOffers.push(updatedOffer);
        } else {
          state.favoritesOffers = state.favoritesOffers.filter(
            (o) => o.id !== updatedOffer.id
          );
        }
      });
  },
});

export const { changeSortType, clearOffer } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
