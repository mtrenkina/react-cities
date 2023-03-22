import { City } from './types/city';

const PARIS: City = {
  name: 'Paris',
  lat: 48.8654,
  lng: 2.3488,
  zoom: 13,
};

const COLOGNE: City = {
  name: 'Cologne',
  lat: 50.9333,
  lng: 6.95,
  zoom: 13,
};

const BRUSSELS: City = {
  name: 'Brussels',
  lat: 50.8504,
  lng: 4.34878,
  zoom: 13,
};

const AMSTERDAM: City = {
  name: 'Amsterdam',
  lat: 52.374,
  lng: 4.88969,
  zoom: 13,
};

const HAMBURG: City = {
  name: 'Hamburg',
  lat: 53.55073,
  lng: 9.99302,
  zoom: 13,
};

const DUSSELDORF: City = {
  name: 'Dusseldorf',
  lat: 51.2217,
  lng: 6.77616,
  zoom: 13,
};

export const cities: City[] = [PARIS, COLOGNE, BRUSSELS, AMSTERDAM, HAMBURG, DUSSELDORF];

export enum AppRoute {
  MAIN = '/',
  FAVOURITES = '/favorites',
  PROPERTY = '/property',
  LOGIN = '/login',
  ROOM = '/offer',
}

export enum APIRoute {
  OFFERS = '/hotels',
  LOGIN = '/login',
  LOGOUT = '/logout',
  NEAR_OFFERS = '/hotels/{hotelId}/nearby',
  COMMENTS = '/comments/{hotelId}',
  FAVOURITES = '/favorite',
  FAVOURITE_OFFER = '/favorite/{hotelId}/{status}',
  CURRENT_OFFER = '/hotels/{hotelId}'
}

export enum AuthorizationStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN',
}

export const sortingTypes = {
  POPULAR: 'Popular',
  PRICELOWTOHIGHT: 'Price: low to high',
  PRICEHIGHTTOLOW: 'Price: high to low',
  RAITING: 'Top rated first',
};

export enum ReducerNameSpace {
  DATA = 'DATA',
  OFFERS = 'ACTION',
  USER = 'USER',
}

export const MAX_REVIEWS_COUNT = 10;

export enum CardClassName {
  MAIN = 'cities__place-card',
  FAVOURITES = 'favorites__card',
  NEARBY = 'near-places__card',
}

export enum ImgClassName {
  MAIN = 'cities__image-wrapper',
  FAVOURITES = 'favorites__image-wrapper',
  NEARBY = 'near-places__image-wrapper',
}
