import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { City } from '../../types/city';

export type CitiesItemProps = {
  city: City;
  currentCity: string;
  clickHandler: (city: string)=> void;
}

const CitiesItem = ({city, currentCity, clickHandler}: CitiesItemProps): JSX.Element => {

  const onCityHandlerClick = useCallback(() => {
    clickHandler(city.name);
  }, [city.name, clickHandler]);

  return (
    <li className='locations__item'>
      <Link className={`locations__item-link tabs__item ${city.name === currentCity ? 'tabs__item--active' : ''}`} to='/'
        onClick={onCityHandlerClick}
        data-testid='city-link'
      >
        <span>{city.name}</span>
      </Link>
    </li>
  );
};

export default memo(CitiesItem);
