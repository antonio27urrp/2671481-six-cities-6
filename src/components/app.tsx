import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Paths } from '../const';
import { FavoritesPage } from '../pages/favorites-page/favorites-page';
import { LoginPage } from '../pages/login-page/login-page';
import { MainPage } from '../pages/main-page/main-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { OfferPage } from '../pages/offer-page/offer-page';
import PrivateRoute from './private-route/private-route';

type AppProps = {
  limit: number;
};

export function App(props: AppProps): JSX.Element {
  const { limit } = props;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.Main} element={<MainPage limit={limit} />} />
        <Route path={Paths.Login} element={<LoginPage />} />
        <Route element={<PrivateRoute isAuth />}>
          <Route path={Paths.Favorites} element={<FavoritesPage />} />
        </Route>
        <Route path={Paths.Offer} element={<OfferPage />} />
        <Route path={Paths.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
