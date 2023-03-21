import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRoute from '../../components/history-route/history-route';
import { makeCity } from '../../utils/mocks';
import CitiesItem from './cities-item';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeState = {};
const store = mockStore(fakeState);
const currentCity = 'Paris';

const citiesItemProps = {
  city: makeCity(),
  currentCity: currentCity,
  clickHandler: jest.fn()
};

describe('Component: CitiesItem', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <CitiesItem city={citiesItemProps.city} currentCity={citiesItemProps.currentCity} clickHandler={citiesItemProps.clickHandler}/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText(citiesItemProps.city.name)).toBeInTheDocument();
  });

  it('should add active class when current city equal to render city', () => {
    const { container } = render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <CitiesItem city={citiesItemProps.city} currentCity={citiesItemProps.city.name} clickHandler={citiesItemProps.clickHandler}/>
        </HistoryRoute>
      </Provider>
    );

    expect(container.getElementsByClassName('tabs__item--active').length).toBe(1);
  });
})
