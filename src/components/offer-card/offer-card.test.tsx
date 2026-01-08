import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offer.type';
import { OfferCard } from './offer-card';

const mockStore = configureMockStore();

// Создаем объект, который строго соответствует типу Offer
const mockOffer: Offer = {
  id: '1',
  title: 'Beautiful apartment',
  type: 'apartment',
  price: 120,
  previewImage: 'img/1.jpg',
  isFavorite: false,
  isPremium: true,
  rating: 4.5,
  city: {
    name: 'Paris',
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
  },
  location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
};

describe('Component: OfferCard', () => {
  it('should render correctly with premium mark and price', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard offer={mockOffer} cardStyle="cities" />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();
    expect(screen.getByText(/120/)).toBeInTheDocument();
    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Place image/i)).toBeInTheDocument();
  });
});
