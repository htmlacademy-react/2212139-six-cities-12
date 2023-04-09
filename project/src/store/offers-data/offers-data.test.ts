import { makeFakeOffers } from '../../utils/mocks';
import { OffersDataState } from '../../types/state';
import { FetchStatus } from '../../const';
import { offersData } from './offers-data';
import { fetchOffersAction } from './api-actions';

const fakeOffers = makeFakeOffers();

describe('reducer: offerData', () => {
  let state: OffersDataState;

  beforeEach(() => {
    state = {
      offers: [],
      offersStatus: FetchStatus.Idle,
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(offersData.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(
      state
    );
  });

  describe('Action: fetchOffersAction', () => {
    it('should update the offersStatus to FetchStatus.loading if fetchOffersAction.pending', () => {
      expect(
        offersData.reducer(state, {
          type: fetchOffersAction.pending.type,
        })
      ).toEqual({ ...state, offersStatus: FetchStatus.Loading });
    });

    it('should update the status to FetchStatus.success and loaded offers if fetchOffersAction.fulfilled', () => {
      expect(
        offersData.reducer(state, {
          type: fetchOffersAction.fulfilled.type,
          payload: fakeOffers,
        })
      ).toEqual({
        ...state,
        offersStatus: FetchStatus.Success,
        offers: fakeOffers,
      });
    });
  });
});
