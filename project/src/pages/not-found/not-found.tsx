import {AppRoute} from '../../types/const';
import { Link } from 'react-router-dom';

function NotFound(): JSX.Element {
  return (
    <div className='page page--gray'>
      <title>Страница не найдена</title>
      <div className='page--not_found' style={{ fontSize: '30px', textAlign: 'center', paddingTop: 100 }}>
        <h1>404. Page not found</h1>
        <Link to={AppRoute.Main}>Вернуться на главную страницу</Link>
      </div>
    </div>
  );
}

export default NotFound;
