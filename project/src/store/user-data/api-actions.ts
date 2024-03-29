import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { dropToken, saveToken } from '../../services/token';
import { AppDispatch, State } from '../../types/state';
import { UserData } from '../../types/user';
import { APIRoute } from '../../const';
import { AuthData } from '../../types/auth-data';
import { toast } from 'react-toastify';
import { fetchFavoritesAction } from '../favorite-data/api-actions';

type ThunkOptions = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  ThunkOptions
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserData>(APIRoute.Login);
    dispatch(fetchFavoritesAction());
    return data;
  } catch (e) {
    toast.error('Failed to check authorization');
    throw e;
  }
});

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  ThunkOptions
>('user/login', async ({ login: email, password }, { dispatch, extra: api }) => {
  try {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    dispatch(fetchFavoritesAction());
    return data;
  } catch (e) {
    toast.error('Failed to authorization');
    throw e;
  }
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  ThunkOptions
>('user/logout', async (_arg, { extra: api }) => {
  try {
    await api.delete(APIRoute.Logout);
    dropToken();
  } catch (e) {
    toast.error('Failed to logout');
    throw e;
  }
});
