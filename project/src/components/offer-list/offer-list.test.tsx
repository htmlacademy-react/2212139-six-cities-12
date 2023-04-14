import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import {
  AuthorizationStatus,
  CardType,
  FetchStatus,
  NameSpace,
} from '../../const';
import HistoryRouter from '../history-router/history-router';
import {
  makeFakeOffers,
  makeFakeUserData,
} from '../../utils/mocks';
import thunk from 'redux-thunk';
import OfferList from '../offer-list/offer-list';

const history = createMemoryHistory();
const fakeOffers = makeFakeOffers();
const mockStore = configureMockStore([thunk]);
const fakeUserData = makeFakeUserData();

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: fakeUserData,
  },
  [NameSpace.Offers]: {
    offers: fakeOffers,
    offersStatus: FetchStatus.Success,
  },
});

describe('Component: OfferList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferList
            cardType={CardType.Cities}
            classNames={'places__list cities__places-list'}
            offers={fakeOffers}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('offer-list')).toBeInTheDocument();
  });
});
