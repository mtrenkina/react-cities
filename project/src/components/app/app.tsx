import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthCheckedStatus } from '../../store/user-auth/user-auth-selectors';
import { getOffersLoadingStatus } from '../../store/offers-data/offers-data-selectors';
import LoadingPage from '../../pages/loading-page/loading-page';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favourites/favourites';
import Login from '../../pages/login/login';
import Property from '../../pages/property/property';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';

const App = (): JSX.Element => {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getOffersLoadingStatus);

  if (!isAuthChecked || isOffersDataLoading) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      <Route path={AppRoute.MAIN} element={<Main />} />
      <Route path={AppRoute.LOGIN} element={<Login />} />
      <Route
        path={AppRoute.FAVOURITES}
        element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
      />
      <Route path={`${AppRoute.ROOM}/:id`} element={<Property />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
