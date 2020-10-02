const express = require('express');
const admin = require('../controllers/admin');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/admin', (req, res) => {
  res.send('Portail admin');
});

module.exports = router;
