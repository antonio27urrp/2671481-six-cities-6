import { useState } from 'react';
import { CityList } from '../../components/city-list/city-list';
import { Header } from '../../components/header/header';
import { Map } from '../../components/map/map';
import { OfferList } from '../../components/offers-list/offers-list';
import { CardStyle } from '../../const/offer';
import { useAppSelector } from '../../hooks/redux';
import { getActiveCity } from '../../store/selectors/city-selectors';
import { getFilteredOffers } from '../../store/selectors/offers-selectors';
import { Offer } from '../../types/offer.type';

type MainPageProps = {
  limit: number;
};

export function MainPage(props: MainPageProps): JSX.Element {
  const { limit } = props;

  const activeCityName = useAppSelector(getActiveCity);
  const filteredOffers = useAppSelector(getFilteredOffers);

  const [selectedPoint, setSelectedPoint] = useState<Offer | null>(null);

  const handleIsItemHover = (itemId: Offer['id']) => {
    const currentPoint = filteredOffers.find((offer) => offer.id === itemId);
    setSelectedPoint(currentPoint || null);
  };

  const cityData = filteredOffers[0].city;

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
                {filteredOffers.length} places to stay in {activeCityName}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <OfferList
                className="cities__places-list places__list tabs__content"
                cardStyle={CardStyle.Cities}
                offers={filteredOffers}
                limit={limit}
                onItemHover={handleIsItemHover}
              />
            </section>
            <div className="cities__right-section">
              <Map
                page="MainPage"
                city={cityData}
                points={filteredOffers}
                selectedPoint={selectedPoint}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
