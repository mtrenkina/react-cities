import { Link } from 'react-router-dom';
import { cities } from '../../mocks/cities';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { City } from '../../types/city';
import {changeCurrentCity} from '../../store/action';

type citiesLiProps = {
  city: City;
}

const CitiesLi = ({city}: citiesLiProps): JSX.Element => {

  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.change.city);

  return (
    <li className='locations__item'>
      <Link className={`locations__item-link tabs__item ${city === currentCity ? 'tabs__item--active' : ''}`} to='/' onClick={() => dispatch(changeCurrentCity(city))}>
        <span>{city.name}</span>
      </Link>
    </li>
  );
};

const CitiesList = (): JSX.Element => (
  <ul className='locations__list tabs__list'>
    {Array.from(cities).map((city) => (
      <CitiesLi key={city.id} city={city}/>
    ))}
  </ul>
);

export default CitiesList;
