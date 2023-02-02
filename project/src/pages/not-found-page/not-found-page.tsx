import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import {AppRoute, AuthorizationStatus} from '../../const';
import { logoutAction } from '../../store/api-action';

const NotFoundPage = (): JSX.Element => {
  const authorizationStatus = useAppSelector((state) => state.change.authorizationStatus);
  const dispatch = useAppDispatch();

  return(
    <div className="page page--gray">
      <title>Страница не найдена</title>
      <header className='header' id='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={'/favorites'}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    {authorizationStatus === AuthorizationStatus.Auth &&
                    <>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">3</span>
                    </>}
                  </Link>
                </li>
                <li className="header__nav-item">
                  {authorizationStatus === AuthorizationStatus.Auth ?
                    <Link className="header__nav-link" to={'/'} onClick={(evt) => {
                      evt.preventDefault();
                      dispatch(logoutAction());
                    }}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link> :
                    <Link className="header__nav-link" to={'/login'}>
                      <span className="header__signout">Sign in</span>
                    </Link>}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <div className='page page--gray'>
          <title>Страница не найдена</title>
          <div className='page--not_found' style={{ fontSize: '18px', textAlign: 'center', paddingTop: 100 }}>
            <h1>404. Page not found</h1>
            <Link to={AppRoute.Main} style={{ fontSize: '16px', color:'#4481C3', paddingTop: 20 }}>Вернуться на главную страницу</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
