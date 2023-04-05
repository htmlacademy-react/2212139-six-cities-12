import {createSlice} from '@reduxjs/toolkit';
import {fetchOffersAction} from './api-actions';
import { FetchStatus, NameSpace } from '../../const';
import {Offers} from '../../types/offer';
import { setFavoritesAction } from '../favorite-data/api-actions';

export type OffersData = {
  offers: Offers;
  offersStatus: FetchStatus;
};

const initialState: OffersData = {
  offers: [],
  offersStatus: FetchStatus.Idle,
};


export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offersStatus = FetchStatus.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offersStatus = FetchStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offersStatus = FetchStatus.Failed;
      })
      .addCase(setFavoritesAction.fulfilled, (state, action) => {
        state.offers.forEach((offer) => {
          if (offer.id === action.payload.id) {
            offer.isFavorite = action.payload.isFavorite;
          }
        });
      });
  }
});


