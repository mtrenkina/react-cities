import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-auth/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function LoginPrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children } = props;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.NO_AUTH
      ? children
      : <Navigate to={AppRoute.LOGIN} />
  );
}

export default LoginPrivateRoute;
