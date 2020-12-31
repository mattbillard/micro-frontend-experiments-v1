import * as React from 'react';
import * as ReactDOM from "react-dom";

import { MicroApp } from './micro-components/components/micro-app';

declare const window: any;

// const elem = document.querySelector('#micro-app');
// ReactDOM.render(<MicroApp />, elem);


// // TODO: better not to use global function
// window.bootstrap2 = (context = document.body, url = '') => {
//   const elem = context.querySelector('.micro-app');
//   ReactDOM.render(<MicroApp url={url} />, elem);
// }

// TODO: better not to use global function
window.MicroApp = {
  init: (context = document.body, url = '') => {
    const elem = context.querySelector('.micro-app');
    ReactDOM.render(<MicroApp url={url} />, elem);
  }
}


// [...document.querySelectorAll('.micro-app')]
//   .map(elem => !elem.children.length && ReactDOM.render(<MicroApp />, elem))


// const currentScript = document.currentScript;
// const elem = currentScript.parentNode.querySelector('.micro-app');
// ReactDOM.render(<MicroApp />, elem);
