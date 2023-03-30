import {State} from '../../types/state';
import {OfferId} from '../../types/offer';
import {NameSpace, SortType} from '../../const';

export const getLocation = (state: State): string => state[NameSpace.App].location;
export const getSortType = (state: State): SortType => state[NameSpace.App].sortType;
export const getSelectedOfferId = (state: State): OfferId | null => state[NameSpace.App].selectedOfferId;
