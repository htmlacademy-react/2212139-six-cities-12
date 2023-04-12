import {combineReducers} from '@reduxjs/toolkit';
import {userData} from './user-data/user-data';
import {NameSpace} from '../const';
import {offersData} from './offers-data/offers-data';
import { offerPropertyData } from './offer-property-data/offer-property-data';
import { appProcess } from './app-process/app-process';
import { notifications } from './notifications/notification';
import { favoriteData } from './favorite-data/favorite-data';

export const rootReducer = combineReducers({
  [NameSpace.User]: userData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.OfferProperty]: offerPropertyData.reducer,
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Notifications]: notifications.reducer,
  [NameSpace.Favorites]: favoriteData.reducer,
});
