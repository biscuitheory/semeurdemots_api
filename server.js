const express = require('express');
const cors = require('cors');
const connection = require('./config/db.config');

const server = express();

server.use(cors());

server.get('/', (req, res) => {
  return res.send('Home');
});

server.get('/products', (req, res) => {
  connection.query('SELECT * FROM `products`', function (err, results, fields) {
    res.json(results);
  });
});

module.exports = server;
