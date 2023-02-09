import { store } from '../store/index';
import { AuthorizationStatus } from '../const';
import { Offer } from './offer';
import { Comment } from './comment';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type Data = {
  offers: Offer[];
  nearOffers: Offer[];
  favouriteOffers: Offer[];
  comments: Comment[];
  areOffersLoading: boolean;
  areNearOffersLoading: boolean;
  areFavouriteOffersLoading: boolean;
  areCommentsLoading: boolean;
  errorMessage: string | undefined;
};

export type UserAction = {
  city: string;
}
