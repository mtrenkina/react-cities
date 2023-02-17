import { render, screen } from '@testing-library/react';
import ErrorPage from './error-page';

describe('Page: LoadingPage', () => {

  it('should render correctly', () => {
    render(
      <ErrorPage />
    );

    expect(screen.getByText('Error!')).toBeInTheDocument();
  });
})
