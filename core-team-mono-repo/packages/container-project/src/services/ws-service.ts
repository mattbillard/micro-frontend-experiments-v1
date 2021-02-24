import * as jsCookie from 'js-cookie';

// TODO: rever to https here and in proxy's webpack
// TODO: rename both variable and path to 'ws'
// const url = 'wss://localhost:8080/wss';
const url = 'ws://localhost:8080/wss'; // TODO: figure out https with openfin. ERR_CERT_AUTHORITY_INVALID
const RETRY_TIMEOUT = 5000;

export const connect = (callback) => {
  const username = jsCookie.get('username');
  const clientInfo = {
    username, 
    windowId: sessionStorage.windowId,
  };
  const ws = new WebSocket(`${url}/${JSON.stringify(clientInfo)}`);

  ws.onopen = () => {
    console.log('WS connected');
  }

  ws.onerror = (error) => {
    console.error('WS error: ', error);
  }

  ws.onmessage = (event) => {
    callback(JSON.parse(event.data));
  };

  ws.onclose = (event) => {
    console.log('WS disconnected');

    setTimeout(() => {
      console.log('WS reconnecting');
      connect(callback);
    }, RETRY_TIMEOUT);
  }
}
