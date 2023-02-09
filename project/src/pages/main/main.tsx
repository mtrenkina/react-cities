import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {toast} from 'react-toastify';
import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';
import { sortingTypes } from '../../const';
import CardsList from '../../components/cards-list/cards-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import { getFavouriteOffers, getOffers, getErrorMessage } from '../../store/offers-data/selectors';
import { getCity } from '../../store/user-actions/selectors';
import MainEmpty from '../main-empty/main-empty';
import { fetchFavouriteOffersAction } from '../../store/api-action';
import { store } from '../../store';
import Sprite from '../../components/svg-sprite/svg-sprite';
import Header from '../../components/header/header';

const Main = (): JSX.Element => {

  const [selectedOffer, setSelectedOffer] = useState<Offer>();
  const [sortedOffers, setSortedOffers] = useState<Offer[]>([]);
  const [currentSorting, setSorting] = useState<string>('Popular');

  const city = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const filteredOffers = useMemo(() => offers.filter((offer) => offer.city.name === city), [offers, city]);
  const errorMessage = useAppSelector(getErrorMessage);
  const favoritesOffers = useAppSelector(getFavouriteOffers);

  useEffect(() => {
    const sorted = sortingOffers([...filteredOffers]);
    setSortedOffers(sorted ?? []);
  }, [currentSorting, filteredOffers, city]);

  useEffect(() => {
    store.dispatch(fetchFavouriteOffersAction());

  }, [favoritesOffers.length]);

  const onCardHover = useCallback((listItemId: number) => {
    const currentPoint = filteredOffers.find((offer) => offer.id === listItemId);
    setSelectedOffer(currentPoint);
  }, [filteredOffers]);

  const changeSorting = useCallback((type: string) => {
    setSorting(type);
  }, []);

  const sortingByPrice = (offerA: Offer, offerB: Offer) => {
    const priceA = offerA.price;
    const priceB = offerB.price;

    switch(priceA < priceB) {
      case true:
        return 1;
      case false:
        return -1;
      default:
        return 0;
    }
  };

  const sortingOffers = (copyOffers: Offer[]) => {
    switch (currentSorting) {
      case sortingTypes.PRICELOWTOHIGHT:
        return copyOffers.sort((x, y) => x.price - y.price);
      case sortingTypes.PRICEHIGHTTOLOW:
        return copyOffers.sort(sortingByPrice);
      case sortingTypes.RAITING:
        return copyOffers.sort((x, y) => y.rating - x.rating);
      case sortingTypes.POPULAR:
        return copyOffers;
    }
  };

  if (errorMessage !== undefined) {
    toast.error(errorMessage);
  }

  if (offers.length === 0) {
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
                  {filteredOffers.length} places to stay in {city}
                </b>
                <PlacesSorting sortingType={sortingTypes} currentSorting={currentSorting} setSorting={changeSorting} />
                <CardsList
                  sortedOffers={sortedOffers}
                  cardClassName={'cities__place-card'}
                  imgClassName={'cities__image-wrapper'}
                  onCardHover={onCardHover}
                />
              </section>
              <div className='cities__right-section'>
                <section className='cities__map map'>
                  <Map city={city} points={filteredOffers} selectedPoint={selectedOffer} />
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
