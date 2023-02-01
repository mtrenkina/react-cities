import { createReducer } from '@reduxjs/toolkit';
import { changeCurrentCity, fillOffersList, changeSorting, loadOffers, requireAuthorization, setOffersLoadingStatus } from './action';
import { Offer } from '../types/offer';
import { AuthorizationStatus } from '../const';

const initialState: {city: string; offers: Offer[]; sort: string; authorizationStatus: string; isDataLoading: boolean} = {
  city: 'Paris',
  offers: [],
  sort: 'Popular',
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: false,
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
