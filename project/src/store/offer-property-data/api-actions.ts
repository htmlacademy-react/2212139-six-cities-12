import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { ReviewData, Reviews } from '../../types/review';
import { Offer, Offers } from '../../types/offer';
import { APIRoute } from '../../const';
import { pushNotification } from '../notifications/notification';

type ThunkOptions = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOfferPropertyAction = createAsyncThunk<
  Offer,
  number,
  ThunkOptions
>('data/fetchOfferItem', async (offerId, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  } catch (err) {
    dispatch(
      pushNotification({ type: 'error', message: 'Failed to fetch offer' })
    );
    throw err;
  }
});

export const fetchNearOffersAction = createAsyncThunk<
  Offers,
  number,
  ThunkOptions
>('data/fetchNearOffers', async (offerId, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Offers>(
      `${APIRoute.Offers}/${offerId}/nearby`
    );
    return data;
  } catch (err) {
    dispatch(
      pushNotification({ type: 'error', message: 'Near offers loaded failed' })
    );
    throw err;
  }
});

export const fetchReviewAction = createAsyncThunk<
  Reviews,
  number,
  ThunkOptions
>('data/fetchReviewAction', async (offerId, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Reviews>(`${APIRoute.Reviews}/${offerId}`);
    return data;
  } catch (err) {
    dispatch(pushNotification({ type: 'error', message: 'Review not loaded' }));
    throw err;
  }
});


export const sendReviewAction = createAsyncThunk<
  Reviews,
  ReviewData,
  ThunkOptions
>(
  'data/sendReviewAction',
  async ({ id, rating, comment }, { dispatch, extra: api }) => {
    try {
      const {data} = await api.post<Reviews>(`${APIRoute.Reviews}/${id}`, { rating, comment });
      return data;
    } catch (err) {
      dispatch(
        pushNotification({
          type: 'error',
          message: 'Attempt to send a message failed',
        })
      );
      throw err;
    }
  }
);
