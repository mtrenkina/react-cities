import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../types/const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function LoginPrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.NoAuth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default LoginPrivateRoute;
