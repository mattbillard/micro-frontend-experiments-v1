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
  const payload = req.body;
  const { 
    goldenLayoutConfig,
    windowId,
  } = payload;
  db.set(username, 'goldenLayoutConfig', goldenLayoutConfig);

  sendWsMessage('UPDATE_GOLDEN_LAYOUT_CONFIG', goldenLayoutConfig, username, windowId);
  res.send(goldenLayoutConfig);
});




router.get('/settings', (req, res) => {
  const username = req.cookies.username;
  const settings = db.get(username, 'settings');
  res.send(settings);
});

router.post('/settings', (req, res) => {
  const username = req.cookies.username;
  const payload = req.body;
  const { 
    settings,
    windowId,
  } = payload;
  db.set(username, 'settings', settings);

  sendWsMessage('UPDATE_SETTINGS', settings, username, windowId);
  res.send(settings);
});

module.exports = router;
