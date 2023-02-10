import React from 'react';
import CommentsItem from '../comments-item/comments-item';
import { Comment } from '../../types/comment';
import { MAX_REVIEWS_COUNT } from '../../const';

type CommentListProps = {
  comments: Comment[];
};

const CommentsList = ({ comments }: CommentListProps): JSX.Element => (
  <React.Fragment>
    <h2 className='reviews__title'>
      Reviews &middot; <span className='reviews__amount'>{comments.length}</span>
    </h2>
    <ul className='reviews__list'>
      {Array.from(comments).reverse().slice(0, MAX_REVIEWS_COUNT).map((comment) => (
        <CommentsItem comment={comment} key={comment.id}/>
      )).sort()}
    </ul>
  </React.Fragment>
);

export default CommentsList;
