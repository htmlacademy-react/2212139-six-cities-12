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
import OfferListFavorites from './offer-list-favorites';

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

describe('Component: FavoriteList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferListFavorites
            cardType={CardType.Favorites}
            classNames="favorites__places"
            offers={fakeOffers}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('favorite-list')).toBeInTheDocument();
  });
});
