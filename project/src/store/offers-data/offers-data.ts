import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerNameSpace } from '../../const';
import { Data } from '../../types/state';
import { fetchOffersAction, fetchNearOffersAction, fetchCommentsAction, commentPostAction, fetchFavouriteOffersAction, changeFavouriteStatusAction } from '../api-action';

const initialState: Data = {
  offers: [],
  nearOffers: [],
  favouriteOffers: [],
  comments: [],
  areOffersLoading: false,
  areNearOffersLoading: false,
  areFavouriteOffersLoading: false,
  areCommentsLoading: false,
  errorMessage: undefined,
};

export const OffersData = createSlice({
  name: ReducerNameSpace.DATA,
  initialState,
  reducers: {
    changeFavoriteStatus: (state, action: PayloadAction<{hotelId: number; isFavorite: boolean}>) => {
      const currentOffer = state.offers.find((offer) => offer.id === action.payload.hotelId);

      if(currentOffer) {
        currentOffer.isFavorite = action.payload.isFavorite;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.areOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.areOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.offers = [];
        state.areOffersLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchNearOffersAction.pending, (state) => {
        state.areNearOffersLoading = true;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
        state.areNearOffersLoading = false;
      })
      .addCase(fetchFavouriteOffersAction.pending, (state) => {
        state.areFavouriteOffersLoading = true;
      })
      .addCase(fetchFavouriteOffersAction.fulfilled, (state, action) => {
        state.favouriteOffers = action.payload;
        state.areFavouriteOffersLoading = false;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.areCommentsLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.areCommentsLoading = false;
      })
      .addCase(commentPostAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(changeFavouriteStatusAction.fulfilled, (state, action) => {
        const currentOfferIndex = state.favouriteOffers.findIndex((offer) => offer.id === action.payload.id);
        if(currentOfferIndex > -1){
          state.favouriteOffers[currentOfferIndex] = action.payload;
          state.favouriteOffers = state.favouriteOffers.filter((offer) => offer.isFavorite);
        } else {
          state.favouriteOffers.push(action.payload);
        }
        const currentNearOfferIndex = state.nearOffers.findIndex((nearOffer) => nearOffer.id === action.payload.id);
        state.nearOffers[currentNearOfferIndex] = action.payload;
      });
  }
});

export const {changeFavoriteStatus} = OffersData.actions;
