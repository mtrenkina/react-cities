import { createReducer } from '@reduxjs/toolkit';
import { changeCurrentCity, fillOffersList, loadOffers, requireAuthorization, setOffersLoadingStatus } from './action';
import { Offer } from '../types/offer';
import { AuthorizationStatus } from '../const';

const initialState: {city: string; offers: Offer[]; authorizationStatus: AuthorizationStatus; isDataLoading: boolean} = {
  city: 'Paris',
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: true,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCurrentCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
