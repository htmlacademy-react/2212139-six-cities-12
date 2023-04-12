import { DeepPartial } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

export const createMockStore = (fakeState: DeepPartial<State>) => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];

  const fakeStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action<string>>
  >(middlewares)(fakeState);

  return { fakeStore };
};
