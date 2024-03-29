import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store';
import 'react-toastify/dist/ReactToastify.css';
import NotificationToast from './components/notification-toast/notification-toast';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App/>
        <NotificationToast/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
