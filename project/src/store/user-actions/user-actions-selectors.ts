import { ReducerNameSpace } from '../../const';
import { State } from '../../types/state';

export const getCity = (state: State): string => state[ReducerNameSpace.OFFERS].city;
