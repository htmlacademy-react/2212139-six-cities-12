import { SortType, DEFAULT_LOCATION, Location, DEFAULT_SORT } from '../../const';
import { appData, changeLocation, changeSort, selectOffer } from './app-data';

describe('Reducer: appData', () => {
  it('Should return initial state without additional parameters', () => {
    expect(appData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      location: DEFAULT_LOCATION,
      sortType: DEFAULT_SORT,
      selectedOfferId: null
    });
  });

  it('changeLocation test', () => {

    expect(
      appData.reducer(
        { location: DEFAULT_LOCATION, sortType: DEFAULT_SORT, selectedOfferId: null},
        changeLocation(Location.Amsterdam)
      )
    ).toEqual({ location: Location.Amsterdam, sortType: DEFAULT_SORT, selectedOfferId: null });
  });

  it('changeSort test', () => {
    expect(
      appData.reducer(
        { location: DEFAULT_LOCATION, sortType: DEFAULT_SORT, selectedOfferId: null },
        changeSort(SortType.HightPrice)
      )
    ).toEqual({ location: DEFAULT_LOCATION, sortType: SortType.HightPrice, selectedOfferId: null });
  });

  it('selectedOfferId test', () => {
    expect(
      appData.reducer(
        { location: DEFAULT_LOCATION, sortType: DEFAULT_SORT, selectedOfferId: null },
        selectOffer(22)
      )
    ).toEqual({ location: DEFAULT_LOCATION, sortType: DEFAULT_SORT, selectedOfferId: 22 });
  });
});
