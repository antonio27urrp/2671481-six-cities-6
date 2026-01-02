import { IReview } from '../../types/review.type';

type ReviewItemProps = {
  comment: IReview;
};

export function ReviewItem(props: ReviewItemProps): JSX.Element {
  const { comment } = props;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    return `${month} ${year}`;
  };

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={comment.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{comment.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span
              style={{ width: `${(Math.round(comment.rating) * 100) / 5}%` }}
            />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment.comment}</p>
        <time className="reviews__time" dateTime={comment.date}>
          {formatDate(comment.date)}
        </time>
      </div>
    </li>
  );
}
