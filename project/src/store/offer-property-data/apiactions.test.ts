import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {fetchOfferPropertyAction, fetchNearOffersAction, fetchReviewAction, sendReviewAction} from './api-actions';
import {State} from '../../types/state';
import {StatusCodes} from 'http-status-codes';
import {makeFakeOffer, makeFakeOffers, makeFakeReviews} from '../../utils/mocks';
import {APIRoute} from '../../const';

const fakeOfferId = 1;
const fakeOffer = makeFakeOffer();
const fakeOffers = makeFakeOffers();
const fakeReviews = makeFakeReviews();

describe('Async actions: offerProperty', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should loaded offer property when server return 200', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${fakeOfferId}`)
      .reply(StatusCodes.OK, fakeOffer);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOfferPropertyAction(fakeOfferId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferPropertyAction.pending.type,
      fetchOfferPropertyAction.fulfilled.type
    ]);
  });

  it('should loaded nearest offers when server return 200', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${fakeOfferId}/nearby`)
      .reply(StatusCodes.OK, fakeOffers);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchNearOffersAction(fakeOfferId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearOffersAction.pending.type,
      fetchNearOffersAction.fulfilled.type
    ]);
  });

  it('should loaded reviews when server return 200', async () => {
    mockAPI
      .onGet(`${APIRoute.Reviews}/${fakeOfferId}`)
      .reply(StatusCodes.OK, fakeReviews);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchReviewAction(fakeOfferId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewAction.pending.type,
      fetchReviewAction.fulfilled.type
    ]);
  });

  it('should send review when server return 200', async () => {
    const fakeReview = {rating: 5, comment: 'It is a new review.'};

    mockAPI
      .onPost(`${APIRoute.Reviews}/${fakeOfferId}`)
      .reply(StatusCodes.OK, fakeReview);

    const store = mockStore();

    await store.dispatch(sendReviewAction({...fakeReview, id: fakeOfferId}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.fulfilled.type
    ]);
  });
});
