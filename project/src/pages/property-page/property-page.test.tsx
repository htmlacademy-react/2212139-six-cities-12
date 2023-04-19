import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakeOffer, makeFakeOffers, makeFakeReviews, makeFakeUserData } from '../../utils/mocks';
import { AuthorizationStatus, DEFAULT_LOCATION, DEFAULT_SORT, FetchStatus, NameSpace } from '../../const';
import PropertyPage from './property-page';
import { MemoryRouter } from 'react-router-dom';


const mockStore = configureMockStore([thunk]);

const fakeOffers = makeFakeOffers();
const fakeOffer = makeFakeOffer();
const fakeReviews = makeFakeReviews();
const fakeUserData = makeFakeUserData();

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
  [NameSpace.App]: {
    location: DEFAULT_LOCATION,
    sortType: DEFAULT_SORT,
    selectedOfferId: null,
  },
});

describe('Page: Property', () => {
  it('should render correctly all data received', () => {

    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PropertyPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render correctly all data received when to Auth', () => {

    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PropertyPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
