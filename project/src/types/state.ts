import {store} from '../store/index.js';
import { AuthorizationStatus } from '../const.js';
import { Offer } from './offer.js';
import { Comment } from './comment.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};
export type Data = {
  offers: Offer[];
  nearOffers: Offer[];
  comments: Comment[];
  areOffersLoading: boolean;
  areNearOffersLoading: boolean;
  areCommentsLoading: boolean;
};

export type UserAction = {
  city: string;
}
