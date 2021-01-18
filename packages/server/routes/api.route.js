'use strict';

const express = require('express');
const router = express.Router();
const db = require('../model/model');
const { sendWsMessage } = require('../websocket-server');

router.get('/golden-layout-config', (req, res) => {
  const goldenLayoutConfig = db.goldenLayoutConfig || '';
  res.send(goldenLayoutConfig);
});

router.post('/golden-layout-config', (req, res) => {
  const goldenLayoutConfig = req.body;
  db.goldenLayoutConfig = goldenLayoutConfig;

  sendWsMessage('UPDATE_GOLDEN_LAYOUT_CONFIG', goldenLayoutConfig);
  res.send(goldenLayoutConfig);
});




router.get('/settings', (req, res) => {
  const settings = db.settings || '';
  res.send(settings);
});

router.post('/settings', (req, res) => {
  const settings = req.body;
  db.settings = settings;

  sendWsMessage('UPDATE_SETTINGS', settings);
  res.send(settings);
});

module.exports = router;
