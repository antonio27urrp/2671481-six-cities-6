import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../const';
import { OfferSortType } from '../../const/offer';
import { MainPage } from './main-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: MainPage', () => {
  const mockOffer = {
    id: '1',
    title: 'Loft in Paris',
    type: 'apartment',
    price: 120,
    rating: 4,
    city: {
      name: 'Paris',
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 12 },
    },
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 12 },
    isFavorite: false,
    isPremium: true,
    previewImage: 'img/1.jpg',
  };

  it('should render Spinner when isLoading is true', () => {
    const store = mockStore({
      offers: { isLoading: true, offers: [], sortType: OfferSortType.Popular },
      city: { city: 'Paris' },
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage limit={6} />
        </MemoryRouter>
      </Provider>
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should render offers list when offers exist', () => {
    const store = mockStore({
      offers: {
        isLoading: false,
        offers: [mockOffer],
        sortType: OfferSortType.Popular,
        favoritesOffers: [],
      },
      city: { city: 'Paris' },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@test.com' },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage limit={6} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/1 places to stay in Paris/i)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });

  it('should render MainEmpty when no offers are available', () => {
    const store = mockStore({
      offers: {
        isLoading: false,
        offers: [],
        sortType: OfferSortType.Popular,
        favoritesOffers: [],
      },
      city: { city: 'Amsterdam' },
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage limit={6} />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/No places to stay available/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /We could not find any property available at the moment in Amsterdam/i
      )
    ).toBeInTheDocument();
  });
});
