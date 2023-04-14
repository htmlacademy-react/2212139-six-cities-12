import { render, screen } from '@testing-library/react';
import BookmarkButton from './bookmark-button';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeUserData } from '../../utils/mocks';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';


const mockStore = configureMockStore([thunk]);
const fakeUserData = makeFakeUserData();
const isFavorite = false;
const id = 1;
const fakeSize = false;

describe('Component: BookmarkButton', () => {
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
          <BookmarkButton isFavorite={isFavorite} isBigSize={fakeSize} offerId={id}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });

  it('should redirect if not Auth', async () => {
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
          <Routes>
            <Route
              path='/'
              element={
                <BookmarkButton
                  isFavorite={isFavorite}
                  isBigSize={fakeSize}
                  offerId={id}
                />
              }
            />
            <Route
              path={AppRoute.Login}
              element={
                <h2>Login page</h2>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await act(async () => await userEvent.click(screen.getByRole('button')));
    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('should have !isFavorite if dispatch fulfilled', async () => {
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
          <BookmarkButton isFavorite={!isFavorite} isBigSize={fakeSize} offerId={id}/>
        </HistoryRouter>
      </Provider>
    );


    const button = screen.getByTestId('to-bookmarks');
    await act(async () => await userEvent.click(button));
    expect(button).toHaveClass('place-card__bookmark-button--active');
  });
});
