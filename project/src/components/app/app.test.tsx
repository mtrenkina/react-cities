import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

import { AuthorizationStatus, AppRoute, cities } from '../../const';
import { getNeabyOffers, makeComments, makeFavouriteOffers, makeOffer, makeOffers } from '../../utils/mocks';
import { Route, Routes } from 'react-router-dom';

const mockStore = configureMockStore([thunk]);

const fakeOfferInfo = { ...makeOffer(), id: 1, city: { ...cities[0] } };
const fakeOffers = [...makeOffers(), { ...makeOffer() }];
const fakeComments = makeComments();
const fakeNearbyOffers = getNeabyOffers;
const fakeFavoriteOffers = makeFavouriteOffers();
const currentCity = 'Paris';

let store = mockStore({
  USER: {
    authStatus: AuthorizationStatus.NO_AUTH,
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
});

let history = createMemoryHistory();

let fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path={AppRoute.MAIN} element={<App />} />
        <Route path={AppRoute.LOGIN} element={<h1>This is login page</h1>} />
        <Route path={AppRoute.FAVOURITES} element={<h1>This is favourites page</h1>} />
        <Route path={`${AppRoute.ROOM}/:id`} element={<h1>This is offer page</h1>} />
        <Route path='*' element={<h1>Not found page</h1>} />
      </Routes>
    </HistoryRouter>
  </Provider>
);

describe('App', () => {

  beforeEach(() => {
    store = mockStore({
      USER: {
        authStatus: AuthorizationStatus.AUTH,
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
    });

    history = createMemoryHistory();

    fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.MAIN} element={<App />} />
            <Route path={AppRoute.LOGIN} element={<h1>This is login page</h1>} />
            <Route path={AppRoute.FAVOURITES} element={<h1>This is favourites page</h1>} />
            <Route path={`${AppRoute.ROOM}/:id`} element={<h1>This is offer page</h1>} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );
  });

  it('should render Main page by default', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/places to stay in Paris/i)).toBeInTheDocument();
  });

  it('should render Login page when user navigate to "/login"', () => {
    history.push(AppRoute.LOGIN);
    render(fakeApp);

    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
  });

  it('should render Room page when user navigate to "/:city/offer/:id"', () => {
    history.push(`${AppRoute.ROOM}/:1`);
    render(fakeApp);

    expect(screen.getByText(/This is offer page/i)).toBeInTheDocument();
  });

  it('4. should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/abrakadabra');
    render(fakeApp);

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });
});
