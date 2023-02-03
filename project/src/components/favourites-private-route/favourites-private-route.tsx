import { useAppSelector } from '../../hooks';
import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
}

function FavouritesPrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children } = props;
  const authorizationStatus = useAppSelector((state) => state.change.authorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.AUTH
      ? children
      : <Navigate to={AppRoute.LOGIN} />
  );
}

export default FavouritesPrivateRoute;
