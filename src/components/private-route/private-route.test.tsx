import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthorizationStatus, Paths } from '../../const';
import PrivateRoute from './private-route';

const mockStore = configureMockStore();

describe('Component: PrivateRoute', () => {
  it('should render Spinner when auth status is Unknown', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Unknown },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRoute />
        </MemoryRouter>
      </Provider>
    );

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('should render Outlet (private content) when user is authorized', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@test.com' },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/private" element={<span>Private Content</span>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Private Content/i)).toBeInTheDocument();
  });

  it('should render Navigate to login when user is not authorized', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/private" element={<span>Private Content</span>} />
            </Route>
            <Route path={Paths.Login} element={<span>Login Page</span>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Private Content/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });
});
