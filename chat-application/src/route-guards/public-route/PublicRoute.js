import {Navigate, Outlet} from 'react-router-dom'
import {ROUTE_HOME} from '../../utilities/routeNames.js'

const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    return !!token; 
};

const PublicRoute = () => {
   const accessToken = isAuthenticated ()
   return accessToken ? <Navigate to={ROUTE_HOME}/> : <Outlet/>
}

export default PublicRoute