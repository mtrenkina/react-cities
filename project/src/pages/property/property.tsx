import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { AppRoute, AuthorizationStatus, CardClassName, ImgClassName } from '../../const';
import { changeFavouriteStatusAction, fetchCommentsAction, fetchCurrentOfferAction, fetchNearOffersAction } from '../../store/api-action';
import { getNearOffers, getNearOffersLoadingStatus, getComments, getCurrentOffer, getCurrentOfferLoadingStatus } from '../../store/offers-data/offers-data-selectors';
import { getCity } from '../../store/user-actions/user-actions-selectors';
import { getAuthorizationStatus } from '../../store/user-auth/user-auth-selectors';
import CommentsList from '../../components/comments-list/comments-list';
import Map from '../../components/map/map';
import CardsList from '../../components/cards-list/cards-list';
import Comment from '../../components/comment/comment';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../not-found-page/not-found-page';
import Sprite from '../../components/svg-sprite/svg-sprite';
import Header from '../../components/header/header';
import { Offer } from '../../types/offer';

const Property = (): JSX.Element => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedOffer, setSelectedOffer] = useState<Offer>();

  const {id} = useParams();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isCurrentOfferLoading = useAppSelector(getCurrentOfferLoadingStatus);
  const areNearOffersLoading = useAppSelector(getNearOffersLoadingStatus);

  const nearOffers = useAppSelector(getNearOffers);
  const comments = useAppSelector(getComments);
  const city = useAppSelector(getCity);
  const currentOffer = useAppSelector(getCurrentOffer);
  const newOffers = currentOffer && nearOffers !== null ? [...nearOffers, currentOffer] : [];

  const onCardHover = (listItemId: number) => {
    const currentPoint = nearOffers.find((offer) => offer.id === listItemId);
    setSelectedOffer(currentPoint);
  };

  useEffect(() => {
    if (id) {
      store.dispatch(fetchNearOffersAction({ hotelId: id }));
      store.dispatch(fetchCurrentOfferAction({hotelId: id}));
      store.dispatch(fetchCommentsAction({ hotelId: id }));
    }
  }, [id]);

  const onFavouriteButtonClickHandler = () => {
    if (authorizationStatus !== AuthorizationStatus.AUTH) {
      navigate(AppRoute.LOGIN);
    }

    if (currentOffer) {
      dispatch(changeFavouriteStatusAction({hotelId: currentOffer.id, isFavorite: !currentOffer.isFavorite}));
    }
  };

  if (isCurrentOfferLoading || areNearOffersLoading) {
    return (
      <LoadingPage />
    );
  }

  if (!currentOffer) {
    return <NotFoundPage />;
  }

  return (
    <React.Fragment>
      <Sprite />
      <div className='page'>
        <Header />

        <main className='page__main page__main--property'>
          <section className='property'>
            <div className='property__gallery-container container'>
              <div className='property__gallery'>
                {currentOffer?.images.slice(0,6).map((image) => (
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
                  <button className={`button property__bookmark-button ${currentOffer?.isFavorite ? 'property__bookmark-button--active' : ''}`} type='button' onClick={onFavouriteButtonClickHandler}>
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
                  <li className='property__feature property__feature--bedrooms'>
                    {currentOffer?.bedrooms} {` bedroom${currentOffer?.bedrooms > 1 ? 's' : ''}`}
                  </li>
                  <li className='property__feature property__feature--adults'>
                    max {currentOffer?.maxAdults} {`adult${currentOffer?.maxAdults > 1 ? 's' : ''}`}
                  </li>
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
                  {authorizationStatus === AuthorizationStatus.AUTH && <Comment hotelId={id}/>}
                </section>
              </div>
            </div>
            <section className='property__map map'>
              <Map city={city} points={newOffers} selectedPoint={selectedOffer}/>
            </section>
          </section>
          <div className='container'>
            <section className='near-places places'>
              <h2 className='near-places__title'>Other places in the neighbourhood</h2>
              <div className='near-places__list places__list'>
                <CardsList
                  sortedOffers={nearOffers}
                  cardClassName={CardClassName.NEARBY}
                  imgClassName={ImgClassName.NEARBY}
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
