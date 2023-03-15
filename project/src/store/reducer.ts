import {createReducer} from '@reduxjs/toolkit';
import { city, offers } from '../mocks/offers';
import {changeLocation, fillOfferList} from './actions';

const initialState = {
  city,
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLocation, (state) => state)
    .addCase(fillOfferList, (state) => state);
});

export {reducer};
