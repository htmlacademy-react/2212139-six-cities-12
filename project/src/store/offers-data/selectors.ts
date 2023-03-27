import {FetchStatus, NameSpace, SortType} from '../../const';
import {City, Offers} from '../../types/offer';
import {State} from '../../types/state';
import {createSelector} from "@reduxjs/toolkit";

export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getStatus = (state: State): FetchStatus => state[NameSpace.Data].offersStatus;
export const getActiveSorting = (state: State): SortType => state[NameSpace.Data].sorting;
export const getActiveCity = (state: State): City => state[NameSpace.Data].city;

export const getOffersStatus = createSelector([getStatus], (status) => ({
  isLoading: [FetchStatus.Idle, FetchStatus.Loading].includes(status),
  isSuccess: status === FetchStatus.Success,
  isError: status === FetchStatus.Failed,
}));

