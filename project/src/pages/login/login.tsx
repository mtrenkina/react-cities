import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import Sprite from '../../components/svg-sprite/svg-sprite';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-action';
import { Input } from '../../types/login';

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
    reset,
  } = useForm<Input>({ mode: 'all' });
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

  const submitHandler: SubmitHandler<Input> = async (data) => {
    await dispatch(loginAction({ login: data.login, password: data.password }));
    reset();
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <React.Fragment>
      <Sprite />

      <div className='page page--gray page--login'>
        <Header isLogoPage />

        <main className='page__main page__main--login'>
          <div className='page__login-container container'>
            <section className='login'>
              <h1 className='login__title'>Sign in</h1>
              <form className='login__form form' action='#' method='post' onSubmit={handleSubmit(submitHandler)}>
                <div className='login__input-wrapper form__input-wrapper'>
                  <label className='visually-hidden'>E-mail</label>
                  <input
                    className='login__input form__input'
                    type='email'
                    placeholder='Email'
                    {...register('login', { required: true })}
                  />
                </div>
                <div className='login__input-wrapper form__input-wrapper'>
                  <label className='visually-hidden'>Password</label>
                  <input
                    className='login__input form__input'
                    type='password'
                    placeholder='Password'
                    {...register('password', {
                      required: true,
                      minLength: { value: 2, message: 'Password should contain at least two symbols' },
                      pattern: {
                        value: passwordPattern,
                        message: 'Password should contain at least one letter and number without spaces',
                      },
                    })}
                  />
                </div>
                <button className='login__submipt form__submit button' type='submit' disabled={!isValid}>
                  Sign in
                </button>
                <div style={{ height: 20, width: `${100}%`, paddingBottom: `${10}px` }}>
                  {errors?.password && <p>{errors?.password.message || ''}</p>}
                </div>
              </form>
            </section>
            <section className='locations locations--login locations--current'>
              <div className='locations__item'>
                <Link className='locations__item-link' to='/'>
                  <span>Amsterdam</span>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Login;
