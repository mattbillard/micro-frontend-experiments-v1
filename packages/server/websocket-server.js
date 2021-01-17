const WebSocket = require('ws')

// const wss = new WebSocket.Server({ port: 8084 })
const wss = new WebSocket.Server({ noServer: true });

// TODO: read username from cookie

let wsArr = [];
let db = {};

const connect = (ws) => {
  // wsByUsername[username] = wsByUsername[username] || {};
  // db[username] = db[username] || {};
  wsArr.push(ws);

  ws.on('message', (message) => console.log(`ws message: ${message}`));
  ws.on('close', () => close(ws));
}
wss.on('connection', connect);

const sendWsMessage = (action, payload) => {
  const obj = {
    action, 
    payload,
  };
  
  wsArr.forEach(ws => {
    ws.send(JSON.stringify(obj));
  });
}

const close = (ws) => {
  wsArr = wsArr.filter(_ws => _ws !== ws);
}

module.exports = {
  sendWsMessage,
  wss,
};
