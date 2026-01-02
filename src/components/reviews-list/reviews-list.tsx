import { IReview } from '../../types/review.type';
import { ReviewItem } from '../review-item/review-item';

type ReviewsListProps = {
  comments: IReview[];
};

export function ReviewsList(props: ReviewsListProps): JSX.Element {
  const { comments } = props;

  return (
    <ul className="reviews__list">
      {comments.map((comment) => (
        <ReviewItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}
