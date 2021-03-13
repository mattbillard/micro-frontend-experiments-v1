import React from 'react';
import ReactDOM from 'react-dom';
import { IMicroAppProps } from '@company/shared-tools';
import '@company/shared-tools/src/styles/index.less';

import { CraApp } from '../components';
import '../components/styles/index.css';

declare const window: any;

window.craAppInit = (context: HTMLElement, props: IMicroAppProps | {} = {}) => {
  const elem = context?.querySelector('.cra-standalone-app');
  if (elem) {
    ReactDOM.render(<CraApp {...props} />, elem);
  }
};
