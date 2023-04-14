import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { DEFAULT_LOCATION, DEFAULT_SORT } from '../../const';
import HistoryRouter from '../history-router/history-router';
import OfferList from './offer-list';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  APP: {
    location: DEFAULT_LOCATION,
    sortType: DEFAULT_SORT,
    selectedOfferId: null
  },
});

describe('Component: LocationList', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferList />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('location-list')).toBeInTheDocument();
  });
});
