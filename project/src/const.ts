import { Offer } from './types/offer';

export enum AppRoute {
  Main = '/',
  Favorites = '/favorites',
  FavoritesEmpty = '/favorites-empty',
  Property = '/property',
  Login = '/login',
  MainEmpty = '/main-empty',
  Room = '/offer',
  PropertyNotLogged = '/property-not-logged',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const sortingTypes = {
  POPULAR: 'Popular',
  PRICELOWTOHIGHT: 'Price: low to high',
  PRICEHIGHTTOLOW: 'Price: high to low',
  RAITING: 'Top rated first',
};

export const sortingByPrice = (offerA: Offer, offerB: Offer) => {
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
