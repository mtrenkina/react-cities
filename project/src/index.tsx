import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offersAmsterdamMock } from './mocks/offersAmserdam';
import { Amsterdam } from './mocks/cities';
import {Provider} from 'react-redux';
import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={offersAmsterdamMock} city={Amsterdam} />
    </Provider>
  </React.StrictMode>,
);
