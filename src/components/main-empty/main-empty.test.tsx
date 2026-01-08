import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MainEmpty } from './main-empty';

const mockStore = configureMockStore();

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    const expectedCity = 'Paris';
    const store = mockStore({
      city: { city: expectedCity },
    });

    render(
      <Provider store={store}>
        <MainEmpty />
      </Provider>
    );

    expect(
      screen.getByText(/No places to stay available/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`moment in ${expectedCity}`, 'i'))
    ).toBeInTheDocument();
  });
});
