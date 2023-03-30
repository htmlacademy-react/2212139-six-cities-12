import {State} from '../../types/state';
import {NameSpace} from '../../const';
import {Offers, Offer} from '../../types/offer';
import {Reviews} from '../../types/review';


export const getOfferProperty = (state: State): Offer | null =>
  state[NameSpace.OfferProperty].offerProperty;

export const getOfferPropertyLoadingStatus = (state: State): boolean =>
  state[NameSpace.OfferProperty].isOfferPropertyLoading;

export const getOfferPropertyError = (state: State): boolean =>
  state[NameSpace.OfferProperty].isOfferPropertyError;

export const getNearOffers = (state: State): Offers =>
  state[NameSpace.OfferProperty].nearOffers;

export const getReviews = (state: State): Reviews =>
  state[NameSpace.OfferProperty].reviews;

export const getReviewFormBlockedStatus = (state: State): boolean =>
  state[NameSpace.OfferProperty].isReviewFormBlocked;
