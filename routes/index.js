const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const router = express.Router();
const usersRouter = require('./users');
const productsRouter = require('./products');
const ordersRouter = require('./orders');
const statusesRouter = require('./statuses');
const ordersProductsRouter = require('./orders_products');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(usersRouter);
router.use(productsRouter);
router.use(ordersRouter);
router.use(statusesRouter);
router.use(ordersProductsRouter);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Home' });
});

router.get('*', (req, res) => {
  res.status(404).json({
    error: 'Vous vous êtes trompés de route !',
  });
});

module.exports = router;
