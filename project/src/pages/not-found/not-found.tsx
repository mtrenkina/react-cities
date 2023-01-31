import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';

const NotFound = (): JSX.Element => (
  <React.Fragment>
    <header className='header' id='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Logo />
          </div>
        </div>
      </div>
    </header>
    <main>
      <div className='page page--gray'>
        <title>Страница не найдена</title>
        <div className='page--not_found' style={{ fontSize: '24px', textAlign: 'center', paddingTop: 100 }}>
          <h1>404. Page not found</h1>
          <Link to="/" style={{ fontSize: '20px', color:'#4481C3', paddingTop: 20 }}>Вернуться на главную страницу</Link>
        </div>
      </div>
    </main>
  </React.Fragment>
);

export default NotFound;
