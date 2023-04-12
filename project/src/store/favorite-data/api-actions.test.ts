import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { Action } from '@reduxjs/toolkit';
import { APIRoute } from '../../const';
import { fetchFavoritesAction } from './api-actions';
import { createAPI } from '../../services/api';
import { makeFakeOffers } from '../../utils/mocks';

const fakeOffers = makeFakeOffers();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch getFavorites when GET /favorites', async () => {

    mockAPI.onGet(APIRoute.Favorite).reply(200, fakeOffers);

    const store = mockStore();

    await store.dispatch(fetchFavoritesAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFavoritesAction.pending.type,
      fetchFavoritesAction.fulfilled.type,
    ]);
  });

});
