import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import Main from './main';
import { AuthorizationStatus, AppRoute, cities } from '../../const';
import { makeFavouriteOffers, makeOffer, makeOffers } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

const fakeOfferInfo = { ...makeOffer(), id: 1, city: { ...cities[0] } };
const fakeOffers = [...makeOffers(), { ...fakeOfferInfo }];
const fakeFavoriteOffers = makeFavouriteOffers();
const currentCity = 'Paris';

let fakeState = {
  USER: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  },
  DATA: {
    offers: fakeOffers,
    favouriteOffers: fakeFavoriteOffers,
    currentOffer: fakeOfferInfo,
    areOffersLoading: false,
    areFavouriteOffersLoading: false,
    isCurrentOfferLoading: false,
    errorMessage: undefined,
  },
  ACTION: {
    city: currentCity,
  },
};
let store = mockStore(fakeState);
let history = createMemoryHistory();

let fakeApp = (
  <Provider store={store}>
    <HistoryRoute history={history}>
      <Main />
    </HistoryRoute>
  </Provider>
);

describe('Page: Main', () => {

    it('1. Should render Main page correctly', () => {

      render(fakeApp);

      expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
      expect(screen.getByText(/to stay in Paris/i)).toBeInTheDocument();
    });

    it('2. Should render Main empty page when there are no offers loaded', () => {

      fakeState = {
        USER: {
          authorizationStatus: AuthorizationStatus.AUTH,
        },
        DATA: {
          offers: [],
          favouriteOffers: [],
          currentOffer: fakeOfferInfo,
          areOffersLoading: false,
          areFavouriteOffersLoading: false,
          isCurrentOfferLoading: false,
          errorMessage: undefined,
        },
        ACTION: {
          city: currentCity,
        },
      };

      store = mockStore(fakeState);

      fakeApp = (
        <Provider store={store}>
          <HistoryRoute history={history}>
            <Main />
          </HistoryRoute>
        </Provider>
      );

      render(fakeApp);

      expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    });

});
