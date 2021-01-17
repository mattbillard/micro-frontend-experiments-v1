
// TODO: WS should know username 

// TODO: rename both variable and path to 'ws'
const url = 'wss://localhost:8080/ws'
let ws;

export const connect = (callback) => {
  ws = new WebSocket(url);

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
    }, 5000);
  }
}
