import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { Map } from '../../components/map/map';
import { OfferList } from '../../components/offers-list/offers-list';
import { ReviewForm } from '../../components/review-form/review-form';
import { ReviewsList } from '../../components/reviews-list/reviews-list';
import { Spinner } from '../../components/spinner/spinner';
import { Paths } from '../../const';
import { CardStyle } from '../../const/offer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchCommentsAction,
  fetchFullOfferAction,
  fetchNearbyAction,
} from '../../store/api-actions';
import { clearOffer } from '../../store/reducers/offers-slice';
import {
  getFullOffer,
  getIsFullOfferLoading,
  getNearbyOffers,
  getOfferErrorStatus,
  getSortedComments,
} from '../../store/selectors/offers-selectors';
import { getIsAuth } from '../../store/selectors/user-selectors';
import { Offer } from '../../types/offer.type';

export function OfferPage(): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<Offer | null>(null);

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const fullOffer = useAppSelector(getFullOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const comments = useAppSelector(getSortedComments);
  const isAuth = useAppSelector(getIsAuth);
  const isFullOfferLoading = useAppSelector(getIsFullOfferLoading);
  const hasError = useAppSelector(getOfferErrorStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchFullOfferAction(id));
      dispatch(fetchNearbyAction(id));
      dispatch(fetchCommentsAction(id));
    }
    return () => {
      dispatch(clearOffer());
    };
  }, [id, dispatch]);

  const offerGallery: string[] = fullOffer?.images.slice(0, 6) || [];

  const handleIsItemHover = (itemId: Offer['id']) => {
    const currentPoint = nearbyOffers.find((offer) => offer.id === itemId);
    setSelectedPoint(currentPoint || null);
  };

  if (hasError) {
    return <Navigate to={Paths.NotFound} />;
  }

  if (isFullOfferLoading || !fullOffer) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerGallery.map((pathToImg) => (
                <div className="offer__image-wrapper" key={pathToImg}>
                  <img
                    className="offer__image"
                    src={pathToImg}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {fullOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{fullOffer.title}</h1>
                <button
                  className={`offer__bookmark-button ${
                    fullOffer.isFavorite ? 'offer__bookmark-button--active' : ''
                  }
                    button`}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{
                      width: `${Math.round(fullOffer.rating) * 20}%`,
                    }}
                  />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {fullOffer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {fullOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {fullOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {fullOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{fullOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {fullOffer.goods.map((item) => (
                    <li key={item} className="offer__inside-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper ${
                      fullOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''
                    } user__avatar-wrapper`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={fullOffer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {fullOffer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {fullOffer.host.isPro && 'Pro'}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{fullOffer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">{comments.length}</span>
                </h2>
                <ReviewsList comments={comments} />
                {isAuth && id && <ReviewForm offerId={id} />}
              </section>
            </div>
          </div>
          <Map
            page="OfferPage"
            city={fullOffer.city}
            points={nearbyOffers}
            selectedPoint={selectedPoint}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OfferList
              className="near-places__list places__list"
              offers={nearbyOffers}
              cardStyle={CardStyle.NearPlaces}
              onItemHover={handleIsItemHover}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
