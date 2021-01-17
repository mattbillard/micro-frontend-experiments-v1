'use strict';

const express = require('express');
const router = express.Router();
const db = require('../model/model');

router.get('/', (req, res) => {
  const settings = db.settings || '';
  res.send(settings);
});

router.post('/', (req, res) => {
  const settings = req.body;
  db.settings = settings;
  res.send(settings);
});

module.exports = router;
