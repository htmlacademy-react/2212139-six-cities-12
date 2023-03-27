import {State} from '../../types/state';
import {NameSpace, AuthorizationStatus} from '../../const';
import { UserData } from '../../types/user';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;

export const checkAuthorizationStatus = (state: State): boolean =>
  state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;

export const getUserData = (state: State): UserData | null => state[NameSpace.User].userData;
