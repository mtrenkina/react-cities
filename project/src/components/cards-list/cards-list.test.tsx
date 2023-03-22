import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import CardsList, { CardsListProps } from './cards-list';
import { makeOffers } from '../../utils/mocks';
import { AuthorizationStatus, CardClassName, ImgClassName } from '../../const';

const fakeOffers = makeOffers();
const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    offers: fakeOffers
  },
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

const listProps: CardsListProps = {
  sortedOffers: fakeOffers,
  onCardHover: jest.fn(),
  cardClassName: CardClassName.MAIN,
  imgClassName: ImgClassName.MAIN
};

describe('Component: CardsList', () => {
  it('1. should render correctly', () => {

    const { container } = render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardsList {...listProps}/>
        </HistoryRouter>
      </Provider>

    );

    expect(container.getElementsByClassName('place-card').length).not.toBe(0);

  });
});
