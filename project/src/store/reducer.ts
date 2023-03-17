import {createReducer} from '@reduxjs/toolkit';
import { DEFAULT_LOCATION } from '../const';

import {changeLocation, selectOffer} from './actions';

type InitialState = {
  selectedOfferId: number | null;
  location: string;
};

const initialState: InitialState = {
  selectedOfferId: null,
  location: DEFAULT_LOCATION,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLocation, (state, action) => {
      state.location = action.payload;
    })

    .addCase(selectOffer, (state, action) => {
      state.selectedOfferId = action.payload;});
});

export {reducer};
