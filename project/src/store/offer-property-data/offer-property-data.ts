import {createSlice} from '@reduxjs/toolkit';
import {fetchOfferPropertyAction, fetchNearOffersAction,
  fetchReviewAction, sendReviewAction} from './api-actions';
import {NameSpace} from '../../const';
import { Offer, Offers } from '../../types/offer';
import { Reviews } from '../../types/review';

export type OfferPropertyData = {
  offerProperty: Offer | null;
  isOfferPropertyLoading: boolean;
  nearOffers: Offers;
  isNearOffersLoading: boolean;
  reviews: Reviews;
  isReviewsLoading: boolean;
  isReviewFormBlocked: boolean;
  isOfferPropertyError: boolean;
};

const initialState: OfferPropertyData = {
  offerProperty: null,
  isOfferPropertyLoading: false,
  nearOffers: [],
  isNearOffersLoading: false,
  reviews: [],
  isReviewsLoading: false,
  isReviewFormBlocked: false,
  isOfferPropertyError: false
};


export const offerPropertyData = createSlice({
  name: NameSpace.OfferProperty,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferPropertyAction.pending, (state) => {
        state.isOfferPropertyLoading = true;
        state.isOfferPropertyError = false;
      })
      .addCase(fetchOfferPropertyAction.fulfilled, (state, action) => {
        state.isOfferPropertyLoading = false;
        state.offerProperty = action.payload;
      })
      .addCase(fetchOfferPropertyAction.rejected, (state) => {
        state.isOfferPropertyLoading = false;
        state.isOfferPropertyError = true;
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
