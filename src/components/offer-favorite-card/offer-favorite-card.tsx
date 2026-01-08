import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Paths } from '../../const';
import { CardStyle } from '../../const/offer';
import { Offer } from '../../types/offer.type';
import { OfferCard } from '../offer-card/offer-card';

type OfferFavoriteCardProps = {
  cityName: string;
  sortOffersByCityName: Offer[];
};

function OfferFavoriteCard(props: OfferFavoriteCardProps): JSX.Element {
  const { cityName, sortOffersByCityName } = props;

  const sortOffersByIsFavorite: Offer[] = sortOffersByCityName.filter(
    (offers) => offers.isFavorite === true
  );

  if (sortOffersByIsFavorite.length === 0) {
    return <div></div>;
  }

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={Paths.Main}>
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {sortOffersByIsFavorite.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            cardStyle={CardStyle.Favorites}
          />
        ))}
      </div>
    </li>
  );
}

const memoOfferFavoriteCard = memo(OfferFavoriteCard);
export { memoOfferFavoriteCard as OfferFavoriteCard };
