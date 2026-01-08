import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offer.type';
import { OfferFavoriteCard } from './offer-favorite-card';

const mockStore = configureMockStore();

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Nice house',
    type: 'house',
    price: 100,
    previewImage: 'img/1.jpg',
    isFavorite: true,
    isPremium: false,
    rating: 4,
    city: {
      name: 'Paris',
      location: { latitude: 48, longitude: 2, zoom: 10 },
    },
    location: { latitude: 48, longitude: 2, zoom: 10 },
  },
];

describe('Component: OfferFavoriteCard', () => {
  it('should render correctly with city name and offers', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
      offers: { favoritesOffers: mockOffers },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferFavoriteCard
            cityName="Paris"
            sortOffersByCityName={mockOffers}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Nice house')).toBeInTheDocument();
  });

  it('should render nothing if no favorite offers', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferFavoriteCard cityName="Paris" sortOffersByCityName={[]} />
        </MemoryRouter>
      </Provider>
    );

    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
