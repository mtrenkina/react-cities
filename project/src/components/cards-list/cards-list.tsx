import { memo } from 'react';
import Card from '../card/card';
import { Offer } from '../../types/offer';

type CardsListProps = {
  sortedOffers: Offer[];
  onCardHover: (id: number) => void;
  cardClassName: string;
  imgClassName: string;
};

const CardsList = ({ sortedOffers, cardClassName, imgClassName, onCardHover }: CardsListProps): JSX.Element => {

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
