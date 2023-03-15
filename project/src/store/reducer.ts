import {createReducer} from '@reduxjs/toolkit';
import { city, offers } from '../mocks/offers';
import { City, Offers } from '../types/offer';
import {changeLocation, fillOfferList, selectOffer} from './actions';

type InitialState = {
  city: City;
  offers: Offers;
  selectedOfferId: number | null;
};

const initialState: InitialState = {
  city,
  offers,
  selectedOfferId: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLocation, (state) => {state.city = city;})
    .addCase(fillOfferList, (state) => {state.offers = offers;})
    .addCase(selectOffer, (state, action) => {state.selectedOfferId = action.payload;});
});

export {reducer};
