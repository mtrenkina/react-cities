import { ReducerNameSpace } from '../../const';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[ReducerNameSpace.USER].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[ReducerNameSpace.USER].authorizationStatus !== AuthorizationStatus.UNKNOWN;
