import * as React from 'react';
import * as ReactDOM from "react-dom";

import MicroApp from './components/micro-app';
import "./styles/styles.less";

declare const window: any;

// TODO: better not to use global function
window.bootstrap2 = (context) => {
  const elem = context.querySelector('#micro-app');
  ReactDOM.render(<MicroApp />, elem);
}
