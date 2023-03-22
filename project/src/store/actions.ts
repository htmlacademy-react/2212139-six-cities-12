import {createAction} from '@reduxjs/toolkit';
import { SortType } from '../const';
import { Offers } from '../types/offer';
import {AuthorizationStatus} from '../const';


export const changeLocation = createAction(
  'location/changeLocation',
  (location: string) => ({payload: location})
);

export const selectOffer = createAction(
  'offers/selectOffer',
  (offerId: number | null) => ({payload: offerId})
);

export const changeSort = createAction(
  'offers/changeSort',
  (sort: SortType) => ({payload: sort})
);

export const loadOffers = createAction<Offers>(
  'data/loadOffers'
);

export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);

export const setError = createAction<string | null>(
  'game/setError'
);

export const setOffersDataLoadingStatus = createAction<boolean>(
  'data/setOffersDataLoadingStatus'
);
