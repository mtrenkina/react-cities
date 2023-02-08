import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';
import { sortingTypes } from '../../const';
import Logo from '../../components/logo/logo';
import CardsList from '../../components/cards-list/cards-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import UserInfo from '../../components/user-info/user-info';
import { getFavouriteOffers, getOffers } from '../../store/offers-data/selectors';
import { getCity } from '../../store/user-actions/selectors';
import MainEmpty from '../main-empty/main-empty';
import { fetchFavouriteOffersAction } from '../../store/api-action';
import { store } from '../../store';

const Main = (): JSX.Element => {

  const [selectedOffer, setSelectedOffer] = useState<Offer>();
  const [sortedOffers, setSortedOffers] = useState<Offer[]>([]);
  const [currentSorting, setSorting] = useState<string>('Popular');

  const city = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const filteredOffers = useMemo(() => offers.filter((offer) => offer.city.name === city), [offers, city]);
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

  if (offers.length === 0) {
    return (<MainEmpty />);
  }

  return (
    <React.Fragment>
      <div style={{ display: 'none' }}>
        <svg xmlns='http://www.w3.org/2000/svg'>
          <symbol id='icon-arrow-select' viewBox='0 0 7 4'>
            <path fillRule='evenodd' clipRule='evenodd' d='M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z'></path>
          </symbol>
          <symbol id='icon-bookmark' viewBox='0 0 17 18'>
            <path d='M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z'></path>
          </symbol>
          <symbol id='icon-star' viewBox='0 0 13 12'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z'
            >
            </path>
          </symbol>
        </svg>
      </div>

      <div className='page page--gray page--main'>
        <header className='header'>
          <div className='container'>
            <div className='header__wrapper'>
              <div className='header__left'>
                <Logo />
              </div>
              <nav className='header__nav'>
                <ul className='header__nav-list'>
                  <UserInfo />
                </ul>
              </nav>
            </div>
          </div>
        </header>

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
