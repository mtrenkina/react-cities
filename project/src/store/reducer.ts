import { createReducer } from '@reduxjs/toolkit';
import { changeCurrentCity, fillOffersList } from './action';
import { Offer } from '../types/offer';
import { City } from '../types/city';
import { BASE_CITY } from '../mocks/const';
import { offersMock } from '../mocks/offers';

const initialState: {city: City; offers: Offer[]} = {
  city: BASE_CITY,
  offers: offersMock.filter((offer) => offer.city === BASE_CITY),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCurrentCity, (state, action) => {
      state.city.name = action.payload.name;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload;
    });
});
