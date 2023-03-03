import { combineReducers } from '@reduxjs/toolkit';
import { ReducerNameSpace } from '../const';
import { OffersData } from './offers-data/offers-data';
import { UserActions } from './user-actions/user-actions';
import { UserAuth } from './user-auth/user-auth';

export const rootReducer = combineReducers({
  [ReducerNameSpace.DATA]: OffersData.reducer,
  [ReducerNameSpace.OFFERS]: UserActions.reducer,
  [ReducerNameSpace.USER]: UserAuth.reducer,
});
