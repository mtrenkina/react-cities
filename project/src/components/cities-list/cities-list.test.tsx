import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRoute from '../../components/history-route/history-route';
import CitiesList from './cities-list';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeState = {
  ACTION: {
    city: 'Paris',
  }
};
const store = mockStore(fakeState);

describe('Component: CitiesList', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <CitiesList/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
  });
})
