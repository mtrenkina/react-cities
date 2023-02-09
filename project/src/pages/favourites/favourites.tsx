import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getFavouriteOffers, getFavouriteOffersLoadingStatus } from '../../store/offers-data/selectors';
import FavouritesEmpty from '../favourites-empty/favourites-empty';
import LoadingPage from '../loading-page/loading-page';
import FavouritesList from '../../components/favourites-list/favourites-list';
import Sprite from '../../components/svg-sprite/svg-sprite';
import Header from '../../components/header/header';
import { store } from '../../store';
import { fetchFavouriteOffersAction } from '../../store/api-action';
import { getAuthorizationStatus } from '../../store/user-auth/selectors';

const Favorites = (): JSX.Element => {

  const favouriteOffers = useAppSelector(getFavouriteOffers);
  const areFavouriteOffersLoading = useAppSelector(getFavouriteOffersLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    store.dispatch(fetchFavouriteOffersAction());
  }, [authorizationStatus, favouriteOffers.length]);

  if (favouriteOffers.length === 0) {
    return (<FavouritesEmpty/>);
  }

  if (areFavouriteOffersLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <div className='page'>
      <Sprite />
      <Header />

      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          <section className='favorites'>
            <h1 className='favorites__title'>Saved listing</h1>
            <FavouritesList />
          </section>
        </div>
      </main>
      <footer className='footer container'>
        <Link className='footer__logo-link' to='/'>
          <img className='footer__logo' src='img/logo.svg' alt='6 cities logo' width='64' height='33' />
        </Link>
      </footer>
    </div>
  );
};

export default Favorites;
