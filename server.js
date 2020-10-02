const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const router = require('./routes');

const server = express();

router.use(morgan('dev'));
server.use(cors());

server.use('/api', router);

module.exports = server;
