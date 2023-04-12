import { AuthorizationStatus, FetchStatus } from '../const.js';
import { store } from '../store/index.js';
import { Offer, Offers } from './offer.js';
import { Reviews } from './review.js';
import { UserData } from './user.js';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type UserDataState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type OffersDataState = {
  offers: Offers;
  offersStatus: FetchStatus;
};

export type OfferPropertyDataState = {
  offerProperty: Offer | null;
  offerPropertyStatus: FetchStatus;
  nearOffers: Offers;
  reviews: Reviews;
  reviewFormBlockedStatus: FetchStatus;
};
