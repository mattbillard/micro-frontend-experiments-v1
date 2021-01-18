import * as jsCookie from 'js-cookie';

// TODO: rename both variable and path to 'ws'
const url = 'wss://localhost:8080/ws'
const RETRY_TIMEOUT = 5000;

export const connect = (callback) => {
  const username = jsCookie.get('username');
  const ws = new WebSocket(`${url}/${username}`);

  ws.onopen = () => {
    console.log('WS connected');
  }

  ws.onerror = (error) => {
    console.error(`WS error: ${error}`)
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
