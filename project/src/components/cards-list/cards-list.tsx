import { useEffect } from 'react';
import Card from '../card/card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fillOffersList } from '../../store/action';
import { Offer } from '../../types/offer';

type CardsListProps = {
  sortedOffers: Offer[];
  onCardHover: (id: number) => void;
  cardClassName: string;
  imgClassName: string;
};

const CardsList = ({ sortedOffers, cardClassName, imgClassName, onCardHover }: CardsListProps): JSX.Element => {
  const city = useAppSelector((state) => state.change.city);
  const offers = useAppSelector((state) => state.change.offers).filter((offer) => offer.city.id === city.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fillOffersList(offers));
  }, [city]);

  const changeActiveCard = (id: number) => {
    onCardHover(id);
  };

  return (
    <div className='cities__places-list places__list tabs__content'>
      {Array.from(sortedOffers).map((offer) => (
        <Card
          card={offer}
          key={offer.id}
          changeActiveCard={changeActiveCard}
          cardClassName={cardClassName}
          imgClassName={imgClassName}
        />
      ))}
    </div>
  );
};

export default CardsList;
