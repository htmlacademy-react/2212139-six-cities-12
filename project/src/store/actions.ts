import {createAction} from '@reduxjs/toolkit';


export const changeLocation = createAction(
  'location/changeLocation',
  (location: string) => ({payload: location})
);

export const updateOffersByLocation = createAction(
  'offer/updateOffersByLocation'
);

export const selectOffer = createAction(
  'offer/selectOffer',
  (offerId: number | null) => ({payload: offerId})
);
