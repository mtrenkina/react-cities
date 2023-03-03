import { render, screen } from '@testing-library/react';
import {Route, Routes} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import Logo from './logo';
import HistoryRoute from '../history-route/history-route';
import { AppRoute } from '../../const';

const history = createMemoryHistory();

describe('Component: Logo', () => {

  it('should render correctly from required URL', async () => {

    render(
      <HistoryRoute history={history}>
        <Logo />
      </HistoryRoute>
    );
    const image = screen.getByAltText(/6 cities logo/i);

    expect(image).toHaveAttribute('src', 'img/logo.svg')
  });

  it('should redirect to the main page when user click on the link', async () => {
    history.push('/logo');

    render(
      <HistoryRoute history={history}>
        <Routes>
          <Route
            path='/logo'
            element={<Logo />}
          />
          <Route
            path={AppRoute.MAIN}
            element={<h1>Main screen!</h1>}
          />
        </Routes>
      </HistoryRoute>
    );

    await userEvent.click(screen.getByTestId('link'));
    expect(screen.getByText(/Main screen!/i)).toBeInTheDocument();
  });

})
