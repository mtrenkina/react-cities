import Main from '../main/main';
import Favorites from '../favorites/favorites';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import Login from '../login/login';
import MainEmpty from '../main-empty/main-empty';
import Property from '../property/property';
import PropertyNotLogged from '../property-not-logged/property-not-logged';
import NotFound from '../../pages/not-found/not-found';
import { Offer, State } from '../../types/types-and-mock';
import { AppRoute } from '../../types/const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = (props: { offers: Offer[]; city: State }): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Main} element={<Main offers={props.offers} city={props.city} />} />
      <Route path={AppRoute.MainEmpty} element={<MainEmpty />} />
      <Route path={AppRoute.Favorites} element={<Favorites />} />
      <Route path={AppRoute.FavoritesEmpty} element={<FavoritesEmpty />} />
      <Route path={AppRoute.Login} element={<Login />} />
      <Route path={AppRoute.Property} element={<Property />} />
      <Route path={AppRoute.PropertyNotLogged} element={<PropertyNotLogged />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
