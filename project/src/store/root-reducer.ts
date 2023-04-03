import {combineReducers} from '@reduxjs/toolkit';
import {userData} from './user-process/user-process';
import {NameSpace} from '../const';
import {offersData} from './offers-data/offers-data';
import { offerPropertyData } from './offer-property-data/offer-property-data';
import { appProcess } from './app-process/app-process';
import { notifications } from './notifications/notification';

export const rootReducer = combineReducers({
  [NameSpace.User]: userData.reducer,
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.OfferProperty]: offerPropertyData.reducer,
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Notifications]: notifications.reducer,
});
