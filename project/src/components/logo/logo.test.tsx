import { render, screen } from '@testing-library/react';
import Logo from './logo';
import { Link } from 'react-router-dom';

describe('Page: NotFoundPage', () => {

  it('should render correctly', async () => {

    const { getByAltText } = await render(
      <Link to='/'>
        <Logo />
      </Link>
    );
    const image = getByAltText('6 cities logo');

    expect(image).toHaveAttribute('src', 'img/logo.svg')
  });
})
