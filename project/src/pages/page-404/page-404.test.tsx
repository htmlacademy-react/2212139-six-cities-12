import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import Page404 from './page-404';

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Page404 />
      </HistoryRouter>
    );

    const headerElement = screen.getByText(/404/i);
    const linkElement = screen.getByText(/Back to the home page/i);

    expect(screen.getByTestId('page-404')).toBeInTheDocument();
    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
