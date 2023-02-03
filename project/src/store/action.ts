import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { Comment } from '../types/comment';
import { AuthorizationStatus } from '../const';

export const changeCurrentCity = createAction<string>('offers/changeCurrentCity');

export const fillOffersList = createAction<Offer[]>('offers/fillOffersList');

export const getOffers = createAction<Offer[]>('data/getOffers');

export const getNearOffers = createAction<Offer[]>('data/getNearOffers');

export const getComments = createAction<Comment[]>('data/getComments');

export const setOffersLoadingStatus = createAction<boolean>('data/getOffersLoadingStatus');

export const setNearOffersLoadingStatus = createAction<boolean>('data/getNearOffersLoadingStatus');

export const setCommentsLoadingStatus = createAction<boolean>('data/setCommentsLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

