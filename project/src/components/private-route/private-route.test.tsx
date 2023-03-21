import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRoute from '../history-route/history-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFavouriteOffers, makeUserData } from '../../utils/mocks';
import PrivateRoute from './private-route';
import { Route, Routes } from 'react-router-dom';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeUserData = makeUserData();
let fakeState = {
  DATA: {
    favouriteOffers: makeFavouriteOffers(),
  },
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
    user: fakeUserData,
  },
};
let store = mockStore(fakeState);


describe('Component: PrivateRoute', () => {

  beforeEach(() => {
    history.push('/private');
  });

  it('should render private route when user is authorized', () => {

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Routes>
            <Route
              path={AppRoute.LOGIN}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoute>
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
  });

  it('should render public route when user not authorized', () => {

    fakeState = {
      DATA: {
        favouriteOffers: makeFavouriteOffers(),
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: fakeUserData,
      },
    };
    store = mockStore(fakeState);

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Routes>
            <Route
              path={AppRoute.LOGIN}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoute>
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
  });
})
