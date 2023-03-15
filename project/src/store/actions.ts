import {createAction} from '@reduxjs/toolkit';

export const changeLocation = createAction('change-location');
export const fillOfferList = createAction('offer/fillOfferList');
export const selectOffer = createAction(
  'offer/selectOffer',
  (id: number | null) => ({payload: id})
);
