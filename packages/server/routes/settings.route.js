'use strict';

const express = require('express');
const router = express.Router();
const db = require('../model/model');
const { sendWsMessage } = require('../websocket-server');

router.get('/', (req, res) => {
  const settings = db.settings || '';
  res.send(settings);
});

router.post('/', (req, res) => {
  const settings = req.body;
  db.settings = settings;

  sendWsMessage('UPDATE_SETTINGS', settings);
  res.send(settings);
});

module.exports = router;
