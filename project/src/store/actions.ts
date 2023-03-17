import {createAction} from '@reduxjs/toolkit';


export const changeLocation = createAction(
  'location/changeLocation',
  (location: string) => ({payload: location})
);

export const selectOffer = createAction(
  'offer/selectOffer',
  (offerId: number | null) => ({payload: offerId})
);
