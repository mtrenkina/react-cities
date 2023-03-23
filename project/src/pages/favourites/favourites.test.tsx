import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import Favorites from './favourites';
import { AuthorizationStatus } from '../../const';
import { makeFavouriteOffers } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

const fakeFavoriteOffers = makeFavouriteOffers();

let fakeState = {
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
  DATA: {
    favouriteOffers: fakeFavoriteOffers,
    areFavouriteOffersLoading: false,
  },
};
let store = mockStore(fakeState);
let history = createMemoryHistory();

let fakeApp = (
  <Provider store={store}>
    <HistoryRoute history={history}>
      <Favorites />
    </HistoryRoute>
  </Provider>
);

describe('Page: Favorites', () => {

    it('1. Should render correctly', () => {
      render(fakeApp);

      expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    });

    it('2. Should render Loading page when favourite offers are loading', () => {
      fakeState = {
        USER: {
          authorizationStatus: AuthorizationStatus.AUTH,
        },
        DATA: {
          favouriteOffers: fakeFavoriteOffers,
          areFavouriteOffersLoading: true,
        },
      };
      store = mockStore(fakeState);
      fakeApp = (
        <Provider store={store}>
          <HistoryRoute history={history}>
            <Favorites />
          </HistoryRoute>
        </Provider>
      );

      render(fakeApp);

      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    it('3. Should render FavoriteEmpty page when there are no favourite offers', () => {
      fakeState = {
        USER: {
          authorizationStatus: AuthorizationStatus.AUTH,
        },
        DATA: {
          favouriteOffers: [],
          areFavouriteOffersLoading: false,
        },
      };
      store = mockStore(fakeState);
      fakeApp = (
        <Provider store={store}>
          <HistoryRoute history={history}>
            <Favorites />
          </HistoryRoute>
        </Provider>
      );

      render(fakeApp);

      expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
    });

});
