import * as React from 'react';
import * as ReactDOM from "react-dom";

import { MicroAppRouter } from '../components';
import '../components/styles/index.less';

declare const window: any;

window.microAppInit = (context, props = {}) => {
  console.log('....init', props);  
  // alert();
  const elem = context?.querySelector('.micro-app');
  if (elem) {
    ReactDOM.render(<MicroAppRouter {...props} />, elem);
  }
}






// /**
//  * Experiments trying to get all types of apps to bootstrap themselves. Didn't work well with multiple shadow dom components
//  * Also having micro-apps watch their parent containers for prop changes and rerendering to apply those changes
//  */
// const render = (context) => {
//   let props;
//   if (window !==  window.parent) {
//     props = window.frameElement.props;    // window.frameElement = iframe tag
//   } else {
//     props = 
//       scriptTag?.parentElement?.props ||   // WebComponent no shadow
//       scriptTag.getRootNode().host.props;  // WebComponent with shadow
//   }

//   console.log('....render props', props);  
//   const elem = context.querySelector('.micro-app');
//   ReactDOM.render(<MicroAppRouter {...props} />, elem);
// }

// const initObserve = (context) => {
//   const observeThis = window.frameElement || scriptTag.parentElement || scriptTag.getRootNode().host;
//   const observer = new MutationObserver((mutationsList, observer) => { render(context);});
//   const config = { attributes: true, childList: false, subtree: false };
//   observer.observe(observeThis, config);
// }

// const scriptTag = window.currentScript;
// const context = scriptTag.parentElement || scriptTag.getRootNode();
// render(context);
// initObserve(context);
