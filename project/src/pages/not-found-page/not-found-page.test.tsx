import { render, screen } from '@testing-library/react';
import {Route, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import NotFoundPage from './not-found-page';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFavouriteOffers, makeUserData } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeUserData = makeUserData();

const fakeState = {
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
    user: fakeUserData},
  DATA: {
    favouriteOffers: makeFavouriteOffers()}
};

const store = mockStore(fakeState);

describe('Page: NotFoundPage', () => {

  it('should render NotFoundPage correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <NotFoundPage />
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
  });
})
