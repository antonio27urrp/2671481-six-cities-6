import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../const';
import { fetchFavoritesAction } from '../../store/api-actions';
import { FavoritesPage } from './favorites-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: FavoritesPage', () => {
  const mockOffer = {
    id: '1',
    title: 'Nice apartment',
    type: 'apartment',
    price: 120,
    city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
    isFavorite: true,
    previewImage: 'img.jpg',
    rating: 4,
  };

  it('should render empty state when there are no favorite offers', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@test.com' },
      },
      offers: { favoritesOffers: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Save properties to narrow down search/i)
    ).toBeInTheDocument();
  });

  it('should render favorite offers when they exist', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@test.com' },
      },
      offers: { favoritesOffers: [mockOffer] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });

  it('should dispatch fetchFavoritesAction on mount', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@test.com' },
      },
      offers: { favoritesOffers: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    const actions = store.getActions();
    const fetchActionTriggered = actions.some(
      (action) => action.type === fetchFavoritesAction.pending.type
    );

    expect(fetchActionTriggered).toBe(true);
  });
});
