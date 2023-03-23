import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import CommentsItem from './comments-item';
import { AuthorizationStatus } from '../../const';
import { makeComment } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

const fakeState = {
  USER: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  },
};
const store = mockStore(fakeState);
const history = createMemoryHistory();
const comment = makeComment();
const fakeApp = (
  <Provider store={store}>
    <HistoryRoute history={history}>
      <CommentsItem comment={comment}/>
    </HistoryRoute>
  </Provider>
);

describe('Component: CommentItem', () => {

    it('1. Should render correctly', () => {

      render(fakeApp);
      const hostName = comment.user.name;
      const avatarUrl = comment.user.avatarUrl;
      const reviewText = comment.comment;

      expect(screen.getByText(hostName)).toBeInTheDocument();
      expect(screen.getByText(reviewText)).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', avatarUrl);
      expect(screen.getByTestId('rating-stars')).toHaveStyle(`width: ${100/5 * comment.rating}%`);
    });

});
