import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { fetchFavoritesAction, setFavoritesAction } from './api-actions';
import { Offers } from '../../types/offer';
import { logoutAction } from '../user-data/api-actions';

export type FavoritesData = {
  favorites: Offers;
  fetchStatus: FetchStatus;
  setStatus: FetchStatus;
};

const initialState: FavoritesData = {
  favorites: [],
  fetchStatus: FetchStatus.Idle,
  setStatus: FetchStatus.Idle
};

export const favoriteData = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.fetchStatus = FetchStatus.Loading;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.fetchStatus = FetchStatus.Success;
        state.favorites = action.payload;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.fetchStatus = FetchStatus.Failed;
      })
      .addCase(setFavoritesAction.pending, (state) => {
        state.setStatus = FetchStatus.Loading;
      })
      .addCase(setFavoritesAction.fulfilled, (state, action) => {
        state.setStatus = FetchStatus.Success;

        if (action.payload.isFavorite) {
          state.favorites.push(action.payload);
        } else {
          state.favorites = state.favorites.filter(({id}) => id !== action.payload.id);
        }
      })
      .addCase(setFavoritesAction.rejected, (state) => {
        state.setStatus = FetchStatus.Failed;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favorites = [];
      });
  },
});
