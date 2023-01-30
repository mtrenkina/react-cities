import Card from '../card/card';
import { useAppSelector } from '../../hooks';

type CardsListProps = {
  onCardHover: (id: number) => void;
  cardClassName: string;
  imgClassName: string;
};

const CardsList = ({ cardClassName, imgClassName, onCardHover }: CardsListProps): JSX.Element => {

  const offers = useAppSelector((state) => state.change.offers);

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
