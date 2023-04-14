import { render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import Sort from './sort';
import {makeFakeUserData } from '../../utils/mocks';
import { AuthorizationStatus, DEFAULT_LOCATION, DEFAULT_SORT, NameSpace } from '../../const';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-router/history-router';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const fakeUserData = makeFakeUserData();

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: fakeUserData,
  },
  [NameSpace.App]: {
    location: DEFAULT_LOCATION,
    sortType: DEFAULT_SORT,
    selectedOfferId: null
  },
});

describe('Component: Sort', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Sort />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('sort-form')).toBeInTheDocument();
  });
});
