import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OfferId} from '../../types/offer';
import {NameSpace, DEFAULT_LOCATION, DEFAULT_SORT, Location, SortType} from '../../const';

type AppProcessState = {
location: Location;
sortType: SortType;
selectedOfferId: OfferId | null;
};

const initialState: AppProcessState = {
  location: DEFAULT_LOCATION,
  sortType: DEFAULT_SORT,
  selectedOfferId: null
};

export const appData = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    },
    changeSort: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    selectOffer: (state, action: PayloadAction<OfferId | null>) => {
      state.selectedOfferId = action.payload;
    }
  }
});

export const {changeLocation, changeSort, selectOffer} = appData.actions;
