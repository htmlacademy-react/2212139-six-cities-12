import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import ReviewForm from './review-form';
import { makeFakeOffer, makeFakeUserData } from '../../utils/mocks';
import { AuthorizationStatus, FetchStatus, NameSpace } from '../../const';
import HistoryRouter from '../history-router/history-router';

const offerId = 1;

const history = createMemoryHistory();
const fakeOffer = makeFakeOffer();
const mockStore = configureMockStore([thunk]);
const fakeUserData = makeFakeUserData();

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: fakeUserData,
  },
  [NameSpace.OfferProperty]: {
    offerProperty: fakeOffer,
    offerPropertyStatus: FetchStatus.Success,
    nearOffers: [],
    reviews: [],
    reviewFormBlockedStatus: FetchStatus.Success,
  },
});

describe('Component: ReviewForm', () => {
  it('should render correctly', async () => {
    const numberOfStars = 5;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm offerId={offerId} />
        </HistoryRouter>
      </Provider>
    );

    const labelElement = screen.getByLabelText(/Your review/i);
    expect(labelElement).toBeInTheDocument();

    const radioElements = screen.getAllByTestId('rating');
    expect(radioElements.length).toBe(numberOfStars);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();

    const radioElement = screen.getByDisplayValue('1');
    await act(async () => await userEvent.click(radioElement));
    expect(radioElement).toBeChecked();

    await act(
      async () =>
        await userEvent.type(
          screen.getByTestId('review'),
          'It is a new review.'
        )
    );
    expect(
      screen.getByDisplayValue(/It is a new review./i)
    ).toBeInTheDocument();
  });

  it('should button has disabled status if radio button is not checked', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm offerId={offerId} />
        </HistoryRouter>
      </Provider>
    );

    const radioElements = screen.getAllByTestId('rating');

    radioElements.forEach((item: HTMLElement) => {
      expect(item).not.toBeChecked();
    });
  });

  it('should button has disabled status if length of review less than 50 letters', async () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm offerId={offerId} />
        </HistoryRouter>
      </Provider>
    );

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();

    await act(async () => await userEvent.type(
      screen.getByTestId('review'),
      'Review has less 50 letters.'
    ));

    expect(
      screen.getByDisplayValue(/Review has less 50 letters./i)
    ).toBeInTheDocument();

    expect(buttonElement).toHaveAttribute('disabled');
  });

  it('should button has disabled status if form status is disabled', () => {
    const state = store.getState();
    state[NameSpace.OfferProperty] = { reviewFormBlockedStatus: FetchStatus.Loading };

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm offerId={offerId} />
        </HistoryRouter>
      </Provider>
    );

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('disabled');
  });

  it('should dispatch action "sendReview" if user correctly write review', async () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm offerId={offerId} />
        </HistoryRouter>
      </Provider>
    );

    const inputElement = screen.getByDisplayValue('1');
    await act(async () => await userEvent.click(inputElement));

    const textareaElement = screen.getByTestId('review');
    await act(async () => await userEvent.type(
      textareaElement,
      'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!'
    ));

    const buttonElement = screen.getByRole('button');
    await act(async () => await userEvent.click(buttonElement));

    const actions = store.getActions();
    expect(actions[0].type).toBe('data/sendReviewAction/pending');
  });
});
