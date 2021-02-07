import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/app';

declare const window: any;

window.craAppInit = (context: any, props = {}) => {
  const elem = context?.querySelector('.cra-app');
  if (elem) {
    ReactDOM.render(<App {...props} />, elem);
  }
}
