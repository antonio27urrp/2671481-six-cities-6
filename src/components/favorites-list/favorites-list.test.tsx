import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Offer } from '../../types/offer.type';
import { FavoritesList } from './favorites-list';

const mockStoreCreator = configureMockStore();

const store = mockStoreCreator({
  user: { authorizationStatus: 'AUTH' },
  city: { city: 'Paris' },
  offers: { offers: [] },
});

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Test Offer Paris',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Paris',
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
    },
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 16 },
    isFavorite: true,
    isPremium: false,
    rating: 4.5,
    previewImage: 'img/1.jpg',
  } as Offer,
];

describe('Component: FavoritesList', () => {
  it('should render correctly with offers', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesList offers={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('list')).toHaveClass('favorites__list');
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Test Offer Paris')).toBeInTheDocument();
  });

  it('should render empty list when offers are empty', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesList offers={[]} />
        </MemoryRouter>
      </Provider>
    );

    const listElement = screen.getByRole('list');
    expect(listElement).toHaveClass('favorites__list');
    expect(screen.queryByText('Paris')).not.toBeInTheDocument();
  });
});
