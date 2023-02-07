import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-action';
import { getAuthorizationStatus } from '../../store/user-auth/selectors';
import { getFavouriteOffers } from '../../store/offers-data/selectors';

function UserInfo(): JSX.Element {

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favouriteOffers = useAppSelector(getFavouriteOffers);

  return (
    <React.Fragment>
      <li className='header__nav-item user'>
        <Link className='header__nav-link header__nav-link--profile' to={'/favorites'}>
          <div className='header__avatar-wrapper user__avatar-wrapper'></div>
          {authorizationStatus === AuthorizationStatus.AUTH && (
            <>
              <span className='header__user-name user__name'>Oliver.conner@gmail.com</span>
              <span className='header__favorite-count'>{favouriteOffers.length}</span>
            </>
          )}
        </Link>
      </li>
      <li className='header__nav-item'>
        {authorizationStatus === AuthorizationStatus.AUTH ? (
          <Link
            className='header__nav-link'
            to={'/'}
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
            }}
          >
            <span className='header__signout'>Sign out</span>
          </Link>
        ) : (
          <Link className='header__nav-link' to={'/login'}>
            <span className='header__signout'>Sign in</span>
          </Link>
        )}
      </li>
    </React.Fragment>
  );
}

export default memo(UserInfo);
