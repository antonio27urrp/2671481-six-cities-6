import { createSelector } from '@reduxjs/toolkit';
import { OfferSortType } from '../../const/offer';
import { Offer } from '../../types/offer.type';
import { State } from '../index';
import { getActiveCity } from './city-selectors';

export const getAllOffers = (state: State): Offer[] => state.offers.offers;
export const getSortType = (state: State) => state.offers.sortType;

export const getFilteredOffers = createSelector(
  [getAllOffers, getActiveCity],
  (offers, activeCity) =>
    offers.filter((offer) => offer.city.name === activeCity)
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
