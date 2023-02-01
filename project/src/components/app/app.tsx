import Main from '../main/main';
import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Property from '../property/property';
import NotFound from '../../pages/not-found/not-found';
import LoginPrivateRoute from '../login-private-route/login-private-route';
import FavouritesPrivateRoute from '../favourites-private-route/favourites-private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import Loading from '../../pages/loading/loading';

const App = (): JSX.Element => {
  const authorizationStatus = useAppSelector((state) => state.change.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.change.isDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />} />
        <Route
          path={AppRoute.Login}
          element={
            <LoginPrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Login />
            </LoginPrivateRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <FavouritesPrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites />
            </FavouritesPrivateRoute>
          }
        />
        <Route path={`${AppRoute.Room}/:id`} element={<Property />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
