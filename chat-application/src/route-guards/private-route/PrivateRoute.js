import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTE_LOGIN } from '../../utilities/routeNames.js';

const PrivateRoute = () => {
  const location = useLocation();
  const tokenInLocalStorage = localStorage.getItem('access_token');
  const tokenInQueryParam = new URLSearchParams(location.search).get('token');
  if(tokenInQueryParam ) localStorage.setItem('access_token', tokenInQueryParam)

  const isAuthenticated = () => {
    return !!tokenInLocalStorage || !!tokenInQueryParam;
  };

  const accessToken = isAuthenticated();

  return accessToken ? <Outlet /> : <Navigate to={ROUTE_LOGIN} />;
};

export default PrivateRoute;
