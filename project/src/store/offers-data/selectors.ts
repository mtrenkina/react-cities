import { ReducerNameSpace } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types/offer';
import { Comment } from '../../types/comment';

export const getOffers = (state: State): Offer[] => state[ReducerNameSpace.DATA].offers;
export const getNearOffers = (state: State): Offer[] => state[ReducerNameSpace.DATA].nearOffers;
export const getComments = (state: State): Comment[] => state[ReducerNameSpace.DATA].comments;
export const getOffersLoadingStatus = (state: State): boolean => state[ReducerNameSpace.DATA].areOffersLoading;
export const getNearOffersLoadingStatus = (state: State): boolean => state[ReducerNameSpace.DATA].areNearOffersLoading;
export const getCommentsLoadingStatus = (state: State): boolean => state[ReducerNameSpace.DATA].areCommentsLoading;
