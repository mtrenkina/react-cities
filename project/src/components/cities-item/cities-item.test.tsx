import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRoute from '../../components/history-route/history-route';
import CitiesItem, { CitiesItemProps } from './cities-item';
import { cities } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeState = {};
const store = mockStore(fakeState);
const currentCity = 'Paris';

const citiesItemProps: CitiesItemProps = {
  city: cities[0],
  currentCity: currentCity,
  clickHandler: jest.fn()
};

describe('Component: CitiesItem', () => {

  it('1. Should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <CitiesItem {...citiesItemProps}/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText(citiesItemProps.city.name)).toBeInTheDocument();
  });

  it('2. Should add active class when current city equal to render city', () => {
    const { container } = render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <CitiesItem {...citiesItemProps}/>
        </HistoryRoute>
      </Provider>
    );

    expect(container.getElementsByClassName('tabs__item--active').length).toBe(1);
  });

  it('3. Should call city changing function after city title click', async () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <CitiesItem {...citiesItemProps}/>
        </HistoryRoute>
      </Provider>
    );

    const fakeHandle = jest.fn();
    screen.getByTestId('city-link').onclick = fakeHandle;
    await userEvent.click(screen.getByTestId('city-link'));
    expect(fakeHandle).toBeCalledTimes(1);
  });
})
