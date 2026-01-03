import { createSelector } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer.type';
import { State } from '../index';
import { getActiveCity } from './city-selectors';

export const getAllOffers = (state: State): Offer[] => state.offers.offers;

export const getFilteredOffers = createSelector(
  [getAllOffers, getActiveCity],
  (offers, activeCity) =>
    offers.filter((offer) => offer.city.name === activeCity)
);

export const getOffersCount = createSelector(
  [getFilteredOffers],
  (filteredOffers) => filteredOffers.length
);
