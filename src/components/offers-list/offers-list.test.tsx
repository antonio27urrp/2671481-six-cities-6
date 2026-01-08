import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offer.type';
import { OfferList } from './offers-list';

const mockStore = configureMockStore();

const createMockOffer = (id: string): Offer => ({
  id,
  title: `Offer ${id}`,
  type: 'apartment',
  price: 100,
  previewImage: `img/${id}.jpg`,
  isFavorite: false,
  isPremium: false,
  rating: 4,
  city: {
    name: 'Paris',
    location: { latitude: 48, longitude: 2, zoom: 10 },
  },
  location: { latitude: 48, longitude: 2, zoom: 10 },
});

const mockOffers = [
  createMockOffer('1'),
  createMockOffer('2'),
  createMockOffer('3'),
];

describe('Component: OfferList', () => {
  it('should render correct number of offers based on limit', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    const limit = 2;

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferList
            offers={mockOffers}
            limit={limit}
            cardStyle="cities"
            className="cities__places-list"
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Offer 2')).toBeInTheDocument();
    expect(screen.queryByText('Offer 3')).not.toBeInTheDocument();
  });

  it('should apply provided className to the wrapper', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });
    const customClass = 'custom__list-class';

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferList
            offers={mockOffers}
            cardStyle="cities"
            className={customClass}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(container.querySelector(`.${customClass}`)).toBeInTheDocument();
  });
});
