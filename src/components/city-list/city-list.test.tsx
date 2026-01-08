import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { CITY_LIST_OPTIONS } from '../../const/offer';
import { CityList } from './city-list';

const mockStoreCreator = configureMockStore();

describe('Component: CityList', () => {
  it('should render correctly', () => {
    const activeCity = 'Paris';
    const store = mockStoreCreator({
      city: { city: activeCity },
    });

    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    CITY_LIST_OPTIONS.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should have active class on current city', () => {
    const activeCity = 'Amsterdam';
    const store = mockStoreCreator({
      city: { city: activeCity },
    });

    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    const activeCityElement = screen.getByText(activeCity).closest('a');

    expect(activeCityElement).toHaveClass('tabs__item--active');
  });

  it('should not have active class on other cities', () => {
    const activeCity = 'Paris';
    const otherCity = 'Cologne';
    const store = mockStoreCreator({
      city: { city: activeCity },
    });

    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    const otherCityElement = screen.getByText(otherCity).closest('a');
    expect(otherCityElement).not.toHaveClass('tabs__item--active');
  });
});
