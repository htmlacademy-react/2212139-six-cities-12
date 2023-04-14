import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Routes } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Header from './header';
import { makeFakeUserData, makeFakeOffers } from '../../utils/mocks';
import { AppRoute, AuthorizationStatus, FetchStatus, NameSpace } from '../../const';
import HistoryRouter from '../history-router/history-router';

const fakeUserData = makeFakeUserData();
const fakeOffers = makeFakeOffers();
const mockStore = configureMockStore([thunk]);

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: fakeUserData,
  },
  [NameSpace.Offers]: {
    offers: fakeOffers,
    offersStatus: FetchStatus.Success,
  },
  [NameSpace.Favorites]: {
    favorites: fakeOffers,
    fetchStatus: FetchStatus.Success,
    setStatus: FetchStatus.Success,
  },
});

const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly without user navigation', () => {
    render(
      <Provider store={store}>
        ,
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();

    const imageElement = screen.getByAltText(/6 cities logo/i);
    expect(imageElement).toBeInTheDocument();
  });

  it('should render correctly with user navigation and status authorized', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();

    const logoElement = screen.getByAltText(/6 cities logo/i);
    expect(logoElement).toBeInTheDocument();

    const avatarElement = screen.getByAltText(`${fakeUserData.name}`);
    expect(avatarElement).toBeInTheDocument();

    const spanElement = screen.getByText(/Sign out/i);
    expect(spanElement).toBeInTheDocument();
  });

  it('should render correctly with user navigation and status unauthorized', () => {
    const state = store.getState();
    state[NameSpace.User] = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: fakeUserData,
    };

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();

    const logoElement = screen.getByAltText(/6 cities logo/i);
    expect(logoElement).toBeInTheDocument();

    const spanElement = screen.getByText(/Sign in/i);
    expect(spanElement).toBeInTheDocument();
  });

  it('should redirect to "main-page" if user click to the link with logo', async () => {
    history.push('/header');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/header" element={<Header />} />
            <Route path={AppRoute.Root} element={<h1>Main page.</h1>} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await act(async () => await userEvent.click(screen.getByTestId('logo-link')));
    expect(screen.getByText(/Main page./i)).toBeInTheDocument();
  });
});
