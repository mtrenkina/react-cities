import { Offer } from "../../types/offer";
import { fetchOffersAction, fetchCurrentOfferAction, fetchNearOffersAction, fetchFavouriteOffersAction, fetchCommentsAction, changeFavouriteStatusAction } from "../api-action";
import { Data } from '../../types/state';
import { makeOffer, makeOffers, makeComments, makeFavouriteOffers } from "../../utils/mocks";
import { OffersData, changeFavoriteStatus } from "./offers-data";

describe('offersData reducer', () => {
  let state: Data;
  const offers: Offer[] = makeOffers();
  const nearOffers = makeOffers();
  const favouriteOffers = makeFavouriteOffers();
  const currentOffer = makeOffer();
  const comments = makeComments();

  beforeEach(() => {
    state = {
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
  });

  it('should return initial state', () => {
    expect(OffersData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('offers fetching tests', () => {

    it('should change offers loading status to "True"', () => {
      expect(OffersData.reducer(state, {type: fetchOffersAction.pending.type}))
        .toEqual({...state, areOffersLoading: true});
    });

    it('should set offers and change offers loading status to "False"', () => {
      state = {...state, areOffersLoading: true};
      expect(OffersData.reducer(state, {type: fetchOffersAction.fulfilled.type, payload: offers}))
        .toEqual({...state, offers: offers, areOffersLoading: false, errorMessage: undefined});
    });
  });

  describe('near offers fetching tests', () => {

    it('should change near offers loading status to "True"', () => {
      expect(OffersData.reducer(state, {type: fetchNearOffersAction.pending.type}))
        .toEqual({...state, areNearOffersLoading: true});
    });

    it('should set near offers and change near offers loading status to "False"', () => {
      state = {...state, areNearOffersLoading: true};
      expect(OffersData.reducer(state, {type: fetchNearOffersAction.fulfilled.type, payload: nearOffers}))
        .toEqual({...state, nearOffers: nearOffers, areNearOffersLoading: false, errorMessage: undefined});
    });

  });

  describe('favourite offers fetching tests', () => {

    it('should change favourite offers loading status to "True"', () => {
      expect(OffersData.reducer(state, {type: fetchFavouriteOffersAction.pending.type}))
        .toEqual({...state, areFavouriteOffersLoading: true});
    });

    it('should set favourite offers and change favourite offers loading status to "False"', () => {
      state = {...state, areFavouriteOffersLoading: true};
      expect(OffersData.reducer(state, {type: fetchFavouriteOffersAction.fulfilled.type, payload: favouriteOffers}))
        .toEqual({...state, favouriteOffers: favouriteOffers, areFavouriteOffersLoading: false, errorMessage: undefined});
    });

  });

  describe('current offer fetching tests', () => {

    it('should change current offer loading status to "True"', () => {
      expect(OffersData.reducer(state, {type: fetchFavouriteOffersAction.pending.type}))
      .toEqual({...state, areFavouriteOffersLoading: true});
    });

    it('should set current offer and change current offer loading status to "False"', () => {
      state = {...state, isCurrentOfferLoading: true};
      expect(OffersData.reducer(state, {type: fetchCurrentOfferAction.fulfilled.type, payload: currentOffer}))
        .toEqual({...state, currentOffer: currentOffer, isCurrentOfferLoading: false, errorMessage: undefined});
    });

  });

  describe('comments fetching tests', () => {

    it('should change comments loading status to "True"', () => {
      expect(OffersData.reducer(state, {type: fetchCommentsAction.pending.type}))
        .toEqual({...state, areCommentsLoading: true});
    });

    it('should set comments and change comments loading status to "False"', () => {
      state = {...state, areCommentsLoading: true};
      expect(OffersData.reducer(state, {type: fetchCommentsAction.fulfilled.type, payload: comments}))
        .toEqual({...state, comments: comments, areCommentsLoading: false, errorMessage: undefined});
    });

  });

  describe('favourite status tests', () => {

    it('should change favourite status', () => {
      let pastFavouriteStatus = currentOffer.isFavorite;
      state = {...state, favouriteOffers: makeFavouriteOffers(), currentOffer: makeOffer()};
      let newState = OffersData.reducer(state, {type: changeFavouriteStatusAction.fulfilled.type, payload:{hotelId: currentOffer.id, isFavourite: currentOffer.isFavorite}});
      expect(newState.currentOffer?.isFavorite).toBe(!pastFavouriteStatus);
    });

  });

});
