import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../mocks/const';
import { Offer } from '../../types/types';

const FavoritesCard = (props: { offer: Offer }): JSX.Element => {
  const { mark, imageSrc, price, inBookmarks, rating, name, type, id } = props.offer;

  return (
    <article className='favorites__card place-card'>
      {mark ? (
        <div className='place-card__mark'>
          <span>{mark}</span>
        </div>
      ) : null}
      <div className='favorites__image-wrapper place-card__image-wrapper'>
        <Link to='/'>
          <img className='place-card__image' src={imageSrc} width={150} height={110} alt='Place image' />
        </Link>
      </div>
      <div className='favorites__card-info place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${inBookmarks ? 'place-card__bookmark-button--active' : '' }`} type='button'>
            <svg className='place-card__bookmark-icon' width={18} height={19}>
              <use xlinkHref='#icon-bookmark' />
            </svg>
            <span className='visually-hidden'>In bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: `${rating}%` }} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={`${AppRoute.Room}/${id}`}>{name}</Link>
        </h2>
        <p className='place-card__type'>{type}</p>
      </div>
    </article>
  );
};

export default FavoritesCard;
