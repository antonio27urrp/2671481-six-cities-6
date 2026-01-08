import { render, screen } from '@testing-library/react';
import { IReview } from '../../types/review.type';
import { ReviewsList } from './reviews-list';

const mockComments: IReview[] = [
  {
    id: '1',
    date: '2023-05-15T12:00:00.000Z',
    user: { name: 'John', avatarUrl: 'img/1.png', isPro: false },
    comment: 'First review text',
    rating: 4,
  },
  {
    id: '2',
    date: '2023-06-10T12:00:00.000Z',
    user: { name: 'Alice', avatarUrl: 'img/2.png', isPro: true },
    comment: 'Second review text',
    rating: 5,
  },
];

describe('Component: ReviewsList', () => {
  it('should render correct number of reviews', () => {
    render(<ReviewsList comments={mockComments} />);

    expect(screen.getByText('First review text')).toBeInTheDocument();
    expect(screen.getByText('Second review text')).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockComments.length);
  });

  it('should render empty list when no comments provided', () => {
    const { container } = render(<ReviewsList comments={[]} />);

    const listElement = container.querySelector('.reviews__list');
    expect(listElement).toBeInTheDocument();
    expect(listElement?.children).toHaveLength(0);
  });
});
