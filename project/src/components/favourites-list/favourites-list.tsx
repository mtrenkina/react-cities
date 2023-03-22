import { Link } from 'react-router-dom';
import Card from '../../components/card/card';
import { CardClassName, ImgClassName } from '../../const';
import { useAppSelector } from '../../hooks';
import { getFavouriteOffers } from '../../store/offers-data/offers-data-selectors';

const FavouritesList = (): JSX.Element => {
  const favouriteOffers = useAppSelector(getFavouriteOffers);
  const favouriteCities = Array.from(favouriteOffers).map((offer) => offer.city.name);
  const uniqueFavouriteCities = Array.from(new Set(favouriteCities));

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
                  cardClassName={CardClassName.FAVOURITES}
                  imgClassName={ImgClassName.FAVOURITES}
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
