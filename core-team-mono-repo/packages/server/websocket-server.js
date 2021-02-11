const WebSocket = require('ws')

let wsArr = [];

const initWsServer = (server) => {
  const wss = new WebSocket.Server({ server });
  wss.on('connection', connect);

  //   const wss = new WebSocket.Server({ noServer: true });
//   wss.on('connection', connect);
//   server.on('upgrade', (req, socket, head) => {
//     wss.handleUpgrade(req, socket, head, (ws) => {
//       wss.emit('connection', ws, req);
//     });
//   });
}

const connect = (ws, req) => {
  const clientInfo = JSON.parse(decodeURIComponent(req.url.replace('/wss/', '')));
  clientInfo.ws = ws;

  // Remember WS connection
  wsArr.push(clientInfo);

  ws.on('message', (message) => console.log(`ws message: ${message}`));
  ws.on('close', () => close(ws));
}

const sendWsMessage = (action, payload, username, windowId) => {
  const obj = {
    action, 
    payload,
  };
  
  // Send WS message to same user but not same windowId so changes don't get sent to the window that made them
  wsArr
    .filter(clientInfo => clientInfo.username === username && clientInfo.windowId !== windowId)
    .forEach(clientInfo => {
      const { ws } = clientInfo;
      ws.send(JSON.stringify(obj));
    });
}

const close = (ws) => {
  wsArr = wsArr.filter(clientInfo => clientInfo.ws !== ws);
}

module.exports = {
  initWsServer,
  sendWsMessage,
};
