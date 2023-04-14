import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import ReviewItem from './review-item';
import {makeFakeReviews} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';

const fakeReviews = makeFakeReviews();

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewItem review={fakeReviews[0]} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('review-item')).toBeInTheDocument();
  });
});
