import { createSelector } from '@reduxjs/toolkit';
import { MAX_COMMENTS_COUNT } from '../../const';
import { OfferSortType } from '../../const/offer';
import { Offer } from '../../types/offer.type';
import { State } from '../index';
import { getActiveCity } from './city-selectors';

export const getAllOffers = (state: State): Offer[] => state.offers.offers;
export const getSortType = (state: State) => state.offers.sortType;
export const getFullOffer = (state: State) => state.offers.fullOffer;
export const getNearbyOffersRaw = (state: State) => state.offers.nearbyOffers;
export const getComments = (state: State) => state.offers.comments;
export const getIsFullOfferLoading = (state: State) =>
  state.offers.isFullOfferLoading;
export const getOfferErrorStatus = (state: State): boolean =>
  state.offers.hasError;

export const getFilteredOffers = createSelector(
  [getAllOffers, getActiveCity],
  (offers, activeCity) =>
    offers.filter((offer) => offer.city.name === activeCity)
);

export const getNearbyOffers = createSelector([getNearbyOffersRaw], (offers) =>
  offers.slice(0, 3)
);

export const getOffersCount = createSelector(
  [getFilteredOffers],
  (filteredOffers) => filteredOffers.length
);

export const getSortedOffers = createSelector(
  [getFilteredOffers, getSortType],
  (offers, sortType) => {
    switch (sortType) {
      case OfferSortType.LowToHigh:
        return [...offers].sort((a, b) => a.price - b.price);
      case OfferSortType.HighToLow:
        return [...offers].sort((a, b) => b.price - a.price);
      case OfferSortType.TopRating:
        return [...offers].sort((a, b) => b.rating - a.rating);
      default:
        return offers;
    }
  }
);

export const getSortedComments = createSelector(
  [(state: State) => state.offers.comments],
  (comments) =>
    [...comments]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, MAX_COMMENTS_COUNT)
);
