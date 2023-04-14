import { act, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import thunk from 'redux-thunk';
import { AuthorizationStatus, CardType, NameSpace } from '../../const';
import HistoryRouter from '../history-router/history-router';
import Card from './card';
import { makeFakeOffer, makeFakeUserData } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);
const fakeOffer = makeFakeOffer();
const fakeUserData = makeFakeUserData();

describe('Component: Card', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      },
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Card cardType={CardType.Cities} offer={fakeOffer} />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      `${fakeOffer.title}`
    );
    expect(screen.getByText(/night/i)).toBeInTheDocument();
  });

  it('should click button favorite if user Auth', async () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      },
    });

    const fakeHandleFavorite = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Card cardType={CardType.Cities} offer={fakeOffer} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('to-bookmarks')).toBeInTheDocument();
    screen.getByTestId('to-bookmarks').onclick = fakeHandleFavorite;
    await act(async () => await userEvent.click(screen.getByTestId('to-bookmarks')));
    expect(fakeHandleFavorite).toBeCalledTimes(1);
  });

  it('should click button favorite if user no Auth', async () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Card cardType={CardType.Cities} offer={fakeOffer} />
          <Routes>
            <Route path="/login" element={<h1>This is login page</h1>} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('to-bookmarks')).toBeInTheDocument();
    await act(async () => await userEvent.click(screen.getByTestId('to-bookmarks')));
    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
  });

  it('should setActiveCard if card MouseOver', async () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      },
    });

    const fakeSetActiveCard = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Card cardType={CardType.Cities} offer={fakeOffer} />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('card-article')).toBeInTheDocument();
    screen.getByTestId('card-article').onmouseover = fakeSetActiveCard;
    await userEvent.hover(screen.getByTestId('card-article'));
    expect(fakeSetActiveCard).toBeCalledTimes(1);
  });
});
