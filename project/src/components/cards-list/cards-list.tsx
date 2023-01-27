import { Offer } from '../../types/offers';
import Card from '../card/card';

type CardsListProps = {
  offers: Offer[];
  onCardHover: (id: number) => void;
  cardClassName: string;
  imgClassName: string;
};

const CardsList = ({ offers, cardClassName, imgClassName, onCardHover }: CardsListProps): JSX.Element => {

  const changeActiveCard = (id: number) => {
    onCardHover(id);
  };

  return (
    <div className='cities__places-list places__list tabs__content'>
      {Array.from(offers).map((offer) => (
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
