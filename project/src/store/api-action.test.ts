import { Action } from "@reduxjs/toolkit";
import thunk, { ThunkDispatch } from "redux-thunk";
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store'
import { createAPI } from "../services/api";
import { checkAuthAction, fetchCommentsAction, fetchCurrentOfferAction, fetchFavouriteOffersAction, fetchNearOffersAction, fetchOffersAction } from "./api-action";
import { APIRoute, AuthorizationStatus } from "../const";
import { State } from "../types/state";
import { Offer } from "../types/offer";
import { makeComments, makeFavouriteOffers, makeOffer, makeOffers } from "../utils/mocks";
import { Comment } from "../types/comment";

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should change authorization status to "AUTH" when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.LOGIN)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  describe('Async actions: fetching data', () => {

    const offer: Offer = makeOffer();
    const offers: Offer[] = makeOffers();
    const favouriteOffers: Offer[] = makeFavouriteOffers();
    const comments: Comment[] = makeComments();

    it('should dispatch offers when GET /offers', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.OFFERS)
        .reply(200, offers);

        await store.dispatch(fetchOffersAction());

        const actions = store.getActions().map(({type}) => type);

        expect(actions).toEqual([
          fetchOffersAction.pending.type,
          fetchOffersAction.fulfilled.type,
        ]);
    });

    it('should dispatch near offers when GET /nearby', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.NEAR_OFFERS)
        .reply(200, offers);

        await store.dispatch(fetchNearOffersAction({hotelId: String(offer.id)}));

        const actions = store.getActions().map(({type}) => type);

        expect(actions).toEqual([
          fetchNearOffersAction.pending.type,
          fetchNearOffersAction.fulfilled.type,
        ]);
    });

    it('should dispatch favourite offers when GET /favorite', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.FAVOURITES)
        .reply(200, favouriteOffers);

        await store.dispatch(fetchFavouriteOffersAction());

        const actions = store.getActions().map(({type}) => type);

        expect(actions).toEqual([
          fetchFavouriteOffersAction.pending.type,
          fetchFavouriteOffersAction.fulfilled.type,
        ]);
    });

    it('should dispatch current offer when GET /hotels/{hotelId}', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.CURRENT_OFFER)
        .reply(200, offer);

        await store.dispatch(fetchCurrentOfferAction({hotelId: String(offer.id)}));

        const actions = store.getActions().map(({type}) => type);

        expect(actions).toEqual([
          fetchCurrentOfferAction.pending.type,
          fetchCurrentOfferAction.fulfilled.type,
        ]);
    });

    it('should dispatch comments when GET /comments/{hotelId}', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.COMMENTS)
        .reply(200, comments);

        await store.dispatch(fetchCommentsAction({hotelId: '15'}));

        const actions = store.getActions().map(({type}) => type);

        expect(actions).toEqual([
          fetchCommentsAction.pending.type,
          fetchCommentsAction.fulfilled.type,
        ]);
    });

  });

})
