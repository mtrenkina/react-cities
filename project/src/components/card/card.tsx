import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import {Offer} from '../../types/offer';

type CardsProps = {
  card: Offer;
  changeActiveCard?: (id: number) => void;
  cardClassName: string;
  imgClassName: string;
}

const Card = ({card, changeActiveCard, cardClassName, imgClassName}: CardsProps): JSX.Element => {

  const {isPremium, previewImage, price, isFavotite, rating, title, type, id} = card;

  const handleCardMouseEnter = () => {
    if (changeActiveCard) {
      changeActiveCard(card.id);
    }
  };

  const handleCardMouseleave = () => {
    if (changeActiveCard) {
      changeActiveCard(0);
    }
  };

  return (
    <article className={`${cardClassName} place-card`} onMouseEnter={handleCardMouseEnter} onMouseLeave={handleCardMouseleave}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${imgClassName} place-card__image-wrapper`}>
        <Link to={`${AppRoute.ROOM}/${id}`}>
          <img className="place-card__image" src={previewImage}
            width={imgClassName === 'favorites__image-wrapper' ? 150 : 260}
            height={imgClassName === 'favorites__image-wrapper' ? 110 : 200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`button place-card__bookmark-button ${isFavotite ? 'place-card__bookmark-button--active' : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{isFavotite ? 'In' : 'To'} bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${100 / 5 * rating}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.ROOM}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default Card;
