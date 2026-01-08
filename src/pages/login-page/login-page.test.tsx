import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Action } from 'redux';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../const';
import { LoginPage } from './login-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: LoginPage', () => {
  it('should render correctly', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should dispatch loginAction when form is submitted', async () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByPlaceholderText(/Email/i), 'test@test.ru');
    await userEvent.type(
      screen.getByPlaceholderText(/Password/i),
      'password123'
    );
    await userEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    const actions = store.getActions() as Action[];
    const hasLoginAction = actions.some(
      (action) =>
        typeof action.type === 'string' && action.type.includes('user/login')
    );

    expect(hasLoginAction).toBe(true);
  });

  it('should dispatch changeCity when city link is clicked', async () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const cityLink = container.querySelector('.locations__item-link');

    if (cityLink) {
      await userEvent.click(cityLink);
    }

    const actions = store.getActions() as Action[];
    const hasChangeCityAction = actions.some(
      (action) =>
        typeof action.type === 'string' &&
        action.type.includes('city/changeCity')
    );

    expect(hasChangeCityAction).toBe(true);
  });
});
