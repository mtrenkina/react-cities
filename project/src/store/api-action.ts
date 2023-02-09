import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { saveToken, dropToken } from '../services/token';
import { APIRoute } from '../const';
import { Offer } from '../types/offer';
import { Comment } from '../types/comment.js';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { CommentData } from '../types/comment-data.js';
import { NewCommentData } from '../types/new-comment-data.js';
import { FavouriteOfferData } from '../types/favourite-offer-data.js';
import { changeFavoriteStatus } from './offers-data/offers-data';

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.OFFERS);
  return data;
});

export const fetchNearOffersAction = createAsyncThunk<
  Offer[],
  {hotelId: string},
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchNearOffers', async ({hotelId}, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.NEAR_OFFERS.replace('{hotelId}', String(hotelId)));
  return data;
});

export const fetchFavouriteOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavouriteOffers', async (_args, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.FAVOURITES);
  return data;
});

export const fetchCurrentOfferAction = createAsyncThunk<Offer, {hotelId: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCurrentOffer',
  async ({hotelId}, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer>(APIRoute.CURRENT_OFFER.replace('{hotelId}', hotelId));
    return data;
  },
);

export const fetchCommentsAction = createAsyncThunk<
  Comment[],
  {hotelId: string},
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async ({hotelId}, { dispatch, extra: api }) => {
  const { data } = await api.get<Comment[]>(APIRoute.COMMENTS.replace('{hotelId}', String(hotelId)));
  return data;
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  await api.get(APIRoute.LOGIN);
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ login: email, password }, { dispatch, extra: api }) => {
  const {
    data: { token },
  } = await api.post<UserData>(APIRoute.LOGIN, { email, password });
  saveToken(token);
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.LOGOUT);
  dropToken();
});

export const commentPostAction = createAsyncThunk<
  NewCommentData[],
  CommentData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/comment', async ({comment, rating, hotelId}, { dispatch, extra: api }) => {
  const { data } = await api.post<NewCommentData[]>(APIRoute.COMMENTS.replace('{hotelId}', String(hotelId)), { comment, rating });
  return data;
});

export const changeFavouriteStatusAction = createAsyncThunk<Offer, FavouriteOfferData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>('data/favouriteOffer', async ({hotelId, isFavorite}, { dispatch, extra: api }) => {
  const { data } = await api.post<Offer>(APIRoute.FAVOURITE_OFFER.replace('{hotelId}', String(hotelId)).replace('{status}', String(Number(isFavorite))));
  dispatch(changeFavoriteStatus({hotelId, isFavorite}));
  return data;
});
