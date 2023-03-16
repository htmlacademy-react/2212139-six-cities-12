import {createAction} from '@reduxjs/toolkit';
import { Offers } from '../types/offer';


export const changeLocation = createAction(
  'location/changeLocation',
  (location: string) => ({payload: location})
);

export const updateOffersByLocation = createAction(
  'offer/updateOffersByLocation',
  (offers: Offers) => ({payload: offers})
);

export const selectOffer = createAction(
  'offer/selectOffer',
  (offerId: number | null) => ({payload: offerId})
);
