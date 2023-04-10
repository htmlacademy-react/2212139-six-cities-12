import {FetchStatus, NameSpace} from '../../const';
import {Offers} from '../../types/offer';
import {State} from '../../types/state';
import {createSelector} from '@reduxjs/toolkit';

export const getOffers = (state: State): Offers => state[NameSpace.Offers].offers;
export const getStatus = (state: State): FetchStatus => state[NameSpace.Offers].offersStatus;


export const getOffersStatus = createSelector([getStatus], (status) => ({
  isLoading: [FetchStatus.Idle, FetchStatus.Loading].includes(status),
  isSuccess: status === FetchStatus.Success,
  isError: status === FetchStatus.Failed,
}));


