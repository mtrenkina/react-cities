import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../../components/header/header';

const NotFoundPage = (): JSX.Element => (
  <div className='page page--gray'>
    <title>Страница не найдена</title>
    <Header />
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
