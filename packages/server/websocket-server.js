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

  ws.on('message', (message) => handleMessage(ws, message));
  ws.on('close', () => close(ws));

  // ws.send('Welcome');
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

// const handleMessage = (ws, message) => {
//   const obj = JSON.parse(message);
//   const { action, payload } = obj;

//   switch (action) {
//     case 'GET': {
//       Object.keys(payload).forEach(key => {
//         responseObj[key] = get(key)
//       });

//       ws.send(JSON.stringify(responseObj));
//       break;
//     }

//     case 'SET':
//       Object.keys(payload).forEach(key => {
//         const value = payload[key];
//         set(key, value);
//       });

//       wsArr.forEach(_ws => {
//         if (ws !== _ws) {
//           _ws.send(JSON.stringify(payload));    
//         }
//       })
//       break;
//   }
// }

// // const get = (username, key) => {
// const get = (key) => {
//   return db[key];
// }

// // const set = (username, key, value) => {
// const set = (key, value) => {
//   db[key] = value;
// }


// /*
// {
//   action: 'GET',
//   payload: {
//     key: 'settings'
//   }
// }

// {
//   action: 'SET',
//   payload: {
//     settings: {....}
//   }
// }
// */


module.exports = {
  sendWsMessage,
  wss,
};
