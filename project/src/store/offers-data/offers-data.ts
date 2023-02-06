import { createSlice } from '@reduxjs/toolkit';
import { ReducerNameSpace } from '../../const';
import { Data } from '../../types/state';
import { fetchOffersAction, fetchNearOffersAction, fetchCommentsAction, commentPostAction } from '../api-action';

const initialState: Data = {
  offers: [],
  nearOffers: [],
  comments: [],
  areOffersLoading: false,
  areNearOffersLoading: false,
  areCommentsLoading: false,
};

export const OffersData = createSlice({
  name: ReducerNameSpace.DATA,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.areOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.areOffersLoading = false;
      })
      .addCase(fetchNearOffersAction.pending, (state) => {
        state.areNearOffersLoading = true;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
        state.areNearOffersLoading = false;
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
      });
  }
});
