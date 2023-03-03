import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { changeCity } from '../../store/user-actions/user-actions';
import { getCity } from '../../store/user-actions/user-actions-selectors';
import { cities } from '../../const';
import CitiesItem from '../cities-item/cities-item';

const CitiesList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCity);

  const clickHandler = useCallback(
    (cityName: string) => {
      dispatch(changeCity(cityName));
    },
    [dispatch]
  );

  return (
    <ul className='locations__list tabs__list'>
      {Array.from(cities).map((city) => (
        <CitiesItem key={city.name} city={city} currentCity={currentCity} clickHandler={clickHandler} />
      ))}
    </ul>
  );
};

export default CitiesList;
