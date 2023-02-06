import { Link } from 'react-router-dom';
import { cities } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCity } from '../../store/user-actions/selectors';
import { changeCity } from '../../store/user-actions/user-actions';

type citiesLiProps = {
  city: string;
}

const CitiesLi = ({city}: citiesLiProps): JSX.Element => {

  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCity);

  return (
    <li className='locations__item'>
      <Link className={`locations__item-link tabs__item ${city === currentCity ? 'tabs__item--active' : ''}`} to='/' onClick={() => dispatch(changeCity(city))}>
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
