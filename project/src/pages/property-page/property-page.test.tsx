import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
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

  it('should render correctly all data received whin to Auth', () => {
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

  it('should render correctly if user no Auth and click add to favorite', async () => {
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
          <Routes>
            <Route
              path='/'
              element={<PropertyPage />}
            />
            <Route
              path='/login'
              element={<h1>This is login page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('to-bookmarks')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('to-bookmarks'));
    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
  });

  it('should render correctly if user Auth and click add to favorite', async () => {
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
    });

    window.scrollTo = jest.fn();

    const fakeHandleFavorite = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyPage />
        </HistoryRouter>
      </Provider>
    );
    
    expect(screen.getByTestId('to-bookmarks')).toBeInTheDocument();
    screen.getByTestId('to-bookmarks').onclick = fakeHandleFavorite;
    await userEvent.click(screen.getByTestId('to-bookmarks'));
    expect(fakeHandleFavorite).toBeCalledTimes(1);
  });
});
