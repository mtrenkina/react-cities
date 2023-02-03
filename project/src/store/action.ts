import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { AuthorizationStatus } from '../const';

export const changeCurrentCity = createAction<string>('offers/changeCurrentCity');

export const fillOffersList = createAction<Offer[]>('offers/fillOffersList');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
