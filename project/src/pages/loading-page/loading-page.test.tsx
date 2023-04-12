import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import LoadingPage from './loading-page';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <LoadingPage />
      </HistoryRouter>,
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
