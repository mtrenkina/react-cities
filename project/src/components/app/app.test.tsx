import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import { AuthorizationStatus, AppRoute, cities } from '../../const';
import { getNeabyOffers, makeComments, makeFavouriteOffers, makeOffer, makeOffers } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

const fakeOfferInfo = { ...makeOffer(), id: 1, city: { ...cities[0] } };
const fakeOffers = [...makeOffers(), { ...fakeOfferInfo }];
const fakeComments = makeComments();
const fakeNearbyOffers = getNeabyOffers;
const fakeFavoriteOffers = makeFavouriteOffers();
const currentCity = 'Paris';

let fakeState = {
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
  DATA: {
    offers: fakeOffers,
    nearOffers: fakeNearbyOffers,
    favouriteOffers: fakeFavoriteOffers,
    currentOffer: fakeOfferInfo,
    comments: fakeComments,
    areOffersLoading: false,
    areNearOffersLoading: false,
    areFavouriteOffersLoading: false,
    isCurrentOfferLoading: false,
    areCommentsLoading: false,
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
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('App', () => {

  describe('App roating', () => {

    it('1. Should render Main page by default', () => {
      fakeState = {
        USER: {
          authorizationStatus: AuthorizationStatus.AUTH,
        },
        DATA: {
          offers: fakeOffers,
          nearOffers: fakeNearbyOffers,
          favouriteOffers: fakeFavoriteOffers,
          currentOffer: fakeOfferInfo,
          comments: fakeComments,
          areOffersLoading: false,
          areNearOffersLoading: false,
          areFavouriteOffersLoading: false,
          isCurrentOfferLoading: false,
          areCommentsLoading: false,
          errorMessage: undefined,
        },
        ACTION: {
          city: currentCity,
        },
      };

      store = mockStore(fakeState);

      fakeApp = (
        <Provider store={store}>
          <HistoryRouter history={history}>
            <App />
          </HistoryRouter>
        </Provider>
      );

      render(fakeApp);

      expect(screen.getByText(/to stay in Paris/i)).toBeInTheDocument();
    });

    it('2. Should render Login page when user navigate to "/login"', () => {
      history.push(AppRoute.LOGIN);
      render(fakeApp);

      expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    });

    it('3. Should render Room page when user navigate to "/:city/offer/:id"', () => {
      history.push(`${AppRoute.ROOM}/:1`);
      render(fakeApp);

      expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
      expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
      expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
      expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
    });

    it('4. Should render NotFoundScreen page when user navigate to non-existent route', () => {
      history.push('/abrakadabra');
      render(fakeApp);

      expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
    });
  });

  describe('App roating with parameters', () => {

    it('1. Should render Loading page when offers loading', () => {
      fakeState = {
        USER: {
          authorizationStatus: AuthorizationStatus.AUTH,
        },
        DATA: {
          offers: fakeOffers,
          nearOffers: fakeNearbyOffers,
          favouriteOffers: fakeFavoriteOffers,
          currentOffer: fakeOfferInfo,
          comments: fakeComments,
          areOffersLoading: true,
          areNearOffersLoading: false,
          areFavouriteOffersLoading: false,
          isCurrentOfferLoading: false,
          areCommentsLoading: false,
          errorMessage: undefined,
        },
        ACTION: {
          city: currentCity,
        },
      };

      store = mockStore(fakeState);

      render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
      );

      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    it('2. Should render Loading page when authorization status is unknown', () => {
      fakeState = {
        USER: {
          authorizationStatus: AuthorizationStatus.UNKNOWN,
        },
        DATA: {
          offers: fakeOffers,
          nearOffers: fakeNearbyOffers,
          favouriteOffers: fakeFavoriteOffers,
          currentOffer: fakeOfferInfo,
          comments: fakeComments,
          areOffersLoading: false,
          areNearOffersLoading: false,
          areFavouriteOffersLoading: false,
          isCurrentOfferLoading: false,
          areCommentsLoading: false,
          errorMessage: undefined,
        },
        ACTION: {
          city: currentCity,
        },
      };

      store = mockStore(fakeState);

      render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
      );

      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

  });
});
