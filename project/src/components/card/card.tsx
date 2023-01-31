import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../mocks/const';
import {Offer} from '../../types/offer';

type CardsProps = {
  card: Offer;
  changeActiveCard?: (id: number) => void;
  cardClassName: string;
  imgClassName: string;
}

const Card = ({card, changeActiveCard, cardClassName, imgClassName}: CardsProps): JSX.Element => {

  const {mark, imageSrc, price, inBookmarks, rating, name, type, id} = card;
  const bookMarkBtnClasses = ['place-card__bookmark-button', 'button'];

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

  if (inBookmarks) {
    bookMarkBtnClasses.push('place-card__bookmark-button--active');
  }

  return (
    <article className={`${cardClassName} place-card`} onMouseEnter={handleCardMouseEnter} onMouseLeave={handleCardMouseleave}>
      {mark ? (
        <div className="place-card__mark">
          <span>{mark}</span>
        </div>
      ) : null}
      <div className={`${imgClassName} place-card__image-wrapper`}>
        <Link to='/'>
          <img className="place-card__image" src={imageSrc}
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
          <button className={bookMarkBtnClasses.join(' ')} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{inBookmarks ? 'In' : 'To'} bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${100 / 5 * rating}%` }} />
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

export default Card;
