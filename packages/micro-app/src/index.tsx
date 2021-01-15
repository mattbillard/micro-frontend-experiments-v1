import * as React from 'react';
import * as ReactDOM from "react-dom";
// import { MicroAppRouter } from 'micro-components';

import { MicroAppRouter } from 'micro-components/src';
import 'micro-components/dist/main.css';
// import 'micro-components/src/styles/micro-app.less';
// import '../../micro-components/src/styles/micro-app.less';
// import "./styles/flex-box.less";
// import "./styles/golden-apps.css";
// import "./styles/micro-app.less";
// import "./styles/styles.less";


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
