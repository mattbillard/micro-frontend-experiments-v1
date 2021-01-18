const WebSocket = require('ws')

const wss = new WebSocket.Server({ noServer: true });
let wsArrByUsername = {};

const connect = (ws, req) => {
  const username = req.url.replace('/ws/', '');

  wsArrByUsername[username] = wsArrByUsername[username] || [];
  wsArrByUsername[username].push(ws);

  ws.on('message', (message) => console.log(`ws message: ${message}`));
  ws.on('close', () => close(ws));
}
wss.on('connection', connect);

const sendWsMessage = (action, payload, username) => {
  const obj = {
    action, 
    payload,
  };
  
  wsArrByUsername[username].forEach(ws => {
    ws.send(JSON.stringify(obj));
  });
}

const close = (ws) => {
  Object.keys(wsArrByUsername).forEach(username => {
    wsArrByUsername[username] = wsArrByUsername[username].filter(_ws => _ws !== ws);
  });
}

module.exports = {
  sendWsMessage,
  wss,
};
