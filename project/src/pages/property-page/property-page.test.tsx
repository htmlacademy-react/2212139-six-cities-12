import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakeOffer, makeFakeOffers, makeFakeReviews, makeFakeUserData } from '../../utils/mocks';
import { AuthorizationStatus, FetchStatus, NameSpace } from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import PropertyPage from './property-page';


const mockStore = configureMockStore([thunk]);

const fakeOffers = makeFakeOffers();
const fakeOffer = makeFakeOffer();
const fakeReviews = makeFakeReviews();
const fakeUserData = makeFakeUserData();

describe('Page: Property', () => {
  it('should render correctly all data received', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
      [NameSpace.OfferProperty]: {
        offerProperty: fakeOffer,
        offerPropertyStatus: FetchStatus.Success,
        nearOffers: fakeOffers,
        reviews: fakeReviews,
        reviewFormBlockedStatus: FetchStatus.Success,
      },
    });

    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render correctly all data received when to Auth', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      },
      [NameSpace.OfferProperty]: {
        offerProperty: fakeOffer,
        offerPropertyStatus: FetchStatus.Success,
        nearOffers: fakeOffers,
        reviews: fakeReviews,
        reviewFormBlockedStatus: FetchStatus.Success,
      },
      [NameSpace.Favorites]: {
        favorites: fakeOffers,
        fetchStatus: FetchStatus.Success,
        setStatus: FetchStatus.Success
      },
    });

    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render correctly if offers and roomInfo is loading', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
      [NameSpace.OfferProperty]: {
        offerProperty: fakeOffer,
        offerPropertyStatus: FetchStatus.Loading,
        nearOffers: fakeOffers,
        reviews: fakeReviews,
        reviewFormBlockedStatus: FetchStatus.Loading,
      },
    });

    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
