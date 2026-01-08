import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { postCommentAction } from '../../store/api-actions';

const RATING_VALUES: number[] = [5, 4, 3, 2, 1];
const MIN_LENGTH: number = 50;
const MAX_LENGTH: number = 300;

type ReviewFromProps = {
  offerId: string;
};

export function ReviewForm(props: ReviewFromProps): JSX.Element {
  const { offerId } = props;

  const dispatch = useAppDispatch();

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);

  const isLengthValid =
    review.length >= MIN_LENGTH && review.length <= MAX_LENGTH;
  const isFormValid = rating > 0 && isLengthValid;

  const handleRatingChange = (value: number) => setRating(value);
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setReview(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormValid) {
      setIsSending(true);

      dispatch(postCommentAction({ offerId, comment: review, rating }))
        .unwrap()
        .then(() => {
          setRating(0);
          setReview('');
        })
        .catch(() => {})
        .finally(() => {
          setIsSending(false);
        });
    }
  };

  return (
    <form
      id={offerId}
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING_VALUES.map((value) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={rating === value}
              disabled={isSending}
              onChange={() => handleRatingChange(value)}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width="37" height="33">
                <use href="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={handleInputChange}
        disabled={isSending}
        minLength={MIN_LENGTH}
        maxLength={MAX_LENGTH}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid}
        >
          {isSending ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
