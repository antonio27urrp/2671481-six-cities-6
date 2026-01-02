import { Link } from 'react-router-dom';
import { FavoritesList } from '../../components/favorites-list/favorites-list';
import { Header } from '../../components/header/header';
import { Paths } from '../../const';
import { mockOffers } from '../../mocks/offers';

export function FavoritesPage(): JSX.Element {
  const isOffers = mockOffers.length > 0;

  return (
    <div className="page">
      <Header />
      <main
        className={`page__main page__main--favorites ${
          isOffers ? '' : 'page__main--favorites-empty'
        } `}
      >
        <div className="page__favorites-container container">
          {isOffers ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList offers={mockOffers} />
            </section>
          ) : (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future
                  trips.
                </p>
              </div>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={Paths.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
}
