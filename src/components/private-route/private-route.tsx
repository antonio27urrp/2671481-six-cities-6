import { Navigate, Outlet } from 'react-router-dom';

import { AuthorizationStatus, Paths } from '../../const';
import { useAppSelector } from '../../hooks/redux';
import {
  getAuthorizationStatus,
  getIsAuth,
} from '../../store/selectors/user-selectors';
import { Spinner } from '../spinner/spinner';

function PrivateRoute() {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = useAppSelector(getIsAuth);

  if (authStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }
  return isAuth ? <Outlet /> : <Navigate to={Paths.Login} />;
}

export default PrivateRoute;
