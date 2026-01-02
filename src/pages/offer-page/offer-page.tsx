import { Header } from '../../components/header/header';
import { OfferList } from '../../components/offers-list/offers-list';
import { ReviewForm } from '../../components/review-form/review-form';
import { ReviewsList } from '../../components/reviews-list/reviews-list';
import { CardStyle } from '../../const/offer';
import { mockFullOffer } from '../../mocks/offer';
import { mockOffers } from '../../mocks/offers';
import { mockComments } from '../../mocks/reviews';

export function OfferPage(): JSX.Element {
  const offerGallery: string[] = mockFullOffer.images.slice(0, 6) || [];

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
              {mockFullOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{mockFullOffer.title}</h1>
                <button
                  className={`offer__bookmark-button ${
                    mockFullOffer.isFavorite
                      ? 'offer__bookmark-button--active'
                      : ''
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
                      width: `${Math.round(mockFullOffer.rating) * 20}%`,
                    }}
                  />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {mockFullOffer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {mockFullOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {mockFullOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {mockFullOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">
                  &euro;{mockFullOffer.price}
                </b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {mockFullOffer.goods.map((item) => (
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
                      mockFullOffer.host.isPro
                        ? 'offer__avatar-wrapper--pro'
                        : ''
                    } user__avatar-wrapper`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={mockFullOffer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {mockFullOffer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {mockFullOffer.host.isPro && 'Pro'}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{mockFullOffer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">1</span>
                </h2>
                <ReviewsList comments={mockComments} />
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OfferList
              className="near-places__list places__list"
              offers={mockOffers}
              cardStyle={CardStyle.NearPlaces}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
