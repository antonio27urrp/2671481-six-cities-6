import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesList } from '../../components/favorites-list/favorites-list';
import { Header } from '../../components/header/header';
import { Paths } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchFavoritesAction } from '../../store/api-actions';
import { getFavoritesOffers } from '../../store/selectors/offers-selectors';

export function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavoritesOffers);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const hasOffers = favoriteOffers.length > 0;

  return (
    <div className="page">
      <Header />
      <main
        className={`page__main page__main--favorites ${
          hasOffers ? '' : 'page__main--favorites-empty'
        } `}
      >
        <div className="page__favorites-container container">
          {hasOffers ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList offers={favoriteOffers} />
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
