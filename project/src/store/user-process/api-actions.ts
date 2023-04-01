import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {dropToken, saveToken} from '../../services/token';
import {AppDispatch, State} from '../../types/state';
import {UserData} from '../../types/user';
import {APIRoute} from '../../const';
import {AuthData} from '../../types/auth-data';
import {toast} from 'react-toastify';


export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra:api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      return data;
    } catch (error) {
      toast.error('Failed to verify authorization');
      throw error;
    }
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login:email, password}, {extra:api}) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      return data;
    } catch (e) {
      toast.error('Failed to authorization');
      throw e;
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra:api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
    } catch (e) {
      toast.error('Failed to logout');
      throw e;
    }
  }
);
