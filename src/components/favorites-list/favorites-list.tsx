import { CITY_LIST_OPTIONS } from '../../const/offer';
import { Offer } from '../../types/offer.type';
import { OfferFavoriteCard } from '../offer-favorite-card/offer-favorite-card';

type FavoritesListProps = {
  offers: Offer[];
};

export function FavoritesList(props: FavoritesListProps): JSX.Element {
  const { offers } = props;

  return (
    <ul className="favorites__list">
      {CITY_LIST_OPTIONS.map((cityName) => (
        <OfferFavoriteCard
          key={cityName}
          cityName={cityName}
          sortOffersByCityName={offers.filter(
            (offer) => offer.city.name === cityName
          )}
        />
      ))}
    </ul>
  );
}
