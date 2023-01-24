import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../types/const';
import {Offer} from '../../types/types';

type PlaceCardProps = {card: Offer} & {onCardHover: (id: number) => void}

const PlaceCard = ({card, onCardHover}: PlaceCardProps): JSX.Element => {

  const {mark, imageSrc, price, inBookmarks, rating, name, type, id} = card;
  const bookMarkBtnClasses = ['place-card__bookmark-button', 'button'];

  const handleCardMouseEnter = () => {
    ///* eslint-disable */ debugger;
    onCardHover(card.id);
  };

  const handleCardMouseleave = () => {
    onCardHover(0);
  };

  if (inBookmarks) {
    bookMarkBtnClasses.push('place-card__bookmark-button--active');
  }

  return (
    <article className="cities__place-card place-card" onMouseEnter={handleCardMouseEnter} onMouseLeave={handleCardMouseleave}>
      {mark ? (
        <div className="place-card__mark">
          <span>{mark}</span>
        </div>
      ) : null}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={imageSrc} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={bookMarkBtnClasses.join(' ')} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{inBookmarks ? 'In' : 'To'} bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${id}`}>{name}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
