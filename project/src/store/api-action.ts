import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import {
  getOffers,
  getComments,
  getNearOffers,
  setOffersLoadingStatus,
  setNearOffersLoadingStatus,
  setCommentsLoadingStatus,
  requireAuthorization,
} from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus } from '../const';
import { Offer } from '../types/offer';
import { Comment } from '../types/comment.js';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { CommentData } from '../types/comment-data.js';
import { NewCommentData } from '../types/new-comment-data.js';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(true));
  const { data } = await api.get<Offer[]>(APIRoute.OFFERS);
  dispatch(setOffersLoadingStatus(false));
  dispatch(getOffers(data));
});

export const fetchNearOffersAction = createAsyncThunk<
  void,
  {hotelId: string},
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchNearOffers', async ({hotelId}, { dispatch, extra: api }) => {
  dispatch(setNearOffersLoadingStatus(true));
  const { data } = await api.get<Offer[]>(APIRoute.NEAR_OFFERS.replace('{hotelId}', hotelId));
  dispatch(setNearOffersLoadingStatus(false));
  dispatch(getNearOffers(data));
});

export const fetchCommentsAction = createAsyncThunk<
  void,
  {hotelId: string},
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async ({hotelId}, { dispatch, extra: api }) => {
  dispatch(setCommentsLoadingStatus(true));
  const { data } = await api.get<Comment[]>(APIRoute.COMMENTS.replace('{hotelId}', hotelId));
  dispatch(setCommentsLoadingStatus(false));
  dispatch(getComments(data));
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
  try {
    await api.get(APIRoute.LOGIN);
    dispatch(requireAuthorization(AuthorizationStatus.AUTH));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH));
  }
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
  dispatch(requireAuthorization(AuthorizationStatus.AUTH));
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
  dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH));
});

export const commentAddAction = createAsyncThunk<
  void,
  CommentData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/comment', async ({comment, rating, hotelId}, { dispatch, extra: api }) => {
  const { data } = await api.post<NewCommentData[]>(APIRoute.COMMENTS.replace('{hotelId}', hotelId), { comment, rating });
  dispatch(getComments(data));
});
