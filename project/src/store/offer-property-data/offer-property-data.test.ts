import { makeFakeNearOffers, makeFakeOffer, makeFakeReviews } from '../../utils/mocks';
import { FetchStatus } from '../../const';
import { OfferPropertyDataState } from '../../types/state';
import { offerPropertyData } from './offer-property-data';
import { fetchNearOffersAction, fetchOfferPropertyAction, fetchReviewAction, sendReviewAction } from './api-actions';

const fakeOffer = makeFakeOffer();
const fakeReviews = makeFakeReviews();
const fakeNearOffers = makeFakeNearOffers();

describe('reducer: offerPropertyData', () => {
  let state: OfferPropertyDataState;

  beforeEach(() => {
    state = {
      offerProperty: null,
      offerPropertyStatus: FetchStatus.Idle,
      nearOffers: [],
      reviews: [],
      reviewFormBlockedStatus: FetchStatus.Idle,
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(offerPropertyData.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(
      state
    );
  });

  describe('Action: fetchOfferPropertyAction', () => {
    it('should update the offerPropertyStatus to FetchStatus.loading if fetchOfferPropertyAction.pending', () => {
      expect(
        offerPropertyData.reducer(state, {
          type: fetchOfferPropertyAction.pending.type,
        })
      ).toEqual({ ...state, offerPropertyStatus: FetchStatus.Loading });
    });

    it('should update the offerPropertyStatus to Success and loaded offer if fetchOfferPropertyAction.fulfilled', () => {
      expect(
        offerPropertyData.reducer(state, {
          type: fetchOfferPropertyAction.fulfilled.type,
          payload: fakeOffer,
        })
      ).toEqual({
        ...state,
        offerPropertyStatus: FetchStatus.Success,
        offerProperty: fakeOffer,
      });
    });

    it('should update status to "Failed" if action rejected', () => {
      expect(
        offerPropertyData.reducer(state, {
          type: fetchOfferPropertyAction.rejected.type,
        })
      ).toEqual({ ...state, offerPropertyStatus: FetchStatus.Failed });
    });
  });

  describe('Action: fetchReviewAction', () => {
    it('should loaded reviews if action fulfilled', () => {
      expect(
        offerPropertyData.reducer(state, {
          type: fetchReviewAction.fulfilled.type, payload: fakeReviews
        })
      ).toEqual({...state, reviews: fakeReviews});
    });
  });

  describe('Action: fetchNearOffersAction', () => {

    it('should loaded nearOffers if action fulfilled', () => {
      expect(
        offerPropertyData.reducer(state, {
          type: fetchNearOffersAction.fulfilled.type, payload: fakeNearOffers
        })
      ).toEqual({...state, nearOffers: fakeNearOffers});
    });
  });

  describe('Action: sendReviewAction', () => {

    it('should update form block if action pending', () => {
      expect(offerPropertyData.reducer(state, {type: sendReviewAction.pending.type}))
        .toEqual({...state, reviewFormBlockedStatus: FetchStatus.Loading});
    });

    it('should update form block status to "Success" if action fulfilled', () => {
      expect(offerPropertyData.reducer(state, {type: sendReviewAction.fulfilled.type, payload: fakeReviews}))
        .toEqual({...state, reviewFormBlockedStatus: FetchStatus.Success, reviews: fakeReviews});
    });

    it('should update form block status to "Failed" if action rejected', () => {
      expect(offerPropertyData.reducer(state, {type: sendReviewAction.rejected.type}))
        .toEqual({...state, reviewFormBlockedStatus: FetchStatus.Failed});
    });
  });
});
