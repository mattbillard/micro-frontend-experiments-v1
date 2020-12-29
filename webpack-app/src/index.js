import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";
import "./styles.less";



// CODE FROM: https://blog.iansinnott.com/how-to-disable-live-reload-in-create-react-app/
// Disable live reload because it crashes proxy
const forceDisableLiveReload = () => {
  // console.info('....Disabling live reload');

  const WS = window.WebSocket;
  function DevWebSocket (s) { 
    if (s.includes("sockjs-node")) {
      return {};
    } else {
      return new WS(s)
    } 
  };
  window.WebSocket = DevWebSocket;
}
forceDisableLiveReload();



var mountNode = document.getElementById("app");
ReactDOM.render(<App name="Jane" />, mountNode);