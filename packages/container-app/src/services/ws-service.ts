
// TODO: WS should know username 

// TODO: rename both variable and path to 'ws'
const url = 'wss://localhost:8080/server'
let ws;

export const connect = (callback) => {
  ws = new WebSocket(url);

  ws.onmessage = (event) => {
    console.log(event.data);
    callback(JSON.parse(event.data));
  };
}
