import { createReducer } from '@reduxjs/toolkit';
import { changeCurrentCity, fillOffersList } from './action';
import { Offer } from '../types/offer';

const initialState: {city: string; offers: Offer[]} = {
  city: 'Paris',
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCurrentCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload;
    });
});
