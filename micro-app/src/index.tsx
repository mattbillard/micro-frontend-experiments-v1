import * as React from 'react';
import * as ReactDOM from "react-dom";

import MicroApp from './App';
import "./styles.css";
import "./styles.less";

// var mountNode = document.getElementById("micro-app");
// if (mountNode) {
//   ReactDOM.render(<MicroApp />, mountNode);
// }

declare const window: any;

window.bootstrap = () => {
  console.log('....inside bootstrap');
  const elem = document.getElementById('micro-app');
  ReactDOM.render(<MicroApp />, elem);
}
window.bootstrap2 = () => {
  console.log('....inside bootstrap');
  const context = document.querySelector('.micro-web-component')?.shadowRoot || document.body;
  const elem = context.querySelector('#micro-app');
  ReactDOM.render(<MicroApp />, elem);
}

window.initFooBar = (elem) => {
  ReactDOM.render(<MicroApp />, elem);
}

window.initFooBar2 = (context = document.body) => {
  console.log('...window.initFooBar2');
  const elem = context.querySelector('#micro-app')
  ReactDOM.render(<MicroApp />, elem);
}