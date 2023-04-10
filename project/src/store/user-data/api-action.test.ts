import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import { checkAuthAction, loginAction, logoutAction} from './api-actions';
import {State} from '../../types/state';
import {makeFakeUserData} from '../../utils/mocks';
import {StatusCodes} from 'http-status-codes';
import {APIRoute} from '../../const';
import { AuthData } from '../../types/auth-data';
import { fetchFavoritesAction } from '../favorite-data/api-actions';

const fakeUserData = makeFakeUserData();

describe('Async actions: userData', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is "AUTH" and load userData when server return 200', async () => {
    mockAPI
      .onGet(APIRoute.Login)
      .reply(StatusCodes.OK, fakeUserData);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);


    const {payload} = await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      fetchFavoritesAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakeUserData);
  });

  it('should save token and load userData when POST /login', async () => {
    const fakeUser: AuthData = {
      login: 'test@test.ru',
      password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(StatusCodes.OK, fakeUserData);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    const{payload} = await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      fetchFavoritesAction.pending.type, // как jн тут рабjтает
      loginAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakeUserData);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-city-token', fakeUserData.token);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(StatusCodes.NO_CONTENT);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-city-token');
  });
});
