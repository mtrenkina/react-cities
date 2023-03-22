import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offer';
import { getAuthorizationStatus } from '../../store/user-auth/user-auth-selectors';
import { changeFavouriteStatusAction } from '../../store/api-action';

export type CardsProps = {
  card: Offer;
  cardClassName: string;
  imgClassName: string;
  offerId: number;
  changeActiveCard?: (id: number) => void;
};

const Card = ({ card, cardClassName, imgClassName, offerId, changeActiveCard }: CardsProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isPremium, previewImage, price, isFavorite, rating, title, type, id } = card;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const onCardMouseEnterHandler = () => {
    if (changeActiveCard) {
      changeActiveCard(id);
    }
  };

  const onCardMouseLeaveHandler = () => {
    if (changeActiveCard) {
      changeActiveCard(0);
    }
  };

  const onFavouriteButtonClickHandler = () => {
    if (authorizationStatus !== AuthorizationStatus.AUTH) {
      navigate(AppRoute.LOGIN);
    } else {
      dispatch(changeFavouriteStatusAction({ hotelId: offerId, isFavorite: !isFavorite }));
    }
  };

  return (
    <article
      className={`${cardClassName} place-card`}
      onMouseEnter={onCardMouseEnterHandler}
      onMouseLeave={onCardMouseLeaveHandler}
    >
      {isPremium && (
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      )}
      <div className={`${imgClassName} place-card__image-wrapper`}>
        <Link to={`${AppRoute.ROOM}/${id}`}>
          <img
            className='place-card__image'
            src={previewImage}
            width={imgClassName === 'favorites__image-wrapper' ? 150 : 260}
            height={imgClassName === 'favorites__image-wrapper' ? 110 : 200}
            alt='Place image'
          />
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button
            className={`button place-card__bookmark-button ${
              !isFavorite || authorizationStatus !== AuthorizationStatus.AUTH
                ? ''
                : 'place-card__bookmark-button--active'
            }`}
            data-testid='favourite__button'
            type='button'
            onClick={onFavouriteButtonClickHandler}
          >
            <svg className='place-card__bookmark-icon' width={18} height={19}>
              <use xlinkHref='#icon-bookmark' />
            </svg>
            <span className='visually-hidden'>{isFavorite ? 'In' : 'To'} bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: `${(100 / 5) * rating}%` }} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={`${AppRoute.ROOM}/${id}`}>{title}</Link>
        </h2>
        <p className='place-card__type'>{type}</p>
      </div>
    </article>
  );
};

export default Card;
