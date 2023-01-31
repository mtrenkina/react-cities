import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { City } from '../types/city';

export const changeCurrentCity = createAction<City>('offers/changeCurrentCity');

export const fillOffersList = createAction<Offer[]>('offers/fillOffersList');

export const changeSorting = createAction<string>('offers/changeSorting');
