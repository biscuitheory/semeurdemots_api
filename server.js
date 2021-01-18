const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

const whitelist = [
  process.env.REACT_APP_PROD_URL,
  process.env.REACT_APP_DEV_URL,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const router = require('./routes');

const server = express();

router.use(morgan('dev'));

server.use('/api', cors(corsOptions), router);

module.exports = server;
