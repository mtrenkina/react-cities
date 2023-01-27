import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export const changeCurrentCity = createAction<string>('offers/changeCity');

export const fillOffersList = createAction<Offer[]>('offers/setOffers');
