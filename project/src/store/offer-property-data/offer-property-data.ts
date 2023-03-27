import {createSlice} from '@reduxjs/toolkit';

import {store} from '../store';
import {fetchOfferPropertyAction, fetchNearOffersAction, fetchReviewAction, sendReviewAction} from './api-action';
import {redirectToRoute} from '../actions';

import {OfferPropertyData} from '../../types/state';
import {AppRoute, NameSpace} from '../../const';

const initialState: OfferPropertyData = {
  offerProperty: null,
  isOfferPropertyLoading: false,
  nearOffers: null,
  isNearOffersLoading: false,
  reviews: null,
  isReviewsLoading: false,
  isReviewFormBlocked: false,
  hasError: false
};


export const offerPropertyData = createSlice({
  name: NameSpace.OfferProperty,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferPropertyAction.pending, (state) => {
        state.isOfferPropertyLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferPropertyAction.fulfilled, (state, action) => {
        state.isOfferPropertyLoading = false;
        state.offerProperty = action.payload;
      })
      .addCase(fetchOfferPropertyAction.rejected, (state) => {
        state.isOfferPropertyLoading = false;
        state.hasError = true;
        store.dispatch(redirectToRoute(AppRoute.NotFound)); // TODO переделать редиректы!
      })
      .addCase(fetchNearOffersAction.pending, (state) => {
        state.isNearOffersLoading = true;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.isNearOffersLoading = false;
        state.nearOffers = action.payload;
      })
      .addCase(fetchReviewAction.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewAction.fulfilled, (state, action) => {
        state.isReviewsLoading = false;
        state.reviews = action.payload;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.isReviewFormBlocked = true;
      })
      .addCase(sendReviewAction.fulfilled, (state) => {
        state.isReviewFormBlocked = false;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.isReviewFormBlocked = false;
      });
  }
});
