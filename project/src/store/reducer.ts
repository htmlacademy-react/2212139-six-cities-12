import {createReducer} from '@reduxjs/toolkit';
import { DEFAULT_LOCATION, DEFAULT_SORT, SortType, AuthorizationStatus} from '../const';
import { Offers } from '../types/offer';
import {
  changeLocation, changeSort, setError, setOffersDataLoadingStatus,
  selectOffer, loadOffers, requireAuthorization
} from './actions';

type InitialState = {
  selectedOfferId: number | null;
  location: string;
  sortType: SortType;
  offers: Offers;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
};

const initialState: InitialState = {
  selectedOfferId: null,
  location: DEFAULT_LOCATION,
  sortType: DEFAULT_SORT,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
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
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });

});

export {reducer};
