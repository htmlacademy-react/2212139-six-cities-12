import {createAction} from '@reduxjs/toolkit';
import { SortType } from '../const';
import {AppRoute} from '../const';


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

export const redirectToRoute = createAction<AppRoute>(
  'app/redirectToRoute'
);

