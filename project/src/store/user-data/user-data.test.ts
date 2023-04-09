import { AuthorizationStatus } from '../../const';
import { UserDataState } from '../../types/state';
import { makeFakeUserData } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from './api-actions';
import { userData } from './user-data';

const fakeUserData = makeFakeUserData();

describe('Reducer: userData', () => {
  let state: UserDataState;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(userData.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  describe('Action: checkAuthAction', () => {
    it('should update the status to "Auth" and return "UserData" if checkAuthAction fulfilled', () => {
      expect(
        userData.reducer(state, {
          type: checkAuthAction.fulfilled.type,
          payload: fakeUserData,
        })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      });
    });

    it('should update the status to "NoAuth" if checkAction rejected', () => {
      expect(
        userData.reducer(state, { type: checkAuthAction.rejected.type })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      });
    });
  });

  describe('Action: loginAction', () => {
    it('should update the status to "Auth" and return "UserData" if loginAction.fulfilled', () => {
      expect(
        userData.reducer(state, {
          type: loginAction.fulfilled.type,
          payload: fakeUserData,
        })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      });
    });

    it('should update the status to "NoAuth" if loginAction rejected', () => {
      expect(
        userData.reducer(state, { type: loginAction.rejected.type })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      });
    });
  });

  describe('Action: logoutAction', () => {
    it('should update the status to "NoAuth" if logoutAction.fulfilled', () => {
      expect(
        userData.reducer(state, { type: logoutAction.fulfilled.type })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      });
    });
  });
});
