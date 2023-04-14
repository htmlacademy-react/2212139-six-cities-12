import userEvent from '@testing-library/user-event';
import {act, render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import UserUnauthorized from './user-unauthorized';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: UserUnauthorized', () => {
  it('should render correctly', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserUnauthorized />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should redirect to "login-page" if user click to the "Sign in" link', async () => {
    const store = mockStore();
    history.push('/user-unauthorized');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='/user-unauthorized'
              element={<UserUnauthorized />}
            />
            <Route
              path={AppRoute.Login}
              element={<h1>Login page.</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await act(async () => await userEvent.click(screen.getByRole('link')));
    expect(screen.getByText(/Login page./i)).toBeInTheDocument();
  });
});
