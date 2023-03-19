import {createReducer} from '@reduxjs/toolkit';
import { DEFAULT_LOCATION, DEFAULT_SORT, SortType} from '../const';
import { Offers } from '../types/offer';
import { getOffers } from '../utils';

import {changeLocation, changeSort, updateOffers, selectOffer} from './actions';

type InitialState = {
  selectedOfferId: number | null;
  location: string;
  sortType: SortType;
  offers: Offers;
};

const initialState: InitialState = {
  selectedOfferId: null,
  location: DEFAULT_LOCATION,
  sortType: DEFAULT_SORT,
  offers: getOffers()
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLocation, (state, action) => {
      state.location = action.payload;
    })

    .addCase(selectOffer, (state, action) => {
      state.selectedOfferId = action.payload;
    })

    .addCase(changeSort, (state, action) => {
      state.sortType = action.payload;
    })

    .addCase(updateOffers, (state) => {
      state.offers = getOffers(state.location, state.sortType);
    });

});

export {reducer};
