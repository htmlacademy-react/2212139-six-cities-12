import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { AppRoute, AuthorizationStatus, FetchStatus, Location, SortType } from '../../const';
import { makeFakeNearOffers, makeFakeOffer, makeFakeOffers, makeFakeReview, makeFakeUserData } from '../../utils/mocks';
import App from './app';

const fakeOffer = makeFakeOffer();
const fakeOffers = makeFakeOffers();
const fakeNearOffers = makeFakeNearOffers();
const fakeReview = makeFakeReview();
const fakeUserData = makeFakeUserData();

const fakeState = {
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: fakeUserData,
  },
  APP: {
    location: Location.Paris,
    sortType: SortType.Popular,
    selectedOfferId: null,
  },
  OFFERS: {
    offers: fakeOffers,
    offersStatus: FetchStatus.Idle,
  },
  OFFER_PROPERTY: {
    offerProperty: fakeOffer,
    offerPropertyStatus: FetchStatus.Idle,
    nearOffers: fakeNearOffers,
    reviews: fakeReview,
    reviewFormBlockedStatus: FetchStatus.Idle,
  }
};

const mockStore = configureMockStore();
const store = mockStore(fakeState);
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    //expect(screen.getByTestId('main-page')).toBeInTheDocument();
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });
});
