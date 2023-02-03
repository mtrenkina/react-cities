import Main from '../main/main';
import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Property from '../property/property';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoginPrivateRoute from '../login-private-route/login-private-route';
import FavouritesPrivateRoute from '../favourites-private-route/favourites-private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import LoadingPage from '../../pages/loading-page/loading-page';

const App = (): JSX.Element => {
  const authorizationStatus = useAppSelector((state) => state.change.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.change.areOffersLoading);
  const isNearOffersDataLoading = useAppSelector((state) => state.change.areNearOffersLoading);

  if (authorizationStatus === AuthorizationStatus.UNKNOWN || isOffersDataLoading || isNearOffersDataLoading) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.MAIN} element={<Main />} />
        <Route
          path={AppRoute.LOGIN}
          element={
            <LoginPrivateRoute>
              <Login />
            </LoginPrivateRoute>
          }
        />
        <Route
          path={AppRoute.FAVOURITES}
          element={
            <FavouritesPrivateRoute>
              <Favorites />
            </FavouritesPrivateRoute>
          }
        />
        <Route path={`${AppRoute.ROOM}/:id`} element={<Property />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
