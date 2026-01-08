import { OfferSortType } from '../../const/offer';
import { FullOffer, Offer, Offers } from '../../types/offer.type';
import { IReview } from '../../types/review.type';
import { fetchOffers } from '../api-actions';
import { changeSortType, clearOffer, offersReducer } from './offers-slice';

describe('Offers Slice', () => {
  const initialState = {
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

  const mockLocation = {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  };

  const mockCity = {
    name: 'Amsterdam',
    location: mockLocation,
  };

  const mockOffer: Offer = {
    id: '1',
    title: 'Test Offer',
    type: 'house',
    price: 100,
    city: mockCity,
    location: mockLocation,
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'img.jpg',
  };

  it('should return initial state with empty action', () => {
    const result = offersReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should change sort type with "changeSortType" action', () => {
    const result = offersReducer(
      initialState,
      changeSortType(OfferSortType.LowToHigh)
    );
    expect(result.sortType).toBe(OfferSortType.LowToHigh);
  });

  it('should clear offer data with "clearOffer" action', () => {
    const stateWithData = {
      ...initialState,
      fullOffer: {
        ...mockOffer,
        description: '',
        images: [],
        goods: [],
        host: { name: '', avatarUrl: '', isPro: false },
        bedrooms: 1,
        maxAdults: 1,
      } as FullOffer,
      nearbyOffers: [mockOffer] as Offers,
      comments: [
        {
          id: '1',
          comment: '',
          date: '',
          rating: 1,
          user: { name: '', avatarUrl: '', isPro: false },
        },
      ] as IReview[],
    };

    const result = offersReducer(stateWithData, clearOffer());

    expect(result.fullOffer).toBeNull();
    expect(result.nearbyOffers).toEqual([]);
    expect(result.comments).toEqual([]);
  });

  it('should set "isLoading" to true on "fetchOffers.pending"', () => {
    const result = offersReducer(initialState, {
      type: fetchOffers.pending.type,
    });
    expect(result.isLoading).toBe(true);
  });

  it('should set "offers" and "isLoading" to false on "fetchOffers.fulfilled"', () => {
    const mockOffers: Offers = [mockOffer];
    const result = offersReducer(initialState, {
      type: fetchOffers.fulfilled.type,
      payload: mockOffers,
    });

    expect(result.offers).toEqual(mockOffers);
    expect(result.isLoading).toBe(false);
  });

  it('should set "hasError" to true on "fetchOffers.rejected"', () => {
    const result = offersReducer(initialState, {
      type: fetchOffers.rejected.type,
    });
    expect(result.isLoading).toBe(false);
    expect(result.hasError).toBe(true);
  });
});
