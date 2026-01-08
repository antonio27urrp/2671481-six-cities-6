import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { Header } from './header';

const mockStore = configureMockStore();

describe('Component: Header', () => {
  it('should render correctly when user is not authorized', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
      offers: { favoritesOffers: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });
});
