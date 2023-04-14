import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import {
  AuthorizationStatus,
  FetchStatus,
  NameSpace,
} from '../../const';
import HistoryRouter from '../history-router/history-router';
import {
  makeFakeOffer,
} from '../../utils/mocks';
import PropertyList from './property-list';

const history = createMemoryHistory();
const fakeOffer = makeFakeOffer();
const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: null,
  },
  [NameSpace.OfferProperty]: {
    offerProperty: fakeOffer,
    offerPropertyStatus: FetchStatus.Success,
    nearOffers: [],
    reviews: [],
    reviewFormBlockedStatus: FetchStatus.Success,
  },
});

describe('Component: PropertyList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyList
            offer={fakeOffer}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
  });
});
