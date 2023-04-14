import { render, screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import PrivateRoute from './private-route';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import LoginPage from '../../pages/login-page/login-page';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const store = mockStore({
  [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
});

describe('Component: Private-router', () => {
  it('should redirect correctly is user Auth', () => {
    history.push('/current');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <div>Favorites</div>
          </PrivateRoute>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });

  it('should redirect correctly is user NoAuth', () => {
    history.push('/*');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                  <div data-testid="favorite-test">Favorites</div>
                </PrivateRoute>
              }
            />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.queryByTestId('favorite-test')).not.toBeInTheDocument();
  });
});
