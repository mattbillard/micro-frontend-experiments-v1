import * as React from 'react';
import * as ReactDOM from "react-dom";

import { ContainerApp } from './components/container-app';
import "./styles/styles.less";


// CODE FROM: https://blog.iansinnott.com/how-to-disable-live-reload-in-create-react-app/
// Disable live reload because it crashes proxy
declare const window: any;
const forceDisableLiveReload = () => {
  // console.info('....Disabling live reload');

  const WS = window.WebSocket;
  function DevWebSocket (s: any) { 
    if (s.includes("sockjs-node")) {
      return {};
    } else {
      return new WS(s)
    } 
  };
  window.WebSocket = DevWebSocket;
}
forceDisableLiveReload();


var mountNode = document.getElementById("container-app");
ReactDOM.render(<ContainerApp />, mountNode);

