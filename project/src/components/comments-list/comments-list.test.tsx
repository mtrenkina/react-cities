import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import CommentsList from './comments-list';
import { AuthorizationStatus } from '../../const';
import { makeComments } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

const fakeState = {
  USER: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  },
};
const store = mockStore(fakeState);
const history = createMemoryHistory();
const comments = makeComments();
const fakeApp = (
  <Provider store={store}>
    <HistoryRoute history={history}>
      <CommentsList comments={comments}/>
    </HistoryRoute>
  </Provider>
);

describe('Component: CommentsList', () => {

    it('1. Should render correctly', () => {

      const {container} = render(fakeApp);
      const reviewsCount = container.querySelector('.reviews__amount');

      expect(reviewsCount).toHaveTextContent(`${comments.length}`);
      expect(screen.getByText(comments[0].comment)).toBeInTheDocument();
      expect(screen.getByText(comments[1].comment)).toBeInTheDocument();
      expect(screen.getByText(comments[2].comment)).toBeInTheDocument();
    });

});
