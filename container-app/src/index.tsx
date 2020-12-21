import * as React from 'react';
import * as ReactDOM from "react-dom";

import { ContainerApp } from './components/container-app';
import "./styles/styles.less";

var mountNode = document.getElementById("container-app");
ReactDOM.render(<ContainerApp />, mountNode);

// CODE FROM: https://blog.iansinnott.com/how-to-disable-live-reload-in-create-react-app/
// Disable live reload because it crashes proxy
declare const window: any;
const forceDisableLiveReload = () => {
  console.info('Disabling live reload');

  const WS = window.WebSocket;
  const DevWebSocket =(s: any) => s.includes("/sockjs-node") ? {} : new WS(s);
  window.WebSocket = DevWebSocket;
}
forceDisableLiveReload();
