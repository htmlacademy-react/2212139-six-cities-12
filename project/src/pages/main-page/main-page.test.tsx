import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  AuthorizationStatus,
  DEFAULT_LOCATION,
  DEFAULT_SORT,
  FetchStatus,
  NameSpace,
} from '../../const';
import { makeFakeOffers, makeFakeUserData } from '../../utils/mocks';
import HistoryRouter from '../../components/history-router/history-router';
import MainPage from './main-page';

const mockStore = configureMockStore([thunk]);
const fakeOffers = makeFakeOffers();
const fakeUserData = makeFakeUserData();

describe('Page: Main', () => {

  it('should render correctly if data received and offers is empty', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: { authStatus: AuthorizationStatus.NoAuth },
      [NameSpace.Offers]: {
        offers: [],
        offersStatus: FetchStatus.Success,
      },
      [NameSpace.App]: {
        location: DEFAULT_LOCATION,
        sortType: DEFAULT_SORT,
        selectedOfferId: null,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPage />
        </HistoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/No places to stay available/i)
    ).toBeInTheDocument();
  });

  it('should render correctly if data received', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authStatus: AuthorizationStatus.Auth,
        userData: fakeUserData, },
      [NameSpace.Offers]: {
        offers: fakeOffers,
        offersStatus: FetchStatus.Success,
      },
      [NameSpace.App]: {
        location: DEFAULT_LOCATION,
        sortType: DEFAULT_SORT,
        selectedOfferId: null,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
  });

});


