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
// TODO: lots of clean up
window.MicroApp = {
  init: (scriptTag) => {
    let props;
    if (window !==  window.parent) {
      props = window.frameElement.props;    // window.frameElement = iframe tag
    } else {
      props = 
        scriptTag.parentElement?.props ||   // WebComponent no shadow
        scriptTag.getRootNode().props;      // WebComponent with shadow
    }

    const context = scriptTag.parentElement || scriptTag.getRootNode();
    
    const elem = context.querySelector('.micro-app');
    ReactDOM.render(<MicroAppRouter {...props} />, elem);
  },
  updateProps: (props) => {
    const elem = document.querySelector('.micro-app');
    ReactDOM.render(<MicroAppRouter {...props} />, elem);    
  }
}

const render = () => {
  // console.log('....render', window.currentScript);
  // return;
  // const scriptTag = document.currentScript;
  const scriptTag = window.currentScript;
  // debugger;

  // var scripts = document.getElementsByTagName('script');
  // var scriptTag = scripts[scripts.length - 1];

  let props;
  if (window !==  window.parent) {
    props = window.frameElement.props;    // window.frameElement = iframe tag
  } else {
    props = 
      scriptTag?.parentElement?.props ||   // WebComponent no shadow
      scriptTag.getRootNode().props;      // WebComponent with shadow
      // this.getRootNode().props;      // WebComponent with shadow
  }

  const context = scriptTag.parentElement || scriptTag.getRootNode();

  console.log('....render props', props);
  
  const elem = context.querySelector('.micro-app');
  ReactDOM.render(<MicroAppRouter {...props} />, elem);
}


render();
// module.exports = render(); // DOES NOT WORK. Can't call require from HTML page



// FYI shadowDom parent is getRootNode().host

