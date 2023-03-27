import {combineReducers} from '@reduxjs/toolkit';
import {userProcess} from './user-process/user-process';
import {NameSpace} from '../const';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer
});
