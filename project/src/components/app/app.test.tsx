import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AppRoute, AuthorizationStatus, FetchStatus, Location, NameSpace, SortType } from '../../const';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeNearOffers, makeFakeOffer, makeFakeOffers, makeFakeReviews, makeFakeUserData } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import App from './app';

const fakeOffer = makeFakeOffer();
const fakeOffers = makeFakeOffers();
const fakeNearOffers = makeFakeNearOffers();
const fakeReviews = makeFakeReviews();
const fakeUserData = makeFakeUserData();

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);


const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: fakeUserData,
  },
  [NameSpace.App]: {
    location: Location.Paris,
    sortType: SortType.Popular,
    selectedOfferId: 1,
  },
  [NameSpace.Favorites]: {
    favorites: fakeOffers,
    fetchStatus: FetchStatus.Success,
    setStatus: FetchStatus.Success,
  },
  [NameSpace.Offers]: {
    offers: fakeOffers,
    offersStatus: FetchStatus.Success,
  },
  [NameSpace.OfferProperty]: {
    offerProperty: fakeOffer,
    offerPropertyStatus: FetchStatus.Success,
    nearOffers: fakeNearOffers,
    reviews: fakeReviews,
    reviewFormBlockedStatus: FetchStatus.Success,
  }
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/" route', () => {
    history.push(AppRoute.Root);
    window.scrollTo = jest.fn();

    render(fakeApp);

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('should render "PropertyPage" when user navigate to "/offer"', () => {
    history.push(generatePath(AppRoute.Room, { id: `${fakeOffer.id}` }));
    window.scrollTo = jest.fn();

    render(fakeApp);

    expect(screen.getByTestId('property-page')).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    const state = store.getState();
    window.scrollTo = jest.fn();

    state[NameSpace.User] = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: fakeUserData,
    };

    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('should render "Page-404" when user navigate to "*" route', () => {
    history.push('/non-existent_address');

    render(fakeApp);
    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
