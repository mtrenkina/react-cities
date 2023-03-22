import { memo, useEffect } from 'react';
import Card from '../card/card';
import { Offer } from '../../types/offer';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-auth/user-auth-selectors';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchFavouriteOffersAction } from '../../store/api-action';
import { useLocation } from 'react-router-dom';

export type CardsListProps = {
  sortedOffers: Offer[];
  onCardHover: (id: number) => void;
  cardClassName: string;
  imgClassName: string;
};

const CardsList = ({ sortedOffers, cardClassName, imgClassName, onCardHover }: CardsListProps): JSX.Element => {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== AppRoute.FAVOURITES && authorizationStatus === AuthorizationStatus.AUTH) {
      store.dispatch(fetchFavouriteOffersAction());
    }
  }, [authorizationStatus]);

  const changeActiveCard = (id: number) => {
    onCardHover(id);
  };

  return (
    <div className='cities__places-list places__list tabs__content'>
      {Array.from(sortedOffers).map((offer) => (
        <Card
          card={offer}
          offerId={offer.id}
          key={offer.id}
          changeActiveCard={changeActiveCard}
          cardClassName={cardClassName}
          imgClassName={imgClassName}
        />
      ))}
    </div>
  );
};

export default memo(CardsList);
