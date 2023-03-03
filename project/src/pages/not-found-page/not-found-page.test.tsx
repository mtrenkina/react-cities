import { render, screen } from '@testing-library/react';
import NotFoundPage from './not-found-page';
import { Route } from 'react-router-dom';

describe('Page: NotFoundPage', () => {

  it('should render correctly', () => {
    render(
      <NotFoundPage />
    );

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
  });
})
