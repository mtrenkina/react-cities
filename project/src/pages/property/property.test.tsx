import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import Property from './property';
import { AppRoute, AuthorizationStatus, cities } from '../../const';
import {getNeabyOffers, makeComments, makeFavouriteOffers, makeOffer, makeOffers } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom'

const mockStore = configureMockStore([thunk]);

const fakeOfferInfo = { ...makeOffer(), id: 1, city: { ...cities[0] } };
const fakeFavouriteOffers = makeFavouriteOffers();
const fakeNearOffers = getNeabyOffers;
const fakeComments = makeComments();
const currentCity = 'Paris';

let fakeState = {
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
  DATA: {
    favouriteOffers: fakeFavouriteOffers,
    nearOffers: fakeNearOffers,
    currentOffer: fakeOfferInfo,
    comments: fakeComments,
    areNearOffersLoading: false,
    isCurrentOfferLoading: false,
    areCommentsLoading: false,
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
      <Property />
    </HistoryRoute>
  </Provider>
);

describe('Page: Property', () => {

  describe('Property page render with AUTH status', () => {

    beforeEach(() => {
      fakeState = {
        USER: {
          authorizationStatus: AuthorizationStatus.AUTH,
        },
        DATA: {
          favouriteOffers: fakeFavouriteOffers,
          nearOffers: fakeNearOffers,
          currentOffer: fakeOfferInfo,
          comments: fakeComments,
          areNearOffersLoading: false,
          isCurrentOfferLoading: false,
          areCommentsLoading: false,
        },
        ACTION: {
          city: currentCity,
        },
      };
      store = mockStore(fakeState);

      fakeApp = (
        <Provider store={store}>
          <HistoryRoute history={history}>
            <Property />
          </HistoryRoute>
        </Provider>
      );
    });

    it('1. Should render correctly', () => {

      render(fakeApp);

      expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
      expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
      expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
      expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
      expect(screen.queryByTestId('review-form')).toBeInTheDocument;
    });

    it('2. Should render Loading page when offers are loading', () => {
      fakeState = {
        USER: {
          authorizationStatus: AuthorizationStatus.AUTH,
        },
        DATA: {
          favouriteOffers: fakeFavouriteOffers,
          nearOffers: fakeNearOffers,
          currentOffer: fakeOfferInfo,
          comments: fakeComments,
          areNearOffersLoading: true,
          isCurrentOfferLoading: false,
          areCommentsLoading: false,
        },
        ACTION: {
          city: currentCity,
        },
      };
      store = mockStore(fakeState);
      fakeApp = (
        <Provider store={store}>
          <HistoryRoute history={history}>
            <Property />
          </HistoryRoute>
        </Provider>
      );

      render(fakeApp);

      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    it('3. Should render NotFoundPage page when there are no current offer', () => {
      fakeState = {
        USER: {
          authorizationStatus: AuthorizationStatus.AUTH,
        },
        DATA: {
          favouriteOffers: fakeFavouriteOffers,
          nearOffers: fakeNearOffers,
          // @ts-ignore */}
          currentOffer: null,
          comments: fakeComments,
          areNearOffersLoading: false,
          isCurrentOfferLoading: false,
          areCommentsLoading: false,
        },
        ACTION: {
          city: currentCity,
        },
      };
      store = mockStore(fakeState);
      fakeApp = (
        <Provider store={store}>
          <HistoryRoute history={history}>
            <Property />
          </HistoryRoute>
        </Provider>
      );

      render(fakeApp);

      expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    });

    it('4. Should activate function when click on changing favourite status button', async() => {
      render(fakeApp);
      const fakeOnFavouriteButtonClickHandler = jest.fn();

      expect(screen.getByTestId('favourite-change')).toBeInTheDocument();
      screen.getByTestId('favourite-change').onclick = fakeOnFavouriteButtonClickHandler;
      await userEvent.click(screen.getByTestId('favourite-change'));
      expect(fakeOnFavouriteButtonClickHandler).toBeCalledTimes(1);
    });

  });

  describe('Property page render with NO_AUTH status', () => {

    beforeEach(() => {
      fakeState = {
        USER: {
          authorizationStatus: AuthorizationStatus.NO_AUTH,
        },
        DATA: {
          favouriteOffers: fakeFavouriteOffers,
          nearOffers: fakeNearOffers,
          currentOffer: fakeOfferInfo,
          comments: fakeComments,
          areNearOffersLoading: false,
          isCurrentOfferLoading: false,
          areCommentsLoading: false,
        },
        ACTION: {
          city: currentCity,
        },
      };
      store = mockStore(fakeState);

      fakeApp = (
        <Provider store={store}>
          <HistoryRoute history={history}>
            <Property />
          </HistoryRoute>
        </Provider>
      );
    });

    it('1. Should render correctly', () => {
      render(fakeApp);

      expect(screen.queryByTestId('review-form')).not.toBeInTheDocument;
    });

    it('2. Should redirect to Login when click on changing favourite status button', async() => {
      const foo = { useNavigate };
      const navigate = jest.fn()
      jest.spyOn(foo, 'useNavigate').mockImplementation(() => navigate)

      render(fakeApp);
      const fakeOnFavouriteButtonClickHandler = jest.fn();

      expect(screen.getByTestId('favourite-change')).toBeInTheDocument();
      screen.getByTestId('favourite-change').onclick = fakeOnFavouriteButtonClickHandler;
      await userEvent.click(screen.getByTestId('favourite-change'));

      expect(fakeOnFavouriteButtonClickHandler).toBeCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(AppRoute.LOGIN);
    });

  });
});
