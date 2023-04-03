import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {AppDispatch, State} from '../../types/state';
import {Offers} from '../../types/offer';
import {APIRoute} from '../../const';


export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const {data} = await api.get<Offers>(APIRoute.Offers);
      return data;
    } catch (err) {
      throw err;
    }
  }
);
