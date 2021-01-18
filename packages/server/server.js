'use strict';

// Config
const PORT = 8084;


// Imports
const bodyParser = require('body-parser');
const chalk = require('chalk');
const cookieParser = require("cookie-parser");
const express = require('express');
const http = require('http');
const lessMiddleware = require('less-middleware');
const path = require('path');


// Express set up
const app = express();
app.set('port', PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));
const server = http.createServer(app);


// Routes
app.use('/', require('./routes/home.route'));
app.use('/api', require('./routes/api.route'));


// WebSockets
const { wss } = require('./websocket-server');
server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
});


// Start server
server.listen(PORT);
server.on('listening', () => {
  const protocol = 'http';
  const hostname = 'localhost';

  console.log(`
    Running on
      ${chalk.yellow(protocol + '://' + hostname + ':' + PORT)}
  `);
});
