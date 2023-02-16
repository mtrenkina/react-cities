import { AuthorizationStatus } from "../../const";
import { UserAuth } from "./user-auth";
import { checkAuthAction, loginAction, logoutAction } from "../api-action";
import { UserProcess } from "../../types/state";

describe('userAuth reducer', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {authorizationStatus: AuthorizationStatus.UNKNOWN};
  });

  it('should return initial state', () => {
    expect(UserAuth.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('checkAuthAction test', () => {
    it('should change authorization status to "AUTH" if checkAuthAction fulfilled', () => {
      expect(UserAuth.reducer(state, {type: checkAuthAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.AUTH});
    });

    it('should update authorization status to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(UserAuth.reducer(state, {type: checkAuthAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NO_AUTH});
    });
  });

  describe('loginAction test', () => {
    it('should update authorization status to "AUTH" if loginAction fulfilled', () => {
      expect(UserAuth.reducer(state, {type: loginAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.AUTH});
    });

    it('should update authorization status to "NO_AUTH" if loginAction fulfilled', () => {
      expect(UserAuth.reducer(state, {type: loginAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NO_AUTH});
    });
  });

  describe('logoutAction test', () => {
    it('should update authorization status to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(UserAuth.reducer(state, {type: logoutAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NO_AUTH});
    });
  });

});
