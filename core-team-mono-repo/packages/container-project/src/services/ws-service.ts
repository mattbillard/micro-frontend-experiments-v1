import jsCookie from 'js-cookie';

const url =
  window.location.protocol === 'https:'
    ? 'wss://localhost:8080/wss'
    : 'ws://localhost:8080/wss';
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
  };

  ws.onerror = (error) => {
    console.error('WS error: ', error);
  };

  ws.onmessage = (event) => {
    callback(JSON.parse(event.data));
  };

  ws.onclose = (event) => {
    console.log('WS disconnected');

    setTimeout(() => {
      console.log('WS reconnecting');
      connect(callback);
    }, RETRY_TIMEOUT);
  };
};
