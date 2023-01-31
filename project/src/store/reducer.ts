import { createReducer } from '@reduxjs/toolkit';
import { changeCurrentCity, fillOffersList, changeSorting } from './action';
import { Offer } from '../types/offer';
import { City } from '../types/city';
import { BASE_CITY } from '../mocks/const';
import { offersMock } from '../mocks/offers';

const initialState: {city: City; offers: Offer[]; sort: string} = {
  city: BASE_CITY,
  offers: offersMock,
  sort: 'Popular',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCurrentCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sort = action.payload;
    });
});
