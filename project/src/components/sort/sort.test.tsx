import { act, render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import Sort from './sort';
import { makeFakeUserData } from '../../utils/mocks';
import {
  AuthorizationStatus,
  DEFAULT_LOCATION,
  DEFAULT_SORT,
  NameSpace,
  SortType,
} from '../../const';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-router/history-router';
import userEvent from '@testing-library/user-event';

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
    selectedOfferId: null,
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

  it('should worked correctly', async() => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Sort />
        </HistoryRouter>
      </Provider>
    );

    const toggle = screen.getByTestId('toggle');
    await act(async () => await userEvent.click(toggle));
    expect(screen.getAllByTestId('sort-item').length).toBe(
      Object.keys(SortType).length
    );
  });

  it('should worked correctly2', async() => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Sort />
        </HistoryRouter>
      </Provider>
    );

    const toggle = screen.getByTestId('toggle');
    await act(async () => await userEvent.click(toggle));
    const sortOption = screen.getAllByTestId('sort-item')[1];
    await act(async () => await userEvent.click(sortOption));
    const action = store.getActions();
    expect(action[0].payload).toBe('Price: low to high');
  });
});
