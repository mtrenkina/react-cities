import Main from '../main/main';
import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Property from '../property/property';
import NotFound from '../../pages/not-found/not-found';
import LoginPrivateRoute from '../login-private-route/login-private-route';
import FavouritesPrivateRoute from '../favourites-private-route/favourites-private-route';
import { Offer } from '../../types/offer';
import { City } from '../../types/city';
import { AppRoute, AuthorizationStatus } from '../../mocks/const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

type AppProps = {
  offers: Offer[];
  city: City;
}

const App = ({offers, city}: AppProps): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<Main offers={offers} city={city} />}
      />
      <Route
        path={AppRoute.Login}
        element={<LoginPrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}><Login /></LoginPrivateRoute>}
      />
      <Route
        path={AppRoute.Favorites}
        element={<FavouritesPrivateRoute authorizationStatus={AuthorizationStatus.Auth}><Favorites offers={offers}/></FavouritesPrivateRoute>}
      />
      <Route
        path={`${AppRoute.Room}/:id`}
        element={<Property offers={offers} city={city} />}
      />
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  </BrowserRouter>
);

export default App;
