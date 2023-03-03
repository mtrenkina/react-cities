import { PuffLoader } from 'react-spinners';
import { CSSProperties } from 'react';

function LoadingPage(): JSX.Element {

  const override: CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
  };

  return (
    <main className="page__main page__main--index">
      <h2 className="near-places__title" style={{position: 'fixed', left:'48%', top: '35%'}}>Loading...</h2>
      <div className="container">
        <PuffLoader color={'#4481C3'} size={150} aria-label="Loading Spinner" data-testid="loader" cssOverride={override}/>
      </div>
    </main>
  );
}

export default LoadingPage;
