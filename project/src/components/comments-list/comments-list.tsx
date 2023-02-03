import React from 'react';
import CommentsItem from '../comments-item/comments-item';
import { Comment } from '../../types/comment';

type CommentListProps = {
  comments: Comment[];
};

const CommentsList = ({ comments }: CommentListProps): JSX.Element => (
  <React.Fragment>
    <h2 className='reviews__title'>
      Reviews &middot; <span className='reviews__amount'>{comments.length}</span>
    </h2>
    <ul className='reviews__list'>
      {Array.from(comments).map((comment) => (
        <CommentsItem comment={comment} key={comment.id}/>
      ))}
    </ul>
  </React.Fragment>
);

export default CommentsList;
