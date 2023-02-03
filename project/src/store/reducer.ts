import { createReducer } from '@reduxjs/toolkit';
import {
  changeCurrentCity,
  fillOffersList,
  getOffers,
  requireAuthorization,
  setOffersLoadingStatus,
  getComments,
  getNearOffers,
  setCommentsLoadingStatus,
  setNearOffersLoadingStatus,
} from './action';
import { Offer } from '../types/offer';
import { AuthorizationStatus } from '../const';
import { Comment } from '../types/comment';

const initialState: {
  city: string;
  offers: Offer[];
  nearOffers: Offer[];
  comments: Comment[];
  areOffersLoading: boolean;
  areNearOffersLoading: boolean;
  areCommentsLoading: boolean;
  authorizationStatus: AuthorizationStatus;
} = {
  city: 'Paris',
  offers: [],
  nearOffers: [],
  comments: [],
  areOffersLoading: false,
  areNearOffersLoading: false,
  areCommentsLoading: false,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCurrentCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(getNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(getComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.areOffersLoading = action.payload;
    })
    .addCase(setNearOffersLoadingStatus, (state, action) => {
      state.areNearOffersLoading = action.payload;
    })
    .addCase(setCommentsLoadingStatus, (state, action) => {
      state.areCommentsLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
