import {createReducer} from '@reduxjs/toolkit';
import { DEFAULT_LOCATION, DEFAULT_SORT, SortType, AuthorizationStatus} from '../const';
import { Offer, Offers } from '../types/offer';
import { Reviews } from '../types/review';
import {
  changeLocation, changeSort, setDataLoadingStatus,
  selectOffer, loadOffers, requireAuthorization, loadNearOffers,
  loadReviews,
  loadOfferById
} from './actions';

type InitialState = {
  selectedOfferId: number | null;
  location: string;
  sortType: SortType;
  offers: Offers;
  offerById: Offer | null;
  nearOffers: Offers;
  reviews: Reviews;
  authorizationStatus: AuthorizationStatus;
  isDataLoading: boolean;
};

const initialState: InitialState = {
  selectedOfferId: null,
  location: DEFAULT_LOCATION,
  sortType: DEFAULT_SORT,
  offers: [],
  offerById: null,
  nearOffers: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: false,
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
    .addCase(loadOfferById, (state, action) => {
      state.offerById = action.payload;
    })
    .addCase(loadNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
