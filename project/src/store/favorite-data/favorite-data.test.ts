import { FetchStatus } from '../../const';
import { FavoritesData, favoriteData } from './favorite-data';
import { makeFakeOffer, makeFakeOffers } from '../../utils/mocks';
import {
  fetchFavoritesAction,
  setFavoritesAction,
} from './api-actions';
import { logoutAction } from '../user-data/api-actions';

let fakeOffers = makeFakeOffers();

describe('Reducer: favorites', () => {
  let state: FavoritesData;

  beforeEach(() => {
    state = {
      favorites: [],
      fetchStatus: FetchStatus.Idle,
      setStatus: FetchStatus.Idle,
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(favoriteData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      favorites: [],
      fetchStatus: FetchStatus.Idle,
      setStatus: FetchStatus.Idle,
    });
  });

  describe('fetchFavoritesAction test', () => {
    it('fetchFavorites fulfilled', () => {

      expect(
        favoriteData.reducer(state, {
          type: fetchFavoritesAction.fulfilled.type,
          payload: fakeOffers,
        })
      ).toEqual({
        favorites: fakeOffers,
        fetchStatus: FetchStatus.Success,
        setStatus: FetchStatus.Idle,
      });
    });

    it('fetchFavorites rejected', () => {
      expect(
        favoriteData.reducer(state, {
          type: fetchFavoritesAction.rejected.type,
        })
      ).toEqual({
        favorites: [],
        fetchStatus: FetchStatus.Failed,
        setStatus: FetchStatus.Idle,
      });
    });
  });

  describe('setFavoritesAction test', () => {
    it('setFavorites fulfilled', () => {
      const fakeNewOffer = makeFakeOffer();

      if (fakeNewOffer.isFavorite) {
        fakeOffers = [...fakeOffers, fakeNewOffer];
      } else {
        fakeOffers.filter((offer) => offer.id !== fakeNewOffer.id);
      }

      expect(
        favoriteData.reducer(state, { type: setFavoritesAction.fulfilled.type, payload: fakeOffers })
      ).toEqual({
        favorites: [],
        fetchStatus: FetchStatus.Idle,
        setStatus: FetchStatus.Success,
      });
    });
  });

  describe('logoutAction test', () => {
    it('logoutAction fulfilled', () => {
      expect(
        favoriteData.reducer(state, { type: logoutAction.fulfilled.type })
      ).toEqual({
        favorites: [],
        fetchStatus: FetchStatus.Idle,
        setStatus: FetchStatus.Idle,
      });
    });
  });
});
