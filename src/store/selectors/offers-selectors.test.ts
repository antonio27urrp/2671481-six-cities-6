import { OfferSortType } from '../../const/offer';
import { Offer } from '../../types/offer.type';
import { State } from '../index';
import {
  getFavoritesByCity,
  getFilteredOffers,
  getNearbyOffers,
  getSortedComments,
  getSortedOffers,
} from './offers-selectors';

describe('Offers Selectors', () => {
  const mockLocation = { latitude: 0, longitude: 0, zoom: 0 };

  const createMockOffer = (
    id: string,
    city: string,
    price: number,
    rating: number
  ): Offer => ({
    id,
    title: `Offer ${id}`,
    type: 'apartment',
    price,
    rating,
    city: { name: city, location: mockLocation },
    location: mockLocation,
    isFavorite: false,
    isPremium: false,
    previewImage: '',
  });

  const mockOffers = [
    createMockOffer('1', 'Paris', 100, 4.0),
    createMockOffer('2', 'Paris', 200, 4.5),
    createMockOffer('3', 'Amsterdam', 150, 3.0),
  ];

  const mockState = {
    city: { city: 'Paris' },
    offers: {
      offers: mockOffers,
      sortType: OfferSortType.Popular,
      comments: [
        {
          id: '1',
          date: '2023-01-01',
          comment: '',
          rating: 1,
          user: { name: '', avatarUrl: '', isPro: false },
        },
        {
          id: '2',
          date: '2023-05-01',
          comment: '',
          rating: 1,
          user: { name: '', avatarUrl: '', isPro: false },
        },
      ],
      nearbyOffers: [
        createMockOffer('4', 'Paris', 50, 5),
        createMockOffer('5', 'Paris', 50, 5),
        createMockOffer('6', 'Paris', 50, 5),
        createMockOffer('7', 'Paris', 50, 5),
      ],
      favoritesOffers: [
        createMockOffer('1', 'Paris', 100, 4.0),
        createMockOffer('3', 'Amsterdam', 150, 3.0),
      ],
    },
  } as State;

  it('should filter offers by active city', () => {
    const result = getFilteredOffers(mockState);
    expect(result).toHaveLength(2);
    expect(result.every((offer) => offer.city.name === 'Paris')).toBe(true);
  });

  it('should sort offers from low to high price', () => {
    const stateWithSort = {
      ...mockState,
      offers: { ...mockState.offers, sortType: OfferSortType.LowToHigh },
    } as State;

    const result = getSortedOffers(stateWithSort);
    expect(result[0].price).toBe(100);
    expect(result[1].price).toBe(200);
  });

  it('should sort comments by date (newest first)', () => {
    const result = getSortedComments(mockState);
    expect(result[0].id).toBe('2');
    expect(result[1].id).toBe('1');
  });

  it('should limit nearby offers to 3 elements', () => {
    const result = getNearbyOffers(mockState);
    expect(result).toHaveLength(3);
  });

  it('should group favorite offers by city name', () => {
    const result = getFavoritesByCity(mockState);
    expect(result).toHaveProperty('Paris');
    expect(result).toHaveProperty('Amsterdam');
    expect(result['Paris']).toHaveLength(1);
    expect(result['Amsterdam']).toHaveLength(1);
  });
});
