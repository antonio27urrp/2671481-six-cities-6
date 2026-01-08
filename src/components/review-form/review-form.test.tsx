import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ReviewForm } from './review-form';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should enable submit button when form is valid', async () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const textArea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const star5 = screen.getByDisplayValue('5');

    await userEvent.type(textArea, 'A'.repeat(55));
    await userEvent.click(star5);

    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('should stay disabled if text is less than 50 characters', async () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const textArea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const star5 = screen.getByDisplayValue('5');

    await userEvent.type(textArea, 'Too short');
    await userEvent.click(star5);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should update text value when user types', async () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const textArea = screen.getByPlaceholderText(/Tell how was your stay/i);
    await userEvent.type(textArea, 'Test review text');

    expect(screen.getByDisplayValue('Test review text')).toBeInTheDocument();
  });
});
