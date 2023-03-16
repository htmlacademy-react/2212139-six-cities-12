import {createReducer} from '@reduxjs/toolkit';
import { DEFAULT_LOCATION } from '../const';
import { Offers } from '../types/offer';
import { getOffersByLocation } from '../utils';
import {changeLocation, updateOffersByLocation, selectOffer} from './actions';

type InitialState = {
  offersByLocation: Offers;
  selectedOfferId: number | null;
  location: string;
};

const initialState: InitialState = {
  offersByLocation: getOffersByLocation(DEFAULT_LOCATION),
  selectedOfferId: null,
  location: DEFAULT_LOCATION,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLocation, (state, action) => {state.location = action.payload;})
    .addCase(updateOffersByLocation, (state) => {
      state.offersByLocation = getOffersByLocation(state.location);})
    .addCase(selectOffer, (state, action) => {state.selectedOfferId = action.payload;});
});

export {reducer};
