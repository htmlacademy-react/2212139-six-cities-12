import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import UserNavigation from './user-navigation';
import {makeFakeUserData, makeFakeOffers} from '../../utils/mocks';
import { AuthorizationStatus, FetchStatus, NameSpace } from '../../const';
import HistoryRouter from '../history-router/history-router';


const fakeUserData = makeFakeUserData();
const fakeOffers = makeFakeOffers();
const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: null,
  },
  FAVORITES: {
    favorites: fakeOffers,
    fetchStatus: FetchStatus.Success,
    setStatus: FetchStatus.Success
  }
});

describe('Component: UserNavigation', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserNavigation />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('user-navigation')).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render "user-authorized" component if user has status authorized', () => {
    const state = store.getState();
    state[NameSpace.User] = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: fakeUserData,
    };

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserNavigation />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('user-navigation')).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
