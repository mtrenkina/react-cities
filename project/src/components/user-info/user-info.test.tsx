import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFavouriteOffers, makeUserData } from '../../utils/mocks';
import UserInfo from './user-info';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { Route, Routes } from 'react-router-dom';

const mockStore = configureMockStore();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
let history = createMemoryHistory();

const fakeUserData = makeUserData();

let fakeState = {};
let store = mockStore(fakeState);

describe('Component: UserInfo', () => {
  beforeEach(() => {
    fakeState = {
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: fakeUserData,
      },
      DATA: {
        favouriteOffers: makeFavouriteOffers(),
      },
    };

    store = mockStore(fakeState);
    history = createMemoryHistory();
  });

  it('should render UserInfo correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <UserInfo />
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText('Oliver.conner@gmail.com')).toBeInTheDocument();
  });

  it('Should sign out correctly', async () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <UserInfo />
        </HistoryRoute>
      </Provider>
    );

    const fakeHandleSignOut = jest.fn();
    screen.getByTestId('sign-out-link').onclick = fakeHandleSignOut;
    await userEvent.click(screen.getByTestId('sign-out-link'));
    expect(fakeHandleSignOut).toBeCalledTimes(1);
  });

  it('Should redirect to favourites after link click', async () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Routes>
            <Route path='/' element={<UserInfo />} />
            <Route path='/favorites' element={<h1>This is favorites page</h1>} />
          </Routes>
        </HistoryRoute>
      </Provider>
    );
    await userEvent.click(screen.getByTestId('favourites-link'));
    expect(screen.getByText(/This is favorites page/i)).toBeInTheDocument();
  });

  describe('Render with unauthorized status', () => {
    beforeEach(() => {
      fakeState = {
        USER: {
          authorizationStatus: AuthorizationStatus.NO_AUTH,
          user: fakeUserData,
        },
        DATA: {
          favouriteOffers: makeFavouriteOffers(),
        },
      };

      store = mockStore(fakeState);
    });

    it('should render sign in text when unauthorized', () => {
      render(
        <Provider store={store}>
          <HistoryRoute history={history}>
            <UserInfo />
          </HistoryRoute>
        </Provider>
      );

      expect(screen.getByText('Sign in')).toBeInTheDocument();
    });

    it('should redirect to login page when click sign in', async () => {
      render(
        <Provider store={store}>
          <HistoryRoute history={history}>
            <Routes>
              <Route path='/' element={<UserInfo />} />
              <Route path='/login' element={<h1>This is login page</h1>} />
            </Routes>
          </HistoryRoute>
        </Provider>
      );
      await userEvent.click(screen.getByTestId('sign-in-link'));
      expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
    });

  });

});
