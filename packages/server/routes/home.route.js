'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const title = 'Express Server';
  res.render('home', { title });
});

module.exports = router;
