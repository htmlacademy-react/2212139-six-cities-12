import {createSlice} from '@reduxjs/toolkit';
import {fetchOffersAction} from './api-action';


import { FetchStatus, NameSpace } from '../../const';
import {Offers} from '../../types/offer';

export type OffersData = {
  offers: Offers | null;
  offersStatus: FetchStatus;
};

const initialState: OffersData = {
  offers: null,
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
      });
  }
});


