import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../store/offers-data/offers-data-selectors';
import { useAppSelector } from '../../hooks';
import { CardClassName, ImgClassName, sortingTypes } from '../../const';
import CardsList from '../../components/cards-list/cards-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import MainEmpty from '../main-empty/main-empty';
import Sprite from '../../components/svg-sprite/svg-sprite';
import Header from '../../components/header/header';
import { useSorting } from '../../hooks/useSorting';
import { useFilter } from '../../hooks/useFilter';
import { Offer } from '../../types/offer';

const Main = (): JSX.Element => {

  const {filteredOffers, city} = useFilter();
  const {sortedOffers, sorting, setSorting} = useSorting(sortingTypes.POPULAR, filteredOffers);
  const [selectedOffer, setSelectedOffer] = useState<Offer>();
  const errorMessage = useAppSelector(getErrorMessage);

  const onCardHover = useCallback((listItemId: number) => {
    const currentPoint = filteredOffers.find((offer) => offer.id === listItemId);
    setSelectedOffer(currentPoint);
  }, [filteredOffers]);

  const changeSorting = (type: string) => {
    setSorting(type);
  };

  if (errorMessage !== undefined) {
    toast.error(errorMessage);
  }

  if (filteredOffers.length === 0) {
    return (<MainEmpty />);
  }

  return (
    <React.Fragment>
      <Sprite />
      <div className='page page--gray page--main'>
        <Header />

        <main className='page__main page__main--index'>
          <h1 className='visually-hidden'>Cities</h1>
          <div className='tabs'>
            <section className='locations container'>
              <CitiesList />
            </section>
          </div>
          <div className='cities'>
            <div className='cities__places-container container'>
              <section className='cities__places places'>
                <h2 className='visually-hidden'>Places</h2>
                <b className='places__found'>
                  {filteredOffers.length} {`place${filteredOffers.length > 1 ? 's' : ''}`} to stay in {city}
                </b>
                <PlacesSorting sortingType={sortingTypes} currentSorting={sorting} setSorting={changeSorting} />
                <CardsList
                  sortedOffers={sortedOffers}
                  cardClassName={CardClassName.MAIN}
                  imgClassName={ImgClassName.MAIN}
                  onCardHover={onCardHover}
                />
              </section>
              <div className='cities__right-section'>
                <section className='cities__map map'>
                  <Map city={city} points={filteredOffers} selectedPoint={selectedOffer}/>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Main;
