const WebSocket = require('ws')

const wsServer = new WebSocket.Server({ port: 8084 })

// let wsArr = []; 

// wsServer.on('connection', (ws) => {
//   wsArr.push(ws);

//   ws.on('message', (message) => {
//     console.log(`Received message => ${message}`)
//     wsArr.forEach(_ws => {
//       _ws.send('Hello ' + message);
//     })
//   })

//   ws.on('close', (arg1, arg2, arg3) => {
//     wsArr = wsArr.filter(_ws => _ws !== ws);
//   })

//   ws.send('Welcome')
// })




// TODO: read username from cookie

let wsArr = [];
let db = {};

const connect = (ws) => {
  // wsByUsername[username] = wsByUsername[username] || {};
  // db[username] = db[username] || {};
  wsArr.push(ws);

  ws.on('message', (message) => handleMessage(ws, message));
  ws.on('close', () => close(ws));

  ws.send('Welcome');
}
wsServer.on('connection', connect);

const close = (ws) => {
  wsArr = wsArr.filter(_ws => _ws !== ws);
}

const handleMessage = (ws, message) => {
  const obj = JSON.parse(message);
  const { action, payload } = obj;

  switch (action) {
    case 'GET': {
      Object.keys(payload).forEach(key => {
        responseObj[key] = get(key)
      });

      ws.send(JSON.stringify(responseObj));
      break;
    }

    case 'SET':
      Object.keys(payload).forEach(key => {
        const value = payload[key];
        set(key, value);
      });

      wsArr.forEach(_ws => {
        if (ws !== _ws) {
          _ws.send(JSON.stringify(payload));    
        }
      })
      break;
  }
}

// const get = (username, key) => {
const get = (key) => {
  return db[key];
}

// const set = (username, key, value) => {
const set = (key, value) => {
  db[key] = value;
}


/*
{
  action: 'GET',
  payload: {
    key: 'settings'
  }
}

{
  action: 'SET',
  payload: {
    settings: {....}
  }
}
*/
