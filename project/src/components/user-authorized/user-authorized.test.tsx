import userEvent from '@testing-library/user-event';
import {act, render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import UserAuthorized from './user-authorized';
import {makeFakeOffers, makeFakeUserData} from '../../utils/mocks';
import { AuthorizationStatus, FetchStatus } from '../../const';
import HistoryRouter from '../history-router/history-router';

const fakeUserData = makeFakeUserData();
const fakeOffers = makeFakeOffers();
const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: fakeUserData
  },
  FAVORITES: {
    favorites: fakeOffers,
    fetchStatus: FetchStatus.Success,
    setStatus: FetchStatus.Success
  }
});

describe('Component: UserAuthorized', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserAuthorized />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeUserData.name}`)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeUserData.email}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should despatch action "logoutAction" if user click to the "Sign out" link', async () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserAuthorized />
        </HistoryRouter>
      </Provider>
    );

    const linkElement = screen.getByText(/Sign out/i);
    await act(async () => await userEvent.click(linkElement));

    const actions = store.getActions();
    const logout = actions.find((action) => action.type === 'user/logout/pending');
    expect(logout?.type).toBe('user/logout/pending');
  });
});
