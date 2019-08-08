import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://9721272abbe44d9484c0a79421814a88@sentry.io/1304664',
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
