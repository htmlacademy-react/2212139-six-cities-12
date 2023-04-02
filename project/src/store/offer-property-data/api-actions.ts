import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {AppDispatch, State} from '../../types/state';
import {ReviewData, Reviews} from '../../types/review';
import {Offer, Offers} from '../../types/offer';

import {APIRoute,} from '../../const';
import {toast} from 'react-toastify';
import { pushNotification } from '../notifications/notification';


export const fetchOfferPropertyAction = createAsyncThunk<Offer, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferItem',
  async (offerId, {dispatch, extra: api}) => {

    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      return data;
    } catch (err) {
      dispatch(pushNotification({type:'error', message:'Failed to fetch offer'}));
      throw err;
    }
  }
);

export const fetchNearOffersAction = createAsyncThunk<Offers, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearOffers',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offers>(`${APIRoute.Offers}/${offerId}/nearby`);
      return data;
    } catch (err) {
      dispatch(pushNotification({type:'error', message:'Near offers loaded failed'}));
      throw err;
    }
  }
);

export const fetchReviewAction = createAsyncThunk<Reviews, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviewAction',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Reviews>(`${APIRoute.Reviews}/${offerId}`);
      return data;
    } catch (err) {
      dispatch(pushNotification({type:'error', message:'Review not loaded'}))
      throw err;
    }
  }
);

export const sendReviewAction = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/sendReviewAction',
  async ({id, rating, comment}, {dispatch, extra: api}) => {
    try {
      await api.post(`${APIRoute.Reviews}/${id}`, {rating, comment});
      dispatch(fetchReviewAction(id));
    } catch (err) {
      dispatch(pushNotification({type:'error', message:'Attempt to send a message failed'}));
      throw err;
    }
  }
);
