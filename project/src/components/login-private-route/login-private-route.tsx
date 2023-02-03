import { useAppSelector } from '../../hooks';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
}

function LoginPrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children } = props;
  const authorizationStatus = useAppSelector((state) => state.change.authorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.NO_AUTH
      ? children
      : <Navigate to={AppRoute.LOGIN} />
  );
}

export default LoginPrivateRoute;
