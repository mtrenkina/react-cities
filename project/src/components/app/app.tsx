import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthCheckedStatus } from '../../store/user-auth/user-auth-selectors';
import {getOffersLoadingStatus} from '../../store/offers-data/offers-data-selectors';
import LoadingPage from '../../pages/loading-page/loading-page';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favourites/favourites';
import Login from '../../pages/login/login';
import Property from '../../pages/property/property';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoginPrivateRoute from '../login-private-route/login-private-route';
import FavouritesPrivateRoute from '../favourites-private-route/favourites-private-route';


const App = (): JSX.Element => {

  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getOffersLoadingStatus);

  if (!isAuthChecked || isOffersDataLoading) {
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
