import { render, screen } from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFavouriteOffers, makeUserData } from '../../utils/mocks';
import UserInfo from './user-info';
import thunk from 'redux-thunk';
import { AnyAction } from 'redux';
import userEvent from '@testing-library/user-event';
import { createAPI } from '../../services/api';

const mockStore = configureMockStore();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const fakeUserData = makeUserData();

const fakeState = {USER: {
  authorizationStatus: AuthorizationStatus.AUTH,
  user: fakeUserData}
};

const store = mockStore(fakeState);

const useSelector = jest.fn();

const mockAppState = {
  favouriteOffers: makeFavouriteOffers(),
  authorizationStatus: AuthorizationStatus.AUTH,
};

describe('Component: UserInfo', () => {

  beforeEach(() => {
    useSelector.mockImplementation(callback => {
      return callback(mockAppState);
    });
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <UserInfo />
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText('Oliver.conner@gmail.com')).toBeInTheDocument();
  });
})
