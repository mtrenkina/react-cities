import { Link } from 'react-router-dom';
import { cities } from '../../mocks/cities';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {changeCurrentCity} from '../../store/action';

type citiesLiProps = {
  city: string;
}

const CitiesLi = ({city}: citiesLiProps): JSX.Element => {

  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.change.city);

  return (
    <li className='locations__item'>
      <Link className={`locations__item-link tabs__item ${city === currentCity ? 'tabs__item--active' : ''}`} to='/' onClick={() => dispatch(changeCurrentCity(city))}>
        <span>{city}</span>
      </Link>
    </li>
  );
};

const CitiesList = (): JSX.Element => (
  <ul className='locations__list tabs__list'>
    {Array.from(cities).map((city) => (
      <CitiesLi key={city.name} city={city.name} />
    ))}
  </ul>
);

export default CitiesList;
