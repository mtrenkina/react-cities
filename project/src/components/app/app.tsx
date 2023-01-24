import Main from '../main/main';
import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Property from '../property/property';
import NotFound from '../../pages/not-found/not-found';
import LoginPrivateRoute from '../login-private-route/login-private-route';
import FavouritesPrivateRoute from '../favourites-private-route/favourites-private-route';
import { Offer, State } from '../../types/types';
import { AppRoute, AuthorizationStatus } from '../../types/const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = (props: { offers: Offer[]; city: State }): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<Main offers={props.offers} city={props.city} />}
      />
      <Route
        path={AppRoute.Login}
        element={<LoginPrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}><Login /></LoginPrivateRoute>}
      />
      <Route
        path={AppRoute.Favorites}
        element={<FavouritesPrivateRoute authorizationStatus={AuthorizationStatus.Auth}><Favorites offers={props.offers}/></FavouritesPrivateRoute>}
      />
      <Route
        path={`${AppRoute.Room}/:id`}
        element={<Property />}
      />
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  </BrowserRouter>
);

export default App;
