import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import {
  changeFavouriteStatusAction,
  checkAuthAction,
  commentPostAction,
  fetchCommentsAction,
  fetchCurrentOfferAction,
  fetchFavouriteOffersAction,
  fetchNearOffersAction,
  fetchOffersAction,
  loginAction,
  logoutAction,
} from './api-action';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { getNeabyOffers, makeCommentData, makeComments, makeFavouriteOffers, makeOffer, makeOfferId, makeOffers, makeUserData } from '../utils/mocks';
import { AuthData } from '../types/auth-data';
import { changeFavoriteStatus } from './offers-data/offers-data';

const fakeOfferId = makeOfferId();
const offer = makeOffer();
const offers = makeOffers();
const favouriteOffers = makeFavouriteOffers();
const comment = makeCommentData();
const comments = makeComments();
const nearbyOffers = getNeabyOffers;
const userData = makeUserData();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];


  const mockStore = configureMockStore<State, Action<string>, ThunkDispatch<State, typeof api, Action>>(middlewares);

  describe('Async actions: authorization actions', () => {

    it('should change authorization status to "AUTH" when server return 200', async () => {
      const store = mockStore();
      mockAPI.onGet(APIRoute.LOGIN).reply(200, []);

      await store.dispatch(checkAuthAction());
      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([checkAuthAction.pending.type, checkAuthAction.fulfilled.type]);
    });

    it('login action should return user data and save token when POST /login', async () => {
      const store = mockStore();
      const fakeUser: AuthData = {login: 'test@bk.com', password: '11a'};

      mockAPI.onPost(APIRoute.LOGIN).reply(200, userData);
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(loginAction(fakeUser));
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', userData.token);
    });

    it('logout action should delete token when DELETE /logout', async () => {
      const store = mockStore();
      mockAPI
        .onDelete(APIRoute.LOGOUT)
        .reply(204);

      Storage.prototype.removeItem = jest.fn();

      await store.dispatch(logoutAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type
      ]);

      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
    });

  });

  describe('Async actions: fetching data', () => {
    it('should dispatch offers when GET /offers', async () => {
      const store = mockStore();
      mockAPI.onGet(APIRoute.OFFERS).reply(200, offers);

      await store.dispatch(fetchOffersAction());
      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([fetchOffersAction.pending.type, fetchOffersAction.fulfilled.type]);
    });

    it('should dispatch favourite offers when GET /favorite', async () => {
      const store = mockStore();
      mockAPI.onGet(APIRoute.FAVOURITES).reply(200, favouriteOffers);

      await store.dispatch(fetchFavouriteOffersAction());
      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([fetchFavouriteOffersAction.pending.type, fetchFavouriteOffersAction.fulfilled.type]);
    });

    it('should dispatch near offers when GET /nearby', async () => {
      const store = mockStore();
      mockAPI.onGet(APIRoute.NEAR_OFFERS.replace('{hotelId}', fakeOfferId)).reply(200, nearbyOffers);
      expect(store.getActions()).toEqual([]);

      const {payload} = await store.dispatch(fetchNearOffersAction({ hotelId: fakeOfferId }));
      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([fetchNearOffersAction.pending.type, fetchNearOffersAction.fulfilled.type]);
      expect(payload).toEqual(nearbyOffers);
    });

    it('should dispatch current offer when GET /hotels/{hotelId}', async () => {
      const store = mockStore();
      mockAPI.onGet(APIRoute.CURRENT_OFFER.replace('{hotelId}', fakeOfferId)).reply(200, offer);

      const {payload} = await store.dispatch(fetchCurrentOfferAction({ hotelId: fakeOfferId }));
      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([fetchCurrentOfferAction.pending.type, fetchCurrentOfferAction.fulfilled.type]);
      expect(payload).toEqual(offer);
    });

    it('should dispatch comments when GET /comments/{hotelId}', async () => {
      const store = mockStore();
      mockAPI.onGet(APIRoute.COMMENTS.replace('{hotelId}', fakeOfferId)).reply(200, comments);

      const {payload} = await store.dispatch(fetchCommentsAction({ hotelId: fakeOfferId }));
      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([fetchCommentsAction.pending.type, fetchCommentsAction.fulfilled.type]);
      expect(payload).toEqual(comments);
    });
  });

  describe('comments test', () => {

    it('should post comment when POST /comments/{hotelId}', async () => {
      const store = mockStore();
      const {hotelId} = comment;
      mockAPI.onPost(APIRoute.COMMENTS.replace('{hotelId}', hotelId)).reply(200, comments);

      const {payload} = await store.dispatch(commentPostAction(comment));
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        commentPostAction.pending.type,
        commentPostAction.fulfilled.type
      ]);

      expect(payload).toEqual(comments);

    });

    it('should change favorite status', async () => {
      /*const store = mockStore();
      const {id, isFavorite} = offer;
      mockAPI.onPost(APIRoute.FAVOURITE_OFFER.replace('{hotelId}', String(id)).replace('{status}', String(Number(isFavorite))))
      .reply(200);

      await store.dispatch(changeFavouriteStatusAction({ hotelId: id, isFavorite: isFavorite }));
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        changeFavouriteStatusAction.pending.type,
        changeFavouriteStatusAction.fulfilled.type
      ]);*/

    });

  });
});
