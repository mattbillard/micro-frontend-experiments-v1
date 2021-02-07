import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { CraApp } from './components/cra-app';

declare const window: any;

window.craAppInit = (context: any, props = {}) => {
  const elem = context?.querySelector('.cra-app');
  if (elem) {
    ReactDOM.render(<CraApp {...props} />, elem);
  }
}
