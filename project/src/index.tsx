import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { store } from './store';
import { checkAuthAction, fetchOffersAction } from './store/api-action';
import App from './components/app/app';
import { BrowserRouter } from 'react-router-dom';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
