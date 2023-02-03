import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';
import UserInfo from '../../components/user-info/user-info';

const NotFoundPage = (): JSX.Element => (
  <div className='page page--gray'>
    <title>Страница не найдена</title>
    <header className='header' id='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Logo />
          </div>
          <nav className='header__nav'>
            <ul className='header__nav-list'>
              <UserInfo />
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main>
      <div className='page page--gray'>
        <title>Страница не найдена</title>
        <div className='page--not_found' style={{ fontSize: '18px', textAlign: 'center', paddingTop: 100 }}>
          <h1>404. Page not found</h1>
          <Link to={AppRoute.MAIN} style={{ fontSize: '16px', color: '#4481C3', paddingTop: 20 }}>
            Вернуться на главную страницу
          </Link>
        </div>
      </div>
    </main>
  </div>
);

export default NotFoundPage;
