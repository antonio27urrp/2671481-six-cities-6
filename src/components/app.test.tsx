import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AuthorizationStatus, Paths } from '../const';
import { OfferSortType } from '../const/offer';
import { App } from './app';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Application Routing', () => {
  const store = mockStore({
    user: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    },
    offers: {
      offers: [],
      isLoading: false,
      isFullOfferLoading: false,
      sortType: OfferSortType.Popular,
      fullOffer: {
        id: '1',
        title: 'Test Offer',
        type: 'apartment',
        price: 100,
        rating: 4.5,
        description: 'Test description',
        bedrooms: 2,
        maxAdults: 2,
        images: ['img1.jpg', 'img2.jpg'],
        goods: ['Wi-Fi'],
        host: {
          name: 'Angelina',
          avatarUrl: 'img/avatar.jpg',
          isPro: true,
        },
        city: {
          name: 'Paris',
          location: { latitude: 0, longitude: 0, zoom: 10 },
        },
        location: { latitude: 0, longitude: 0, zoom: 10 },
        isFavorite: false,
        isPremium: false,
      },
      nearbyOffers: [],
      comments: [],
      favoritesOffers: [],
      hasError: false,
    },
    city: { city: 'Paris' },
  });

  it('should render "MainPage" when route is "/"', () => {
    window.history.pushState({}, '', Paths.Main);
    render(
      <Provider store={store}>
        <App limit={6} />
      </Provider>
    );
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when route is "/login"', () => {
    window.history.pushState({}, '', Paths.Login);
    render(
      <Provider store={store}>
        <App limit={6} />
      </Provider>
    );
    expect(
      screen.getByRole('button', { name: /Sign in/i })
    ).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when route is non-existent', () => {
    window.history.pushState({}, '', '/some-garbage-route');
    render(
      <Provider store={store}>
        <App limit={6} />
      </Provider>
    );
    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });

  it('should render "OfferPage" when route is "/offer/:id"', () => {
    window.history.pushState({}, '', '/offer/1');
    render(
      <Provider store={store}>
        <App limit={6} />
      </Provider>
    );
    expect(screen.getByText(/Test Offer/i)).toBeInTheDocument();
    expect(screen.getByText(/Test description/i)).toBeInTheDocument();
  });
});
