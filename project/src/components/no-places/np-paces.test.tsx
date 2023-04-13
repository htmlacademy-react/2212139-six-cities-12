import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { DEFAULT_LOCATION, DEFAULT_SORT } from '../../const';
import HistoryRouter from '../history-router/history-router';
import NoPlaces from './no-places';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  APP: {
    location: DEFAULT_LOCATION,
    sortType: DEFAULT_SORT,
    selectedOfferId: null,
  },
});

describe('Component: NoPlaces', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NoPlaces location="Paris" />
        </HistoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/No places to stay available/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /We could not find any property available at the moment in/i
      )
    ).toBeInTheDocument();
  });
});
