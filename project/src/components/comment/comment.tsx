import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../hooks';
import { commentPostAction } from '../../store/api-action';
import { Input } from '../../types/comment';

const Comment = ({hotelId}: {hotelId?: string}): JSX.Element => {

  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { isValid }, reset } = useForm<Input>({mode: 'all'});

  const submitHandler: SubmitHandler<Input> = async (data) => {
    if (hotelId) {
      await dispatch(commentPostAction({comment: data.review,
        hotelId,
        rating: Number(data.rating)}));

      reset();
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className='reviews__form form' action='#' method='post' onSubmit={handleSubmit(submitHandler)}>
      <label className='reviews__label form__label' htmlFor='review'>
        Your review
      </label>
      <div className='reviews__rating-form form__rating'>
        <input className='form__rating-input visually-hidden' value={5} id='5-stars' type='radio' {...register('rating', {required: true})} />
        <label htmlFor='5-stars' className='reviews__rating-label form__rating-label' title='perfect'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

        <input className='form__rating-input visually-hidden' value={4} id='4-stars' type='radio' {...register('rating', {required: true})}/>
        <label htmlFor='4-stars' className='reviews__rating-label form__rating-label' title='good'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

        <input className='form__rating-input visually-hidden' value={3} id='3-stars' type='radio' {...register('rating', {required: true})}/>
        <label htmlFor='3-stars' className='reviews__rating-label form__rating-label' title='not bad'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

        <input className='form__rating-input visually-hidden' value={2} id='2-stars' type='radio' {...register('rating', {required: true})}/>
        <label htmlFor='2-stars' className='reviews__rating-label form__rating-label' title='badly'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

        <input className='form__rating-input visually-hidden' value={1} id='1-star' type='radio' {...register('rating', {required: true})}/>
        <label htmlFor='1-star' className='reviews__rating-label form__rating-label' title='terribly'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>
      </div>
      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        {...register('review', { required: true, minLength: 50, maxLength: 300, deps: ['rating'] })}
      />
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your stay
          with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button className='reviews__submit form__submit button' type='submit' disabled={!isValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Comment;
