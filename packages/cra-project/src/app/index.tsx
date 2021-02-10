import React from 'react';
import ReactDOM from 'react-dom';
import { CraApp } from '../components';
import '../components/styles/index.css';

declare const window: any;

window.craAppInit = (context: any, props = {}) => {
  const elem = context?.querySelector('.cra-standalone-app');
  if (elem) {
    ReactDOM.render(<CraApp {...props} />, elem);
  }
}
