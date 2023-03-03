import { render, screen } from '@testing-library/react';
import LoadingPage from './loading-page';

describe('Page: LoadingPage', () => {

  it('should render correctly', () => {
    render(
      <LoadingPage />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
})
