import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import Login from './login';
import { AuthorizationStatus, cities } from '../../const';
import { makeFavouriteOffers, makeOffer, makeOffers } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

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
      <Login />
    </HistoryRoute>
  </Provider>
);

describe('Page: Login', () => {

    it('1. Should render Login page correctly', () => {

      render(fakeApp);

      expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    });

    it('2. Should display input values correctly', async() => {

      render(fakeApp);

      await userEvent.type(screen.getByTestId('login'), 'example@mail.ru');
      await userEvent.type(screen.getByTestId('password'), '123a');

      expect(screen.getByDisplayValue(/example@mail.ru/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(/123a/i)).toBeInTheDocument();
    });

    it('3. Should click sign in correctly', async () => {
      const fakeSingIn = jest.fn();
      render(fakeApp);

      await userEvent.type(screen.getByTestId('login'), 'example@mail.ru');
      await userEvent.type(screen.getByTestId('password'), '123a');

      expect(screen.getByTestId('login-submit')).toBeInTheDocument();
      screen.getByTestId('login-form').onsubmit = fakeSingIn;
      await userEvent.click(screen.getByTestId('login-submit'));
      expect(fakeSingIn).toBeCalledTimes(1);
    });

    it('4. Should not click sign in when password does not match to password pattern', async () => {
      const fakeSingIn = jest.fn();
      render(fakeApp);

      await userEvent.type(screen.getByTestId('login'), 'example@mail.ru');
      await userEvent.type(screen.getByTestId('password'), '12');

      expect(screen.getByTestId('login-submit')).toBeInTheDocument();
      screen.getByTestId('login-form').onsubmit = fakeSingIn;
      await userEvent.click(screen.getByTestId('login-submit'));
      expect(fakeSingIn).not.toBeCalled;
    });

});
