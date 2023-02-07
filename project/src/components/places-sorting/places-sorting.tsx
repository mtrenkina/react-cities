import { memo, useState } from 'react';
import { sortingTypes } from '../../const';

type SortOptionsProps = {
  sortingType: typeof sortingTypes;
    currentSorting: string;
    setSorting: (type: string)=> void;
};

const PlacesSorting = ({sortingType, currentSorting, setSorting}: SortOptionsProps): JSX.Element => {

  const [activeState, setActiveState] = useState(false);

  const sortingClickHandler = (type: string) => () =>{
    setSorting(type);
    setActiveState(!activeState);
  };

  const placesOptionsClickHandler = () => {
    setActiveState(!activeState);
  };

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by</span>
      <span className='places__sorting-type' tabIndex={0} onClick={placesOptionsClickHandler}>
        {currentSorting}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select'></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${activeState ? 'places__options--opened' : ''}`}>
        {Object.values(sortingType).map((type)=>
          <li className={`places__option ${type === currentSorting ? 'places__option--active' : ''}`} tabIndex={0} key={type} onClick={sortingClickHandler(type)}>{type}</li>
        )}
      </ul>
    </form>
  );
};

export default memo(PlacesSorting);
