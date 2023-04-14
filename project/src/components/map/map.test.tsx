import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import Map from './map';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';

const fakeOffers = makeFakeOffers();

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Map', () => {
  it('should render correctly main map', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Map
            className="cities__map"
            offers={fakeOffers}
            selectedOfferId={fakeOffers[0].id}
          />
        </HistoryRouter>
      </Provider>
    );

    const mapElement = screen.getByTestId('map');

    expect(mapElement).toBeInTheDocument();
    expect(mapElement).toHaveClass('leaflet-container');
  });
});
