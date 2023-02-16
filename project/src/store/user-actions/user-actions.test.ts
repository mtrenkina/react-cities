import { City, CityMock } from "../../types/city";
import { cities, sortingTypes } from "../../const";
import { makeCity } from "../../utils/mocks";
import { UserActions, changeCity } from "./user-actions";

describe('userActions reducer', () => {
  const currentCity = cities[0];

  it('without additional parameters should return initial state', () => {
    expect(UserActions.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({city: currentCity.name});
  });

  it('should change current city', () => {
    const state = {city: currentCity.name};
    const newCity: City = makeCity();
    expect(UserActions.reducer(state, changeCity(newCity.name)))
      .toEqual({city: newCity.name});
  });

});
