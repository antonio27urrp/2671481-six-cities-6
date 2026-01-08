import { useCallback, useMemo, useState } from 'react';
import { CityList } from '../../components/city-list/city-list';
import { Header } from '../../components/header/header';
import { Map } from '../../components/map/map';
import { OfferList } from '../../components/offers-list/offers-list';
import { SortOffers } from '../../components/sort-offers/sort-offers';
import { Spinner } from '../../components/spinner/spinner';
import { CardStyle } from '../../const/offer';
import { useAppSelector } from '../../hooks/redux';
import { getActiveCity } from '../../store/selectors/city-selectors';
import { getSortedOffers } from '../../store/selectors/offers-selectors';
import { Offer } from '../../types/offer.type';

type MainPageProps = {
  limit: number;
};

export function MainPage(props: MainPageProps): JSX.Element {
  const { limit } = props;

  const isLoading = useAppSelector((state) => state.offers.isLoading);
  const activeCityName = useAppSelector(getActiveCity);
  const sortedOffers = useAppSelector(getSortedOffers);

  const [selectedPointId, setSelectedPointId] = useState<Offer['id'] | null>(
    null
  );

  const handleIsItemHover = useCallback((itemId: Offer['id']) => {
    setSelectedPointId(itemId);
  }, []);

  const selectedPoint = useMemo(
    () => sortedOffers.find((offer) => offer.id === selectedPointId) || null,
    [selectedPointId, sortedOffers]
  );

  if (isLoading) {
    return <Spinner />;
  }

  const cityData = sortedOffers[0]?.city;

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {sortedOffers.length} places to stay in {activeCityName}
              </b>
              <SortOffers />
              <OfferList
                className="cities__places-list places__list tabs__content"
                cardStyle={CardStyle.Cities}
                offers={sortedOffers}
                limit={limit}
                onItemHover={handleIsItemHover}
              />
            </section>
            <div className="cities__right-section">
              {cityData && (
                <Map
                  page="MainPage"
                  city={cityData}
                  points={sortedOffers}
                  selectedPoint={selectedPoint}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
