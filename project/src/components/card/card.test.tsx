import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import Card, { CardsProps } from './card';
import { AuthorizationStatus, cities, CardClassName, ImgClassName, AppRoute } from '../../const';
import { makeOffer } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';

const mockStore = configureMockStore([thunk]);

const fakeOfferInfo = { ...makeOffer(), id: 1, city: { ...cities[0] } };

let fakeState = {};
let store = mockStore(fakeState);
let history = createMemoryHistory();

let cardProps: CardsProps = {
  card: makeOffer(),
  cardClassName: CardClassName.MAIN,
  imgClassName: ImgClassName.MAIN,
  offerId: fakeOfferInfo.id,
  changeActiveCard: jest.fn(),
};

describe('Component: Card', () => {

  beforeEach(() => {
    history = createMemoryHistory();
  });

  describe('Card details', () => {

    beforeEach(() => {
      fakeState = {
        USER: {
          authStatus: AuthorizationStatus.AUTH,
        },
        DATA: {
          currentOffer: fakeOfferInfo,
        }
      };

      store = mockStore(fakeState);
    });

    it('1. Should render correctly', () => {

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Card {...cardProps}/>
          </HistoryRouter>
        </Provider>
      );

      const title = cardProps.card.title;
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('alt', 'Place image');
    });

    it('2. Should activate on favourite button click function when user authorized', async () => {

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Card {...cardProps}/>
          </HistoryRouter>
        </Provider>
      );

      const fakeFavouriteButtonHandler = jest.fn();
      screen.getByTestId('favourite__button').onclick = fakeFavouriteButtonHandler;
      await userEvent.click(screen.getByTestId('favourite__button'));
      expect(fakeFavouriteButtonHandler).toBeCalledTimes(1);
    });

  });

  describe('Card roating', () => {

    beforeEach(() => {
      fakeState = {
        USER: {
          authStatus: AuthorizationStatus.NO_AUTH,
        },
        DATA: {
          currentOffer: fakeOfferInfo,
        },
      };
      store = mockStore(fakeState);
    });

    it('1. Should redirect to Login Page when user not authorized', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Card {...cardProps}/>
            <Routes>
              <Route path='/login' element={<h1>This is login page</h1>} />
          </Routes>
          </HistoryRouter>
        </Provider>
      );

      const fakeFavouriteButtonHandler = jest.fn();
      screen.getByTestId('favourite__button').onclick = fakeFavouriteButtonHandler;
      await userEvent.click(screen.getByTestId('favourite__button'));
      expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
    });

    it('2. Should redirect to offer page by img link click correctly', async () => {

      const getTestLink = `/${AppRoute.ROOM}/${cardProps.card.id}`;
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Card {...cardProps}/>
            <Routes>
              <Route
                path={getTestLink}
                element={<h1>This is room page</h1>}
              />
            </Routes>
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByRole('img'));
      expect(screen.getByText(/This is room page/i)).toBeInTheDocument();
    });

    it('3. Should redirect to offer page by title link click correctly', async () => {

      const getTestLink = `/${AppRoute.ROOM}/${cardProps.card.id}`;
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Card {...cardProps}/>
            <Routes>
              <Route
                path={getTestLink}
                element={<h1>This is room page</h1>}
              />
            </Routes>
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByText(cardProps.card.title));
      expect(screen.getByText(/This is room page/i)).toBeInTheDocument();
    });

  });

});
