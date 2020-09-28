const express = require('express');
const cors = require('cors');

const router = require('./routes');

const server = express();

server.use(cors());

server.use('/api', router);

module.exports = server;
