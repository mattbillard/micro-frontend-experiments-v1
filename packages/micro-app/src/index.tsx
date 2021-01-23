import * as React from 'react';
import * as ReactDOM from "react-dom";

// import { MicroAppRouter } from 'micro-components';
// import 'micro-components/dist/main.css';

import { MicroAppRouter } from 'micro-components/src';
import 'micro-components/src/styles/index.less';


// import { forceDisableLiveReload } from './utils';

// forceDisableLiveReload();



declare const window: any;

const render = () => {
  const scriptTag = window.currentScript;

  let props;
  if (window !==  window.parent) {
    props = window.frameElement.props;    // window.frameElement = iframe tag
  } else {
    props = 
      scriptTag?.parentElement?.props ||   // WebComponent no shadow
      scriptTag.getRootNode().props;      // WebComponent with shadow
      // FYI shadowDom parent is getRootNode().host
  }

  const context = scriptTag.parentElement || scriptTag.getRootNode();

  console.log('....render props', props);
  
  const elem = context.querySelector('.micro-app');
  ReactDOM.render(<MicroAppRouter {...props} />, elem);
}

render();
