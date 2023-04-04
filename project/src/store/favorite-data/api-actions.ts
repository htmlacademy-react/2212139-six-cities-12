import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../../types/state';
import {Offers, Offer} from '../../types/offer';
import {APIRoute} from '../../const';
import { pushNotification } from '../notifications/notification';

type ThunkOptions = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export type FavoritePayload = {
  id: number;
  status: number;
};

export const fetchFavoritesAction = createAsyncThunk<Offers, undefined, ThunkOptions
>('data/fetchFavorites', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Offers>(APIRoute.Favorite);

    return data;
  } catch (err) {
    dispatch(pushNotification({ type: 'error', message: 'Failed download favorites' }));
    throw err;
  }
});

export const setFavoritesAction = createAsyncThunk<Offer, FavoritePayload, ThunkOptions
>(
  'favorite/setFavorite',
  async({id, status}, {dispatch, extra: api}) => {
    try {
      const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${status}`);
      return data;
    } catch(err) {
      dispatch(pushNotification({type: 'error', message: 'Failed add to favorites.'}));
      throw err;
    }
  }
);
