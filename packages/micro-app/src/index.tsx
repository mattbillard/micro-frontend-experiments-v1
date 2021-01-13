import * as React from 'react';
import * as ReactDOM from "react-dom";
import { MicroAppRouter } from 'micro-components';

declare const window: any;

// TODO: any way not to use global function?
window.MicroApp = {
  init: (context = document.body, props) => {
    const elem = context.querySelector('.micro-app');
    ReactDOM.render(<MicroAppRouter {...props} />, elem);
  }
}
