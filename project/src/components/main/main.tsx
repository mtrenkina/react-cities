import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { sortingTypes, sortingByPrice } from '../../mocks/const';
import Logo from '../../components/logo/logo';
import CardsList from '../cards-list/cards-list';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import PlacesSorting from '../places-sorting/places-sorting';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fillOffersList } from '../../store/action';

const Main = (): JSX.Element => {
  const [selectedOffer, setSelectedOffer] = useState<Offer>();
  const [sortedOffers, setSortedOffers] = useState<Offer[]>([]);

  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.change.city);
  const offers = useAppSelector((state) => state.change.offers);
  const filtredOffers = useMemo(() => offers.filter((offer) => offer.city.id === city.id), [offers, city]);
  const currentSort = useAppSelector((state) => state.change.sort);

  useEffect(() => {
    dispatch(fillOffersList(offers));
  }, [city]);

  useEffect(() => {
    const sorted = sortingOffers([...filtredOffers]);
    setSortedOffers(sorted ?? []);
  }, [currentSort, city]);

  const onCardHover = (listItemId: number) => {
    const currentPoint = filtredOffers.find((offer) =>
      offer.id === listItemId,
    );
    setSelectedOffer(currentPoint);
  };

  const sortingOffers = (copyOffers: Offer[]) => {
    switch (currentSort) {
      case sortingTypes.PRICELOWTOHIGHT:
        return copyOffers.sort((x,y) => x.price - y.price);
      case sortingTypes.PRICEHIGHTTOLOW:
        return copyOffers.sort(sortingByPrice);
      case sortingTypes.RAITING:
        return copyOffers.sort((x,y) => y.rating - x.rating);
      case sortingTypes.POPULAR:
        return copyOffers;
    }
  };

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
                  <li className='header__nav-item user'>
                    <Link className='header__nav-link header__nav-link--profile' to='/favorites'>
                      <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                      <span className='header__user-name user__name'>Oliver.conner@gmail.com</span>
                    </Link>
                  </li>
                  <li className='header__nav-item'>
                    <Link className='header__nav-link' to='/'>
                      <span className='header__signout'>Sign out</span>
                    </Link>
                  </li>
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
                  {filtredOffers.length} places to stay in {city.name}
                </b>
                <PlacesSorting />
                <CardsList
                  sortedOffers = {sortedOffers}
                  cardClassName={'cities__place-card'}
                  imgClassName={'cities__image-wrapper'}
                  onCardHover={onCardHover}
                />
              </section>
              <div className='cities__right-section'>
                <section className='cities__map map'>
                  <Map city={city} points={filtredOffers} selectedPoint={selectedOffer}/>
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
