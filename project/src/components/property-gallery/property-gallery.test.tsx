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
import PropertyGallery from './property-gallery';

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

describe('Component: PropertyGallery', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyGallery
            offer={fakeOffer}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('gallery')).toBeInTheDocument();
  });
});
