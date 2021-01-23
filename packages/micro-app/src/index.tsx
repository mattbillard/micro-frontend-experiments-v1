import * as React from 'react';
import * as ReactDOM from "react-dom";

// import { MicroAppRouter } from 'micro-components';
// import 'micro-components/dist/main.css';

import { MicroAppRouter } from 'micro-components/src';
import 'micro-components/src/styles/index.less';


// import { forceDisableLiveReload } from './utils';

// forceDisableLiveReload();



declare const window: any;


const render = (context) => {
  let props;
  if (window !==  window.parent) {
    props = window.frameElement.props;    // window.frameElement = iframe tag
  } else {
    props = 
      scriptTag?.parentElement?.props ||   // WebComponent no shadow
      scriptTag.getRootNode().host.props;  // WebComponent with shadow
  }

  console.log('....render props', props);  
  const elem = context.querySelector('.micro-app');
  ReactDOM.render(<MicroAppRouter {...props} />, elem);
}

// Miro-app watches parent for prop changes
const initObserve = (context) => {
  const observeThis = window.frameElement || scriptTag.parentElement || scriptTag.getRootNode().host;
  const observer = new MutationObserver((mutationsList, observer) => { render(context);});
  const config = { attributes: true, childList: false, subtree: false };
  observer.observe(observeThis, config);
}

const scriptTag = window.currentScript;
const context = scriptTag.parentElement || scriptTag.getRootNode();
render(context);

initObserve(context);
