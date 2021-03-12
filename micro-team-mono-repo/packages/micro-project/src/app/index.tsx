import React from 'react';
import ReactDOM from 'react-dom';
import { IMicroAppProps } from '@company/core-team-shared-tools';
import '@company/core-team-shared-tools/src/styles/index.less';

import { MicroAppRouter } from '../components';

import '../components/styles/index.less';
import './styles/micro-app.less';

declare const window: any;

/**
 * NOTE:
 * Normally React just bootstraps itself
 * For 2 of the micro frontend approaches (iframe and injectApp), that doesn't work
 * They need to have access to the init method, so they can rerender on prop changes
 *
 * Also tried other approaches
 * - script with onload - parent app can't rerender child app on prop changes
 * - window.currentScript - same as above and also doesn't work in shadowDOM
 * - child app watches parent app for changes - this works against React's paradigm. Better to have parent tell child when to rerender
 */
window.microAppInit = (context: HTMLElement, props: IMicroAppProps = {}) => {
  const elem = context?.querySelector('.micro-standalone-app');
  if (elem) {
    ReactDOM.render(<MicroAppRouter {...props} />, elem);
  }
};
