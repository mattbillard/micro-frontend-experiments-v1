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
      scriptTag.getRootNode().host.props;      // WebComponent with shadow
      // FYI shadowDom parent is getRootNode().host
  }

  console.log('....render props', props);  
  const elem = context.querySelector('.micro-app');
  ReactDOM.render(<MicroAppRouter {...props} />, elem);
}


const scriptTag = window.currentScript;
const context = scriptTag.parentElement || scriptTag.getRootNode();
const onserveThis = window.frameElement || scriptTag.parentElement || scriptTag.getRootNode().host;

const observer = new MutationObserver((mutationsList, observer) => {
  console.log('...rerender mutationsList, observer', mutationsList, observer);
  render(context);
});
const config = { attributes: true, childList: true, subtree: true };
observer.observe(onserveThis, config);


render(context);
