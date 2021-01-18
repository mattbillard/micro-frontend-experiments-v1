'use strict';

const express = require('express');
const router = express.Router();
const db = require('../model/model');
const { sendWsMessage } = require('../websocket-server');

router.get('/golden-layout-config', (req, res) => {
  const username = req.cookies.username;
  const goldenLayoutConfig = db.get(username, 'goldenLayoutConfig');
  res.send(goldenLayoutConfig);
});

router.post('/golden-layout-config', (req, res) => {
  const username = req.cookies.username;
  const goldenLayoutConfig = req.body;
  db.set(username, 'goldenLayoutConfig', goldenLayoutConfig);

  sendWsMessage('UPDATE_GOLDEN_LAYOUT_CONFIG', goldenLayoutConfig, username);
  res.send(goldenLayoutConfig);
});




router.get('/settings', (req, res) => {
  const username = req.cookies.username;
  const settings = db.get(username, 'settings');
  res.send(settings);
});

router.post('/settings', (req, res) => {
  const username = req.cookies.username;
  const settings = req.body;
  db.set(username, 'settings', settings);

  sendWsMessage('UPDATE_SETTINGS', settings, username);
  res.send(settings);
});

module.exports = router;
