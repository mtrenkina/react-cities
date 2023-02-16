import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerNameSpace } from '../../const';
import { Data } from '../../types/state';
import { fetchOffersAction, fetchNearOffersAction, fetchCommentsAction, commentPostAction, fetchFavouriteOffersAction, changeFavouriteStatusAction, fetchCurrentOfferAction } from '../api-action';

const initialState: Data = {
  offers: [],
  nearOffers: [],
  favouriteOffers: [],
  currentOffer: null,
  comments: [],
  areOffersLoading: false,
  areNearOffersLoading: false,
  areFavouriteOffersLoading: false,
  isCurrentOfferLoading: false,
  areCommentsLoading: false,
  errorMessage: undefined,
};

export const OffersData = createSlice({
  name: ReducerNameSpace.DATA,
  initialState,
  reducers: {
    changeFavoriteStatus: (state, action: PayloadAction<{hotelId: number; isFavorite: boolean}>) => {
      const currentOffer = state.offers.find((offer) => offer.id === action.payload.hotelId);
      const currentOfferFromStore = state.currentOffer;

      if(currentOffer) {
        currentOffer.isFavorite = action.payload.isFavorite;
      }

      if (currentOffer?.id === currentOfferFromStore?.id) {
        if (currentOfferFromStore) {
          currentOfferFromStore.isFavorite = action.payload.isFavorite;
        }
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
      .addCase(fetchNearOffersAction.rejected, (state, action) => {
        state.nearOffers = [];
        state.areNearOffersLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchFavouriteOffersAction.pending, (state) => {
        state.areFavouriteOffersLoading = true;
      })
      .addCase(fetchFavouriteOffersAction.fulfilled, (state, action) => {
        state.favouriteOffers = action.payload;
        state.areFavouriteOffersLoading = false;
      })
      .addCase(fetchFavouriteOffersAction.rejected, (state, action) => {
        state.favouriteOffers = [];
        state.areFavouriteOffersLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isCurrentOfferLoading = true;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isCurrentOfferLoading = false;
      })
      .addCase(fetchCurrentOfferAction.rejected, (state, action) => {
        state.currentOffer = null;
        state.isCurrentOfferLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.areCommentsLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.areCommentsLoading = false;
      })
      .addCase(fetchCommentsAction.rejected, (state, action) => {
        state.comments = [];
        state.areCommentsLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(commentPostAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(commentPostAction.rejected, (state, action) => {
        state.errorMessage = action.error.message;
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
      })
      .addCase(changeFavouriteStatusAction.rejected, (state, action) => {
        state.errorMessage = action.error.message;
      });
  }
});

export const {changeFavoriteStatus} = OffersData.actions;
