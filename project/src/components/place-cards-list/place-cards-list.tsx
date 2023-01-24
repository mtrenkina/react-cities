import { useState } from 'react';
import { Offer } from '../../types/types';
import PlaceCard from '../place-card/place-card';

const PlaceCardsList = (props: { offers: Offer[] }): JSX.Element => {

  const [activeCard, setActiveCard] = useState(0);

  const onCardHover = (id: number) => {
    setActiveCard(id);
    /* eslint-disable */ console.log(activeCard);
  };

  return (
    <div className='cities__places-list places__list tabs__content'>
      {Array.from(props.offers).map((offer) => (
        <PlaceCard
        card = {offer}
        key={offer.id}
        onCardHover={onCardHover}
        />
      ))}
    </div>
  )
}

export default PlaceCardsList;
