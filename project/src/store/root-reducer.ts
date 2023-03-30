import {combineReducers} from '@reduxjs/toolkit';
import {userProcess} from './user-process/user-process';
import {NameSpace} from '../const';
import {offersData} from './offers-data/offers-data';
import { offerPropertyData } from './offer-property-data/offer-property-data';
import { appProcess } from './app-process/app-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.OfferProperty]: offerPropertyData.reducer,
  [NameSpace.App]: appProcess.reducer,
});
