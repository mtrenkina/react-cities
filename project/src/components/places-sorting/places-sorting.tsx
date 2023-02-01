import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSorting } from '../../store/action';
import { sortingTypes } from '../../const';

const PlacesSorting = (): JSX.Element => {

  const currentSortingState = useAppSelector((state) => state.change.sort);
  const dispatch = useAppDispatch();
  const [activeState, setActiveState] = useState(false);

  const sortingClickHandler = () => {
    setActiveState(!activeState);
  };

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by</span>
      <span className='places__sorting-type' tabIndex={0} onClick={sortingClickHandler}>
        {currentSortingState}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select'></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${activeState ? 'places__options--opened' : ''}`}>
        {Object.values(sortingTypes).map((type)=>
          <li className={`places__option ${type === currentSortingState ? 'places__option--active' : ''}`} tabIndex={0} key={type} onClick={() => dispatch(changeSorting(type))}>{type}</li>
        )}
      </ul>
    </form>
  );
};

export default PlacesSorting;
