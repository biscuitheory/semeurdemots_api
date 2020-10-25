const express = require('express');

const statusesController = require('../controllers/statuses');

const router = express.Router();

router.get('/statuses', async (req, res) => {
  const statusesFound = await statusesController.getAllStatuses();
  res.status(201).json(statusesFound);
});

module.exports = router;
