import {createSlice} from '@reduxjs/toolkit';
import {fetchNearOffersAction, fetchOfferPropertyAction, fetchReviewAction, sendReviewAction} from './api-actions';
import {FetchStatus, NameSpace} from '../../const';
import {Offer, Offers} from '../../types/offer';
import {Reviews} from '../../types/review';

export type OfferPropertyData = {
  offerProperty: Offer | null;
  isOfferPropertyStatus: FetchStatus;
  nearOffers: Offers;
  isNearStatus: FetchStatus;
  reviews: Reviews;
  isReviewsStatus: FetchStatus;
  isReviewFormBlocked: FetchStatus;
};

const initialState: OfferPropertyData = {
  offerProperty: null,
  isOfferPropertyStatus: FetchStatus.Idle,
  nearOffers: [],
  isNearStatus: FetchStatus.Idle,
  reviews: [],
  isReviewsStatus: FetchStatus.Idle,
  isReviewFormBlocked: FetchStatus.Idle
};

export const offerPropertyData = createSlice({
  name: NameSpace.OfferProperty,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferPropertyAction.pending, (state) => {
        state.isOfferPropertyStatus = FetchStatus.Loading;

      })
      .addCase(fetchOfferPropertyAction.fulfilled, (state, action) => {
        state.isOfferPropertyStatus = FetchStatus.Success;
        state.offerProperty = action.payload;
      })
      .addCase(fetchOfferPropertyAction.rejected, (state) => {
        state.isOfferPropertyStatus = FetchStatus.Failed;

      })
      .addCase(fetchNearOffersAction.pending, (state) => {
        state.isNearStatus = FetchStatus.Loading;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.isNearStatus = FetchStatus.Success;
        state.nearOffers = action.payload;
      })
      .addCase(fetchReviewAction.pending, (state) => {
        state.isReviewsStatus = FetchStatus.Loading;
      })
      .addCase(fetchReviewAction.fulfilled, (state, action) => {
        state.isReviewsStatus = FetchStatus.Success;
        state.reviews = action.payload;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.isReviewFormBlocked = FetchStatus.Failed;
      })
      .addCase(sendReviewAction.fulfilled, (state) => {
        state.isReviewFormBlocked = FetchStatus.Success;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.isReviewFormBlocked = FetchStatus.Failed;
      });
  }
});
