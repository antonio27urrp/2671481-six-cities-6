import { Navigate, Outlet } from 'react-router-dom';

import { Paths } from '../../const';

type PropsType = {
  isAuth: boolean;
};

function PrivateRoute({ isAuth }: PropsType) {
  return isAuth ? <Outlet /> : <Navigate to={Paths.Login} />;
}

export default PrivateRoute;
