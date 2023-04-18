import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Map from './map';
import { makeFakeOffers } from '../../utils/mocks';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus, DEFAULT_LOCATION, DEFAULT_SORT, FetchStatus, NameSpace } from '../../const';
import thunk from 'redux-thunk';

const fakeOffers = makeFakeOffers();
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  [NameSpace.User]: { authStatus: AuthorizationStatus.NoAuth },
  [NameSpace.Offers]: {
    offers: fakeOffers,
    offersStatus: FetchStatus.Success,
  },
  [NameSpace.App]: {
    location: DEFAULT_LOCATION,
    sortType: DEFAULT_SORT,
    selectedOfferId: null,
  },
});


describe('Component: Map', () => {
  it('should render correctly main map', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Map
            className="cities__map"
            offers={fakeOffers}
          />
        </MemoryRouter>
      </Provider>
    );

    const mapElement = screen.getByTestId('map');

    expect(mapElement).toBeInTheDocument();
    expect(mapElement).toHaveClass('leaflet-container');
  });
});
