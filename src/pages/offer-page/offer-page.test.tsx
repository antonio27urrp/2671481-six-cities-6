import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Action } from 'redux';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../const';
import { OfferPage } from './offer-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: OfferPage', () => {
  const mockFullOffer = {
    id: 'offer-1',
    title: 'Luxury Villa',
    type: 'house',
    price: 500,
    rating: 4.8,
    description: 'A beautiful villa',
    bedrooms: 3,
    maxAdults: 6,
    images: ['img1.jpg', 'img2.jpg'],
    goods: ['Pool', 'Wi-Fi'],
    host: { name: 'Angelina', avatarUrl: 'avatar.jpg', isPro: true },
    city: { name: 'Paris', location: { latitude: 48, longitude: 2, zoom: 10 } },
    location: { latitude: 48.1, longitude: 2.1, zoom: 10 },
    isFavorite: false,
    isPremium: true,
  };

  const baseState = {
    offers: {
      isFullOfferLoading: false,
      fullOffer: null,
      nearbyOffers: [],
      comments: [],
      hasError: false,
      favoritesOffers: [],
    },
    user: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    },
  };

  it('should render Spinner while loading', () => {
    const store = mockStore({
      ...baseState,
      offers: { ...baseState.offers, isFullOfferLoading: true },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/offer-1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('should render offer details and sub-components', () => {
    const store = mockStore({
      ...baseState,
      offers: { ...baseState.offers, fullOffer: mockFullOffer },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/offer-1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockFullOffer.title)).toBeInTheDocument();
  });

  it('should dispatch toggleAction when bookmark clicked and authorized', async () => {
    const store = mockStore({
      ...baseState,
      offers: { ...baseState.offers, fullOffer: mockFullOffer },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@test.com' },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferPage />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(
      screen.getByRole('button', { name: /To bookmarks/i })
    );

    const actions = store.getActions() as Action[];
    const hasFavoriteAction = actions.some(
      (action) =>
        typeof action.type === 'string' &&
        action.type.includes('toggleFavoriteStatus')
    );

    expect(hasFavoriteAction).toBe(true);
  });
});
