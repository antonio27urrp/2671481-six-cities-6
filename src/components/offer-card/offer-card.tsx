import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleFavoriteStatusAction } from '../../store/api-actions';
import { getIsAuth } from '../../store/selectors/user-selectors';
import { Offer } from '../../types/offer.type';

type OfferCardProps = {
  offer: Offer;
  cardStyle: string;
  onItemHover?: (item: string) => void;
};

function OfferCard(props: OfferCardProps): JSX.Element {
  const { offer, cardStyle, onItemHover } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(getIsAuth);

  const isFavoriteStyle = cardStyle === 'favorites';
  const imageWidth = isFavoriteStyle ? 150 : 260;
  const imageHeight = isFavoriteStyle ? 110 : 200;

  const handleMouseEnter = () => {
    onItemHover?.(offer.id);
  };

  const handleMouseLeave = () => {
    onItemHover?.('');
  };

  const handleFavoriteClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (!isAuth) {
      navigate(Paths.Login);
      return;
    }
    dispatch(
      toggleFavoriteStatusAction({
        id: offer.id,
        status: offer.isFavorite ? 0 : 1,
      })
    );
  };

  return (
    <article
      className={`${cardStyle}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardStyle}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={imageWidth}
            height={imageHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div
        className={`${
          isFavoriteStyle ? 'favorites__card-info' : ''
        } place-card__info`}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              offer.isFavorite && isAuth
                ? 'place-card__bookmark-button--active'
                : ''
            }`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(offer.rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">Apartment</p>
      </div>
    </article>
  );
}

const memoOfferCard = memo(OfferCard);
export { memoOfferCard as OfferCard };
