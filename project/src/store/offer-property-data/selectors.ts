import {State} from '../../types/state';
import {FetchStatus, NameSpace} from '../../const';
import {Offer, Offers} from '../../types/offer';
import {Reviews} from '../../types/review';
import {createSelector} from '@reduxjs/toolkit';


export const getOfferProperty = (state: State): Offer | null =>
  state[NameSpace.OfferProperty].offerProperty;

const getOfferStatus = (state: State): FetchStatus =>
  state[NameSpace.OfferProperty].isOfferPropertyStatus;

export const getNearOffers = (state: State): Offers =>
  state[NameSpace.OfferProperty].nearOffers;

export const getReviews = (state: State): Reviews =>
  state[NameSpace.OfferProperty].reviews;

export const getReviewFormBlockedStatus = (state: State): FetchStatus =>
  state[NameSpace.OfferProperty].isReviewFormBlocked;

export const getOfferPropertyStatus = createSelector([getOfferStatus], (status) => ({
  isLoading: [FetchStatus.Idle, FetchStatus.Loading].includes(status),
  isSuccess: status === FetchStatus.Success,
  isError: status === FetchStatus.Failed,
}));
