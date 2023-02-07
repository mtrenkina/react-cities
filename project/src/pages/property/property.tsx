import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { AuthorizationStatus } from '../../const';
import { fetchCommentsAction, fetchNearOffersAction } from '../../store/api-action';
import { getNearOffers, getNearOffersLoadingStatus, getOffers, getOffersLoadingStatus, getComments } from '../../store/offers-data/selectors';
import { getCity } from '../../store/user-actions/selectors';
import { getAuthorizationStatus } from '../../store/user-auth/selectors';
import { Offer } from '../../types/offer';
import Logo from '../../components/logo/logo';
import CommentsList from '../../components/comments-list/comments-list';
import Map from '../../components/map/map';
import CardsList from '../../components/cards-list/cards-list';
import UserInfo from '../../components/user-info/user-info';
import Comment from '../../components/comment/comment';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../not-found-page/not-found-page';

const Property = (): JSX.Element => {

  const params = useParams();
  const [selectedOffer, setSelectedOffer] = useState<Offer>();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const offers = useAppSelector(getOffers);
  const nearOffers = useAppSelector(getNearOffers);
  const comments = useAppSelector(getComments);
  const city = useAppSelector(getCity);

  const currentOffer = offers.find((offer) => offer.id === Number(params.id));
  const newOffers = currentOffer && nearOffers !== null ? [...nearOffers, currentOffer] : [];

  const areOffersLoading = useAppSelector(getOffersLoadingStatus);
  const areNearOffersLoading = useAppSelector(getNearOffersLoadingStatus);

  useEffect(() => {
    if (params.id) {
      store.dispatch(fetchNearOffersAction({ hotelId: params.id }));
      store.dispatch(fetchCommentsAction({ hotelId: params.id }));
    }
  }, [params.id]);

  const onCardHover = (listItemId: number) => {
    const currentPoint = offers.find((offer) => offer.id === listItemId);
    setSelectedOffer(currentPoint);
  };

  if (areOffersLoading || areNearOffersLoading) {
    return (
      <LoadingPage />
    );
  }
  if (!currentOffer) {
    return <NotFoundPage />;
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

      <div className='page'>
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

        <main className='page__main page__main--property'>
          <section className='property'>
            <div className='property__gallery-container container'>
              <div className='property__gallery'>
                {currentOffer?.images.map((image) => (
                  <div className='property__image-wrapper' key={image}>
                    <img className='property__image' src={image} alt='Studio' />
                  </div>
                ))}
              </div>
            </div>
            <div className='property__container container'>
              <div className='property__wrapper'>
                {currentOffer?.isPremium && (
                  <div className='property__mark'>
                    <span>Premium</span>
                  </div>
                )}
                <div className='property__name-wrapper'>
                  <h1 className='property__name'>{currentOffer?.title}</h1>
                  <button className='property__bookmark-button button' type='button'>
                    <svg className='property__bookmark-icon' width='31' height='33'>
                      <use xlinkHref='#icon-bookmark'></use>
                    </svg>
                    <span className='visually-hidden'>{currentOffer?.isFavorite ? 'In' : 'To'} bookmarks</span>
                  </button>
                </div>
                <div className='property__rating rating'>
                  <div className='property__stars rating__stars'>
                    <span style={{ width: `${(100 / 5) * (currentOffer?.rating ?? 0)}%` }}></span>
                    <span className='visually-hidden'>Rating</span>
                  </div>
                  <span className='property__rating-value rating__value'>{currentOffer?.rating}</span>
                </div>
                <ul className='property__features'>
                  <li className='property__feature property__feature--entire'>{currentOffer?.type}</li>
                  <li className='property__feature property__feature--bedrooms'>{currentOffer?.bedrooms} bedrooms</li>
                  <li className='property__feature property__feature--adults'>max {currentOffer?.maxAdults} adults</li>
                </ul>
                <div className='property__price'>
                  <b className='property__price-value'>&euro;{currentOffer?.price}</b>
                  <span className='property__price-text'>&nbsp;night</span>
                </div>
                <div className='property__inside'>
                  <h2 className='property__inside-title'>What&apos;s inside</h2>
                  <ul className='property__inside-list'>
                    {currentOffer?.goods.map((good) => (
                      <li className='property__inside-item' key={good}>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='property__host'>
                  <h2 className='property__host-title'>Meet the host</h2>
                  <div className='property__host-user user'>
                    <div className='property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper'>
                      <img
                        className='property__avatar user__avatar'
                        src={currentOffer?.host.avatarUrl}
                        width='74'
                        height='74'
                        alt='Host avatar'
                      />
                    </div>
                    <span className='property__user-name'>{currentOffer?.host.name}</span>
                    {currentOffer?.host.isPro && <span className='property__user-status'>Pro</span>}
                  </div>
                  <div className='property__description'>
                    <p className='property__text'>{currentOffer?.description}</p>
                  </div>
                </div>
                <section className='property__reviews reviews'>
                  <CommentsList comments={comments ?? []}/>
                  {authorizationStatus === AuthorizationStatus.AUTH && <Comment hotelId={params.id}/>}
                </section>
              </div>
            </div>
            <section className='property__map map'>
              <Map city={city} points={newOffers} selectedPoint={selectedOffer} />
            </section>
          </section>
          <div className='container'>
            <section className='near-places places'>
              <h2 className='near-places__title'>Other places in the neighbourhood</h2>
              <div className='near-places__list places__list'>
                <CardsList
                  sortedOffers={nearOffers}
                  cardClassName={'near-places__card'}
                  imgClassName={'near-places__image-wrapper'}
                  onCardHover={onCardHover}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Property;
