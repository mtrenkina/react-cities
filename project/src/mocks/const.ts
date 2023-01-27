import { Amsterdam } from './cities';

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

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const BASE_CITY = Amsterdam;
