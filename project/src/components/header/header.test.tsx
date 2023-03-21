import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import { AuthorizationStatus } from '../../const';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFavouriteOffers, makeUserData } from '../../utils/mocks';
import Header from './header';

const mockStore = configureMockStore();
let history = createMemoryHistory();
const fakeUserData = makeUserData();
let fakeState = {};
let store = mockStore(fakeState);
let isLogo = true;

describe('Component: Header', () => {
  beforeEach(() => {
    fakeState = {
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: fakeUserData,
      },
      DATA: {
        favouriteOffers: makeFavouriteOffers(),
      },
    };

    store = mockStore(fakeState);
    history = createMemoryHistory();
  });

  it('should render Header correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Header/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText('Oliver.conner@gmail.com')).toBeInTheDocument();
    expect(container.getElementsByClassName('header__logo').length).toBe(1);
  });

  it('should render Header without UserInfo correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Header isLogoPage={isLogo}/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.queryByText('Oliver.conner@gmail.com')).not.toBeInTheDocument();
  });
});
