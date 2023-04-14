import { render, screen } from '@testing-library/react';
import FullPageError from './full-page-error';
import { AuthorizationStatus, NameSpace } from '../../const';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';

const mockStore = configureMockStore([thunk]);
describe('Component: FullPageError', () => {
  it('should render correctly', () => {
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
          <FullPageError />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
  });
});

