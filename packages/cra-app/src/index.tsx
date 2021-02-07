import React from 'react';
import ReactDOM from 'react-dom';
import { CraApp } from 'cra-components';
import 'cra-components/dist/index.css';

declare const window: any;

window.craAppInit = (context: any, props = {}) => {
  const elem = context?.querySelector('.cra-app');
  if (elem) {
    ReactDOM.render(<CraApp {...props} />, elem);
  }
}
