import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { useAppSelector } from '../../hooks';
import UserInfo from '../../components/user-info/user-info';
import { getFavouriteOffers, getFavouriteOffersLoadingStatus } from '../../store/offers-data/selectors';
import FavouritesEmpty from '../favourites-empty/favourites-empty';
import LoadingPage from '../loading-page/loading-page';
import FavouritesList from '../../components/favourites-list/favourites-list';

const Favorites = (): JSX.Element => {

  const offers = useAppSelector(getFavouriteOffers);
  const areFavouriteOffersLoading = useAppSelector(getFavouriteOffersLoadingStatus);

  if (offers.length === 0) {
    return (<FavouritesEmpty/>);
  }

  if (areFavouriteOffersLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <div className='page'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Logo />
            </div>
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <UserInfo/>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
