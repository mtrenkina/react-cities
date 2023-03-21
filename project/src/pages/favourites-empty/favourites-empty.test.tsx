import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRoute from '../../components/history-route/history-route';
import { AuthorizationStatus } from '../../const';
import { makeFavouriteOffers, makeUserData } from '../../utils/mocks';
import FavouritesEmpty from './favourites-empty';

const mockStore = configureMockStore();
let history = createMemoryHistory();
const fakeUserData = makeUserData();
let fakeState = {};
let store = mockStore(fakeState);

describe('Page: FavouritesEmpty', () => {

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

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <FavouritesEmpty/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });
})
