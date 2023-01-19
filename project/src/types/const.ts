export enum AppRoute {
  Main = '/',
  Favorites = '/favorites',
  FavoritesEmpty = '/favorites-empty',
  Login = '/login',
  MainEmpty = '/main-empty',
  Property = '/property',
  PropertyNotLogged = '/property-not-logged',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
