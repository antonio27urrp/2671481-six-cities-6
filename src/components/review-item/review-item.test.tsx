import { render, screen } from '@testing-library/react';
import { IReview } from '../../types/review.type';
import { ReviewItem } from './review-item';

const mockReview: IReview = {
  id: '1',
  date: '2023-05-15T12:00:00.000Z',
  user: {
    name: 'John Doe',
    avatarUrl: 'img/avatar.png',
    isPro: false,
  },
  comment:
    'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  rating: 4.4,
};

describe('Component: ReviewItem', () => {
  it('should render correctly with provided review data', () => {
    render(<ReviewItem comment={mockReview} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toHaveAttribute(
      'src',
      'img/avatar.png'
    );
  });

  it('should format date correctly', () => {
    render(<ReviewItem comment={mockReview} />);

    expect(screen.getByText('May 2023')).toBeInTheDocument();
    const timeElement = screen.getByText('May 2023');
    expect(timeElement).toHaveAttribute('dateTime', mockReview.date);
  });

  it('should calculate rating width correctly', () => {
    const { container } = render(<ReviewItem comment={mockReview} />);

    // 4.4 округляется до 4. (4 * 100) / 5 = 80%
    const ratingStars = container.querySelector('.rating__stars span');
    expect(ratingStars).toHaveStyle('width: 80%');
  });
});
