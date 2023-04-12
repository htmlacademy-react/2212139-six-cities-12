import {combineReducers} from '@reduxjs/toolkit';
import {userData} from './user-data/user-data';
import {NameSpace} from '../const';
import {offersData} from './offers-data/offers-data';
import { offerPropertyData } from './offer-property-data/offer-property-data';
import { appData } from './app-data/app-data';
import { notifications } from './notifications/notification';
import { favoriteData } from './favorite-data/favorite-data';

export const rootReducer = combineReducers({
  [NameSpace.User]: userData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.OfferProperty]: offerPropertyData.reducer,
  [NameSpace.App]: appData.reducer,
  [NameSpace.Notifications]: notifications.reducer,
  [NameSpace.Favorites]: favoriteData.reducer,
});
