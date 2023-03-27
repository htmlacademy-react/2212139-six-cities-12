import {createSlice} from '@reduxjs/toolkit';
import {fetchOffersAction} from './api-action';


import {FetchStatus, NameSpace} from '../../const';
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
  reducers: {
    changeSorting: (state, action) => {
      const {sorting} = action.payload;
      state.sorting = sorting;
    },
    changeCity: (state, action) => {
      const {city} = action.payload;
      state.city = city;
    },

  },
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

export const {changeSorting, changeCity} = offersData.actions;
