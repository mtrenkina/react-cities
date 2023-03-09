import { Link } from 'react-router-dom';
import Card from '../../components/card/card';
import { useAppSelector } from '../../hooks';
import { useSelectedOffer } from '../../hooks/useSelectedOffer';
import { getFavouriteOffers } from '../../store/offers-data/offers-data-selectors';

const FavouritesList = (): JSX.Element => {
  const favouriteOffers = useAppSelector(getFavouriteOffers);
  const favouriteCities = Array.from(favouriteOffers).map((offer) => offer.city.name);
  const uniqueFavouriteCities = Array.from(new Set(favouriteCities));
  const { setCurrentOfferId } = useSelectedOffer();

  const onCardHover = (listItemId: number) => {
    setCurrentOfferId(listItemId);
  };

  return (
    <ul className='favorites__list'>
      {uniqueFavouriteCities.map((city) => (
        <li className='favorites__locations-items' key={city}>
          <div className='favorites__locations locations locations--current'>
            <div className='locations__item'>
              <Link className='locations__item-link' to='/'>
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className='favorites__places'>
            {Array.from(favouriteOffers)
              .filter((el) => el.city.name === city)
              .map((offer) => (
                <Card
                  cardClassName={'favorites__card'}
                  imgClassName={'favorites__image-wrapper'}
                  changeActiveCard={onCardHover}
                  card={offer}
                  key={offer.id}
                  offerId={offer.id}
                />
              ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FavouritesList;
