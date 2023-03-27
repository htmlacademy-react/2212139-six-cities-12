import {AuthorizationStatus} from '../const.js';
import {store} from '../store/index.js';
import {Offer, Offers} from './offer.js';
import { Reviews } from './review.js';
import {UserData} from './user.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type OfferPropertyData = {
  offerProperty: Offer | null;
  isOfferPropertyLoading: boolean;
  nearOffers: Offers | null;
  isNearOffersLoading: boolean;
  reviews: Reviews | null;
  isReviewsLoading: boolean;
  isReviewFormBlocked: boolean;
  hasError: boolean;
};
