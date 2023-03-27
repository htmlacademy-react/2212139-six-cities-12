import {createReducer} from '@reduxjs/toolkit';
import { DEFAULT_LOCATION, DEFAULT_SORT, SortType } from '../const';
import {changeLocation, changeSort, selectOffer} from './actions';

type InitialState = {
  selectedOfferId: number | null;
  location: string;
  sortType: SortType;
};

const initialState: InitialState = {
  selectedOfferId: null,
  location: DEFAULT_LOCATION,
  sortType: DEFAULT_SORT,
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
    });
});

export {reducer};
