import {createSlice} from '@reduxjs/toolkit';
import {fetchNearOffersAction, fetchOfferPropertyAction, fetchReviewAction, sendReviewAction} from './api-actions';
import {FetchStatus, NameSpace} from '../../const';
import {Offer, Offers} from '../../types/offer';
import {Reviews} from '../../types/review';

export type OfferPropertyData = {
  offerProperty: Offer | null;
  offerPropertyStatus: FetchStatus;
  nearOffers: Offers;
  reviews: Reviews;
  reviewFormBlockedStatus: FetchStatus;
};

const initialState: OfferPropertyData = {
  offerProperty:null,
  offerPropertyStatus:FetchStatus.Idle,
  nearOffers:[],
  reviews:[],
  reviewFormBlockedStatus:FetchStatus.Idle
};

export const offerPropertyData = createSlice({
  name:NameSpace.OfferProperty, initialState, reducers:{}, extraReducers(builder) {
    builder
      .addCase(fetchOfferPropertyAction.pending, (state) => {
        state.offerPropertyStatus = FetchStatus.Loading;
      })
      .addCase(fetchOfferPropertyAction.fulfilled, (state, action) => {
        state.offerPropertyStatus = FetchStatus.Success;
        state.offerProperty = action.payload;
      })
      .addCase(fetchOfferPropertyAction.rejected, (state) => {
        state.offerPropertyStatus = FetchStatus.Failed;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      })
      .addCase(fetchReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.reviewFormBlockedStatus = FetchStatus.Loading;
      })
      .addCase(sendReviewAction.fulfilled, (state) => {
        state.reviewFormBlockedStatus = FetchStatus.Success;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.reviewFormBlockedStatus = FetchStatus.Failed;
      });
  }
});
