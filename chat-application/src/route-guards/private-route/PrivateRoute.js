import { Navigate, Outlet } from 'react-router-dom';
import { ROUTE_LOGIN } from '../../utilities/routeNames.js';

const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');
  return !token;
};

const PrivateRoute = () => {

  const accessToken = isAuthenticated();

  return accessToken ? <Navigate to={ ROUTE_LOGIN } /> : <Outlet/>;
};

export default PrivateRoute;
