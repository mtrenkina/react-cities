import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRoute from '../../components/history-route/history-route';
import { AuthorizationStatus } from '../../const';
import { makeFavouriteOffers, makeUserData } from '../../utils/mocks';
import MainEmpty from './main-empty';

const mockStore = configureMockStore();
let history = createMemoryHistory();
const fakeUserData = makeUserData();
let fakeState = {};
let store = mockStore(fakeState);
let currentCity = 'Paris';

describe('Page: MainEmpty', () => {

  beforeEach(() => {
    fakeState = {
      DATA: {
        favouriteOffers: makeFavouriteOffers(),
      },
      ACTION: {
        city: currentCity,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: fakeUserData,
      },
    };

    store = mockStore(fakeState);
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <MainEmpty/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });
})
