import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { OfferSortType } from '../../const/offer';
import { SortOffers } from './sort-offers';

const mockStore = configureMockStore();

describe('Component: SortOffers', () => {
  it('should render correctly and show current sort type', () => {
    const store = mockStore({
      offers: { sortType: OfferSortType.Popular },
    });

    render(
      <Provider store={store}>
        <SortOffers />
      </Provider>
    );

    const activeLabel = screen.getByText(String(OfferSortType.Popular), {
      selector: '.places__sorting-type',
    });

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(activeLabel).toBeInTheDocument();
  });

  it('should open/close sort options when user clicks on sort type', async () => {
    const store = mockStore({
      offers: { sortType: OfferSortType.Popular },
    });

    render(
      <Provider store={store}>
        <SortOffers />
      </Provider>
    );

    const sortTypeElement = screen.getByText(String(OfferSortType.Popular), {
      selector: '.places__sorting-type',
    });
    const optionsList = screen.getByRole('list');

    expect(optionsList).not.toHaveClass('places__options--opened');

    await userEvent.click(sortTypeElement);
    expect(optionsList).toHaveClass('places__options--opened');

    await userEvent.click(sortTypeElement);
    expect(optionsList).not.toHaveClass('places__options--opened');
  });
});
