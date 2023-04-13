import userEvent from '@testing-library/user-event';
import {act, render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import LocationItem from './location-item';
import { DEFAULT_LOCATION, DEFAULT_SORT, Location } from '../../const';
import HistoryRouter from '../history-router/history-router';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  APP: {
    location: DEFAULT_LOCATION,
    sortType: DEFAULT_SORT,
    selectedOfferId: null
  },
});

describe('Component: LocationItem', () => {
  it('should render correctly', () => {
    const fakeLocationItem = Location.Brussels;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LocationItem location={fakeLocationItem} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('locations-item')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(fakeLocationItem)).toBeInTheDocument();
  });

  it('should render with active item class', () => {
    const fakeLocationItem = Location.Paris;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LocationItem location={fakeLocationItem} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeLocationItem)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('tabs__item--active');
  });

  it('should dispatch action "changeLocation" if user click on the link', async () => {
    const fakeLocationItem = Location.Brussels;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LocationItem location={fakeLocationItem} />
        </HistoryRouter>
      </Provider>
    );

    await act(async () => await userEvent.click(screen.getByRole('link')));

    const actions = store.getActions();
    expect(actions[0].type).toBe('APP/changeLocation');
  });
});
