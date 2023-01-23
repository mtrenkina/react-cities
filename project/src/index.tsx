import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offersMock, stateMock} from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App offers={offersMock} city={stateMock} />
  </React.StrictMode>,
);
