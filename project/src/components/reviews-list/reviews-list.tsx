import React from 'react';
import ReviewsItem from '../reviews-item/reviews-item';
import { Review } from '../../types/reviews';

type ReviewListProps = {
  reviews: Review[];
};

const ReviewsList = ({ reviews }: ReviewListProps): JSX.Element => (
  <React.Fragment>
    <h2 className='reviews__title'>
      Reviews &middot; <span className='reviews__amount'>{reviews.length}</span>
    </h2>
    <ul className='reviews__list'>
      {Array.from(reviews).map((review) => (
        <ReviewsItem review={review} key={review.id}/>
      ))}
    </ul>
  </React.Fragment>
);

export default ReviewsList;
