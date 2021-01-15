import * as React from 'react';
import * as ReactDOM from "react-dom";

// import { MicroAppRouter } from 'micro-components';
// import 'micro-components/dist/main.css';

import { MicroAppRouter } from 'micro-components/src';
import 'micro-components/src/styles/index.less';


// import { forceDisableLiveReload } from './utils';

// forceDisableLiveReload();

declare const window: any;

// TODO: any way not to use global function?
window.MicroApp = {
  init: (context = document.body, props) => {
    const elem = context.querySelector('.micro-app');
    ReactDOM.render(<MicroAppRouter {...props} />, elem);
  }
}
