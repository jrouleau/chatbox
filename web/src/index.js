import './firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

if (process.env.NODE_ENV === 'development') {
  document.body.style.background = '#4a2560';
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
