import { createSlice } from '@reduxjs/toolkit';
import {
  fetchNearOffersAction,
  fetchOfferPropertyAction,
  fetchReviewAction,
  sendReviewAction,
} from './api-actions';
import { FetchStatus, NameSpace } from '../../const';
import { Offer, Offers } from '../../types/offer';
import { Reviews } from '../../types/review';
import { setFavoritesAction } from '../favorite-data/api-actions';
import { logoutAction } from '../user-process/api-actions';

export type OfferPropertyData = {
  offerProperty: Offer | null;
  offerPropertyStatus: FetchStatus;
  nearOffers: Offers;
  reviews: Reviews;
  reviewFormBlockedStatus: FetchStatus;
};

const initialState: OfferPropertyData = {
  offerProperty: null,
  offerPropertyStatus: FetchStatus.Idle,
  nearOffers: [],
  reviews: [],
  reviewFormBlockedStatus: FetchStatus.Idle,
};

export const offerPropertyData = createSlice({
  name: NameSpace.OfferProperty,
  initialState,
  reducers: {},
  extraReducers(builder) {
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
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.reviewFormBlockedStatus = FetchStatus.Success;
        state.reviews = action.payload;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.reviewFormBlockedStatus = FetchStatus.Failed;
      })
      .addCase(setFavoritesAction.fulfilled, (state, action) => {
        state.nearOffers.forEach((offer) => {
          if (offer.id === action.payload.id) {
            offer.isFavorite = action.payload.isFavorite;
          }
        });

        if (state.offerProperty?.id === action.payload.id) {
          state.offerProperty.isFavorite = action.payload.isFavorite;
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.nearOffers.forEach((offer) => {
          offer.isFavorite = false;
        });

        if( state.offerProperty) {
          state.offerProperty.isFavorite = false;
        }
      });
  },
});
