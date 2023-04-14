import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../../components/history-router/history-router';
import LoginPage from './login-page';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const fakeOffers = makeFakeOffers();

const store = mockStore({
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth},
  [NameSpace.Offers]: {offers: fakeOffers}
});

describe('Component: LoginPage', () => {

  it('should click /randomCity button correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();

  });
});

