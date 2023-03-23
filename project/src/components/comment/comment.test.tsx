import { getAllByRole, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import HistoryRoute from '../history-route/history-route';
import Comment from './comment';
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
      <Comment hotelId={String(fakeOfferInfo.id)}/>
    </HistoryRoute>
  </Provider>
);

describe('Component: Comment', () => {

    it('1. Should render correctly', () => {

      render(fakeApp);

      expect(screen.getByText(/Your review/i)).toBeInTheDocument();
      expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
    });

    it('2. Should display input values correctly', async() => {

      const { container } = render(fakeApp);
      const radioButtons = getAllByRole(container, 'radio');

      await userEvent.type(screen.getByTestId('review-text'), 'Text for review');
      await userEvent.click(radioButtons[0]);
      expect(screen.getByDisplayValue(/Text for review/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(/5/i)).toBeInTheDocument();
    });

    it('3. Should not submit when text is not long enough', async() => {

      const { container } = render(fakeApp);
      const radioButtons = getAllByRole(container, 'radio');
      const fakeSubmit = jest.fn();

      await userEvent.type(screen.getByTestId('review-text'), 'Text for review');
      await userEvent.click(radioButtons[0]);
      screen.getByTestId('review-form').onsubmit = fakeSubmit;
      await userEvent.click(screen.getByTestId('review-submit'));
      expect(fakeSubmit).not.toBeCalled;
    });

    it('4. Should not submit when rating have not been chosen', async() => {

      render(fakeApp);
      const fakeSubmit = jest.fn();

      await userEvent.type(screen.getByTestId('review-text'), 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, vel.');
      screen.getByTestId('review-form').onsubmit = fakeSubmit;
      await userEvent.click(screen.getByTestId('review-submit'));
      expect(fakeSubmit).not.toBeCalled;
    });

    it('5. Should submit successfully when rating and review text have been set right way', async() => {

      const { container } = render(fakeApp);
      const fakeSubmit = jest.fn();
      const radioButtons = getAllByRole(container, 'radio');

      await userEvent.type(screen.getByTestId('review-text'), 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, vel.');
      await userEvent.click(radioButtons[0]);
      screen.getByTestId('review-form').onsubmit = fakeSubmit;
      await userEvent.click(screen.getByTestId('review-submit'));
      expect(fakeSubmit).toBeCalled;
    });

});
