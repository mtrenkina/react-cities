import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import FavouritesList from './favourites-list';
import { AuthorizationStatus } from '../../const';
import { makeFavouriteOffers } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

const fakeFavoriteOffers = makeFavouriteOffers();
const fakeFavouriteCities = Array.from(fakeFavoriteOffers).map((offer) => offer.city.name);
const uniqueFavouriteCities = Array.from(new Set(fakeFavouriteCities));

const fakeState = {
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
  DATA: {
    favouriteOffers: fakeFavoriteOffers,
  },
};

const store = mockStore(fakeState);
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRoute history={history}>
      <FavouritesList />
    </HistoryRoute>
  </Provider>
);

describe('Component: FavouritesList', () => {

    it('1. Should render correctly', () => {

      const {container} = render(fakeApp);
      const favoritesContainer = container.querySelector('.favorites__list');
      const favoriteCardsCount = favoritesContainer?.querySelectorAll('.favorites__card').length;
      const favoriteCitiesCount = favoritesContainer?.querySelectorAll('.locations').length;

      expect(favoriteCitiesCount).toEqual(uniqueFavouriteCities.length);
      expect(favoriteCardsCount).toEqual(fakeFavoriteOffers.length);
    });

});
