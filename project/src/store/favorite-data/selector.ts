import { createSelector } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Offers } from '../../types/offer';
import { State } from '../../types/state';

export const getFavorites = (state: State): Offers =>
  state[NameSpace.Favorite].favorites;

export const getFavoritesCount = (state: State): number =>
  state[NameSpace.Favorite].favorites.length;


export const getFetchStatus = (state: State): FetchStatus =>
  state[NameSpace.Favorite].fetchStatus;

export const getSetStatus = (state: State): FetchStatus =>
  state[NameSpace.Favorite].setStatus;

export const getFavoriteFetchStatus = createSelector(
  [getFetchStatus], (status) => ({
    isLoading: status === FetchStatus.Loading,
    isError: status === FetchStatus.Failed,
    isSuccess: status === FetchStatus.Success
  })
);

export const getFavoriteSetStatus = createSelector(
  [getSetStatus], (status) => ({
    isLoading: status === FetchStatus.Loading,
    isError: status === FetchStatus.Failed,
    isSuccess: status === FetchStatus.Success
  })
);
