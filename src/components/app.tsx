import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Paths } from '../const';
import { useAppDispatch } from '../hooks/redux';
import { FavoritesPage } from '../pages/favorites-page/favorites-page';
import { LoginPage } from '../pages/login-page/login-page';
import { MainPage } from '../pages/main-page/main-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { OfferPage } from '../pages/offer-page/offer-page';
import { checkAuthAction, fetchOffers } from '../store/api-actions';
import PrivateRoute from './private-route/private-route';

type AppProps = {
  limit: number;
};

export function App(props: AppProps): JSX.Element {
  const { limit } = props;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.Main} element={<MainPage limit={limit} />} />
        <Route path={Paths.Login} element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path={Paths.Favorites} element={<FavoritesPage />} />
        </Route>
        <Route path={Paths.Offer} element={<OfferPage />} />
        <Route path={Paths.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
