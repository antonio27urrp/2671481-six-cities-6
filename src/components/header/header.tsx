import { memo, MouseEvent, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Paths } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchFavoritesAction, logoutAction } from '../../store/api-actions';
import { getFavoritesCount } from '../../store/selectors/offers-selectors';
import { getIsAuth, getUserData } from '../../store/selectors/user-selectors';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);
  const user = useAppSelector(getUserData);
  const favoritesCount = useAppSelector(getFavoritesCount);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchFavoritesAction());
    }
  }, [isAuth, dispatch]);

  const handleLogout = useCallback(
    (evt: MouseEvent<HTMLAnchorElement>) => {
      evt.preventDefault();
      dispatch(logoutAction());
    },
    [dispatch]
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link header__logo-link--active"
              to={Paths.Main}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth && (
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={Paths.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      {user?.email}
                    </span>
                    <span className="header__favorite-count">
                      {favoritesCount}
                    </span>
                  </Link>
                </li>
              )}
              <li className="header__nav-item">
                {isAuth ? (
                  <a className="header__nav-link" onClick={handleLogout}>
                    <span className="header__signout">Sign out</span>
                  </a>
                ) : (
                  <Link className="header__nav-link" to={Paths.Login}>
                    <span className="header__login">Sign in</span>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

const memoHeader = memo(Header);
export { memoHeader as Header };
